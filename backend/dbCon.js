const mysql = require('mysql')



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MYsql12345!',
    database: 'users',
  });
  

  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
  
    console.log('Connected to MySQL server!');
  });


  module.exports = connection