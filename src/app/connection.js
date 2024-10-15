const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');


const app = express();

const connection = mysql.createConnection({
  host: 'stayworks.duckdns.org',
  port: '3306',
  user: 'root',
  password: 'password',
  database: 'StayworksTestEnv',
});

app.use(cors());
app.use(bodyParser.json());
connection.connect();



function router(db) {
  const router = express.Router();

  router.post('/login', (req, res) => {
    const { email, password } = req.body;
      console.log("POSTINGGGG");
    if (email && password) {
      db.query(
        'SELECT Email FROM test_table WHERE Email = ? AND Password = ?',
        [email, password],
        function (err, result) {
          if (err) throw err;

          if (result.length > 0) {
            return res.send({ message: 'Login Successful', user: result[0].Email });
          } else {
            return res.status(401).send({ message: 'Login Failed' });
          }
        }
      );
    }
  });

  return router;
}

app.use('/api', router(connection));

const server = http.createServer(app);

server.listen(3000, () => {
  console.log('Server started on port 3000');
})