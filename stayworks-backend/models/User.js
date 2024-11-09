const { pool } = require('../config/database');

class User {
  static create(firstName, lastName, email, phoneNumber, password, dateOfBirth, callback) {
    const credentialsSql = 'INSERT INTO Credentials (first_name, last_name, email, phone_number, password) VALUES (?, ?, ?, ?, ?)';
    
    pool.query(credentialsSql, [firstName, lastName, email, phoneNumber, password], (err, results) => {
      if (err) return callback(err);
      
      const userId = results.insertId;
      
      const landlordSql = 'INSERT INTO Landlords (id, first_name, last_name, email, phone_number, date_of_birth) VALUES (?, ?, ?, ?, ?, ?)';
      
      pool.query(landlordSql, [userId, firstName, lastName, email, phoneNumber, dateOfBirth], (err) => {
        if (err) return callback(err);
        
        callback(null, userId);
      });
    });
  }

  static findByEmail(email, callback) {
    const sql = 'SELECT * FROM Credentials WHERE email = ?';
    
    pool.query(sql, [email], (err, results) => {
      if (err) return callback(err);
      
      callback(null, results[0]);
    });
  }
}

module.exports = User;