const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
const pool = mysql.createPool({
  host: 'stayworks.duckdns.org',
  port: 3306,
  user: 'root',
  password: 'sbKUjZ7~A21-',
  database: 'STAYWORKSTestEnv',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Verify database connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Successfully connected to the database');
  connection.release();
});

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['x-auth-token'];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

// Helper functions
const formatDate = (day, month, year) => {
  if (day && month && year) {
    return moment(`${year}-${month}-${day}`, 'YYYY-MMMM-D').format('YYYY-MM-DD');
  }
  return null;
};

function formatPhoneNumber(phoneNumber) {
  const cleaned = phoneNumber.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  }
  return phoneNumber;
}

// Login route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  console.log('Login attempt for:', email);

  try {
    // Get user from Credentials table
    pool.execute(
      'SELECT * FROM Credentials WHERE email = ?',
      [email],
      async (error, results) => {
        if (error) {
          console.error('Database error during login:', error);
          return res.status(500).json({ message: 'Server error during login' });
        }

        if (results.length === 0) {
          console.log('No user found with email:', email);
          return res.status(400).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Get landlord info
        pool.execute(
          'SELECT * FROM Landlords WHERE email = ?',
          [email],
          (error, landlordResults) => {
            if (error || landlordResults.length === 0) {
              console.error('Error fetching landlord data:', error);
              return res.status(500).json({ message: 'Server error during login' });
            }

            const landlord = landlordResults[0];

            // Create JWT token
            const token = jwt.sign(
              { 
                id: landlord.id,
                email: landlord.email,
                firstName: landlord.first_name,
                lastName: landlord.last_name
              },
              process.env.JWT_SECRET || 'your_jwt_secret',
              { expiresIn: '24h' }
            );

            // Send response
            res.json({
              token,
              id: landlord.id,
              email: landlord.email,
              firstName: landlord.first_name,
              lastName: landlord.last_name
            });
          }
        );
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

// Get current user
app.get('/api/auth/user', authenticateToken, (req, res) => {
  pool.execute(
    'SELECT id, email, first_name, last_name FROM Landlords WHERE id = ?',
    [req.user.id],
    (error, results) => {
      if (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ message: 'Server error while fetching user data' });
      }

      if (results.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      const landlord = results[0];
      res.json({
        id: landlord.id,
        email: landlord.email,
        firstName: landlord.first_name,
        lastName: landlord.last_name
      });
    }
  );
});

// Signup route
app.post('/api/auth/signup', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, dateOfBirth } = req.body;
  console.log('Signup attempt for:', email);

  try {
    // Check if user already exists
    pool.execute(
      'SELECT * FROM Landlords WHERE email = ?',
      [email],
      async (error, results) => {
        if (error) {
          console.error('Database error during signup:', error);
          return res.status(500).json({ message: 'Server error during signup' });
        }

        if (results.length > 0) {
          return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Begin transaction
        pool.getConnection((err, connection) => {
          if (err) {
            console.error('Error getting connection for transaction:', err);
            return res.status(500).json({ message: 'Server error during signup' });
          }

          connection.beginTransaction(err => {
            if (err) {
              connection.release();
              console.error('Error beginning transaction:', err);
              return res.status(500).json({ message: 'Server error during signup' });
            }

            // First insert into Landlords table
            const landlordQuery = `
              INSERT INTO Landlords (
                first_name,
                last_name,
                email,
                phone_number,
                date_of_birth,
                created_at,
                updated_at
              ) VALUES (?, ?, ?, ?, ?, NOW(), NOW())
            `;

            const landlordValues = [
              firstName,
              lastName,
              email,
              phoneNumber,
              dateOfBirth
            ];

            connection.execute(landlordQuery, landlordValues, (error, landlordResults) => {
              if (error) {
                return connection.rollback(() => {
                  connection.release();
                  console.error('Error inserting into Landlords:', error);
                  res.status(500).json({ message: 'Error creating account' });
                });
              }

              const landlordId = landlordResults.insertId;

              // Insert into Credentials table with hashed password
              const credentialsQuery = `
                INSERT INTO Credentials (
                  first_name,
                  last_name,
                  email,
                  phone_number,
                  password,
                  created_at
                ) VALUES (?, ?, ?, ?, ?, NOW())
              `;

              const credentialsValues = [
                firstName,
                lastName,
                email,
                phoneNumber,
                hashedPassword 
              ];

              connection.execute(credentialsQuery, credentialsValues, (error, credentialsResults) => {
                if (error) {
                  return connection.rollback(() => {
                    connection.release();
                    console.error('Error inserting into Credentials:', error);
                    res.status(500).json({ message: 'Error creating account' });
                  });
                }

                // Commit the transaction
                connection.commit(err => {
                  if (err) {
                    return connection.rollback(() => {
                      connection.release();
                      console.error('Error committing transaction:', err);
                      res.status(500).json({ message: 'Error creating account' });
                    });
                  }

                  connection.release();

                  // Create JWT token
                  const token = jwt.sign(
                    { 
                      id: landlordId,
                      email: email,
                      firstName: firstName,
                      lastName: lastName
                    },
                    process.env.JWT_SECRET || 'your_jwt_secret',
                    { expiresIn: '24h' }
                  );

                  // Send success response
                  res.status(201).json({ 
                    message: 'Signup successful',
                    token,
                    id: landlordId,
                    email,
                    firstName,
                    lastName
                  });
                });
              });
            });
          });
        });
      }
    );
  } catch (error) {
    console.error('Error in signup:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

// Tenant Routes
// Get all tenants for a landlord
app.get('/api/Tenants', authenticateToken, (req, res) => {
  const landlordId = req.user.id;
  console.log('Fetching tenants for landlord:', landlordId);
  
  pool.execute(
    'SELECT * FROM Tenants WHERE landlord_ID = ?',
    [landlordId],
    (error, results) => {
      if (error) {
        console.error('Error fetching tenants:', error);
        return res.status(500).json({ error: 'Error fetching tenants', details: error.message });
      }
      console.log(`Found ${results.length} tenants for landlord ${landlordId}`);
      res.json(results);
    }
  );
});

// Get specific tenant
app.get('/api/Tenants/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const landlordId = req.user.id;

  pool.execute(
    'SELECT * FROM Tenants WHERE id = ? AND landlord_ID = ?',
    [id, landlordId],
    (error, results) => {
      if (error) {
        console.error('Error fetching tenant:', error);
        return res.status(500).json({ error: 'Error fetching tenant', details: error.message });
      }
      if (results.length === 0) {
        return res.status(404).json({ error: 'Tenant not found' });
      }
      res.json(results[0]);
    }
  );
});

// Add new tenant
app.post('/api/Tenants', authenticateToken, (req, res) => {
  const landlordId = req.user.id;
  console.log('Adding tenant for landlord:', landlordId);

  const {
    firstName, lastName, email, phone, dobDay, dobMonth, dobYear,
    streetAddress, city, province, postalCode, leaseStartDay, leaseStartMonth, leaseStartYear,
    leaseEndDay, leaseEndMonth, leaseEndYear, rentAmount, securityDeposit,
    emergencyContactName, emergencyContactPhone, occupation, employer,
    hasPets, petDetails, leaseSignedDay, leaseSignedMonth, leaseSignedYear
  } = req.body;

  const dateOfBirth = formatDate(dobDay, dobMonth, dobYear);
  const leaseStartDate = formatDate(leaseStartDay, leaseStartMonth, leaseStartYear);
  const leaseEndDate = formatDate(leaseEndDay, leaseEndMonth, leaseEndYear);
  const leaseSignedDate = formatDate(leaseSignedDay, leaseSignedMonth, leaseSignedYear);

  const parsedRentAmount = rentAmount ? parseFloat(rentAmount) : null;
  const parsedSecurityDeposit = securityDeposit ? parseFloat(securityDeposit) : null;
  const formattedPhone = formatPhoneNumber(phone);
  const formattedEmergencyPhone = formatPhoneNumber(emergencyContactPhone);

  const query = `
    INSERT INTO Tenants (
      landlord_ID, first_name, last_name, email, phone, date_of_birth,
      street_address, city, province, postal_code,
      lease_start_date, lease_end_date, rent_amount, security_deposit,
      emergency_contact_name, emergency_contact_phone, occupation, employer,
      has_pets, pet_details, lease_signed
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    landlordId, firstName, lastName, email, formattedPhone, dateOfBirth,
    streetAddress, city, province, postalCode,
    leaseStartDate, leaseEndDate, parsedRentAmount, parsedSecurityDeposit,
    emergencyContactName, formattedEmergencyPhone, occupation, employer,
    hasPets ? 1 : 0, petDetails, leaseSignedDate
  ];

  pool.execute(query, values, (error, results) => {
    if (error) {
      console.error('Database error when creating tenant:', error);
      return res.status(500).json({ error: 'Error creating tenant', details: error.message });
    }
    console.log('Tenant created successfully:', results.insertId);
    res.status(201).json({ id: results.insertId, ...req.body });
  });
});

// Update tenant
app.put('/api/Tenants/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const landlordId = req.user.id;

  const {
    firstName, lastName, email, phone, dobDay, dobMonth, dobYear,
    streetAddress, city, province, postalCode, leaseStartDay, leaseStartMonth, leaseStartYear,
    leaseEndDay, leaseEndMonth, leaseEndYear, rentAmount, securityDeposit,
    emergencyContactName, emergencyContactPhone, occupation, employer,
    hasPets, petDetails, leaseSignedDay, leaseSignedMonth, leaseSignedYear
  } = req.body;

  const dateOfBirth = formatDate(dobDay, dobMonth, dobYear);
  const leaseStartDate = formatDate(leaseStartDay, leaseStartMonth, leaseStartYear);
  const leaseEndDate = formatDate(leaseEndDay, leaseEndMonth, leaseEndYear);
  const leaseSignedDate = formatDate(leaseSignedDay, leaseSignedMonth, leaseSignedYear);

  const parsedRentAmount = rentAmount ? parseFloat(rentAmount) : null;
  const parsedSecurityDeposit = securityDeposit ? parseFloat(securityDeposit) : null;
  const formattedPhone = formatPhoneNumber(phone);
  const formattedEmergencyPhone = formatPhoneNumber(emergencyContactPhone);

  const query = `
    UPDATE Tenants SET
      first_name = ?, last_name = ?, email = ?, phone = ?, date_of_birth = ?,
      street_address = ?, city = ?, province = ?, postal_code = ?,
      lease_start_date = ?, lease_end_date = ?, rent_amount = ?, security_deposit = ?,
      emergency_contact_name = ?, emergency_contact_phone = ?, occupation = ?, employer = ?,
      has_pets = ?, pet_details = ?, lease_signed = ?
    WHERE id = ? AND landlord_ID = ?
  `;

  const values = [
    firstName, lastName, email, formattedPhone, dateOfBirth,
    streetAddress, city, province, postalCode,
    leaseStartDate, leaseEndDate, parsedRentAmount, parsedSecurityDeposit,
    emergencyContactName, formattedEmergencyPhone, occupation, employer,
    hasPets ? 1 : 0, petDetails, leaseSignedDate,
    id, landlordId
  ];

  pool.execute(query, values, (error, results) => {
    if (error) {
      console.error('Error updating tenant:', error);
      return res.status(500).json({ error: 'Error updating tenant', details: error.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Tenant not found or unauthorized' });
    }
    console.log('Tenant updated successfully:', id);
    res.json({ id, ...req.body });
  });
});

// Delete tenant
app.delete('/api/Tenants/:id', authenticateToken, (req, res) => {
  const { id } = req.params;
  const landlordId = req.user.id;

  pool.execute(
    'DELETE FROM Tenants WHERE id = ? AND landlord_ID = ?',
    [id, landlordId],
    (error, results) => {
      if (error) {
        console.error('Error deleting tenant:', error);
        return res.status(500).json({ error: 'Error deleting tenant', details: error.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Tenant not found or unauthorized' });
      }
      console.log('Tenant deleted successfully:', id);
      res.json({ message: 'Tenant deleted successfully' });
    }
  );
});


//all property routes
app.get('/api/RentalProperty', authenticateToken, (req, res) => {
  const landlordId = req.user.id;
  pool.execute(
    'SELECT * FROM RentalProperty WHERE landlordId = ?',
    [landlordId],
    (error, results) => {
      if (error) {
        console.error('Error fetching properties:', error);
        return res.status(500).json({ error: 'Error fetching properties', details: error.message });
      }
      console.log(`Found ${results.length} properties for landlord ${landlordId}`);
      res.json(results);
    }
  );
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});