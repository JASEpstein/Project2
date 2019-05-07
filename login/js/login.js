/*
    This script will be executed each time a user attempts to login.
    The two parameters: email and password, are used to validate the authenticity of the user.
    Login script is mandatory. The other scripts, if implemented will be used for sign up, 
    email verification, password reset and delete user functionality.
*/
function login(email, password, callback) {
    var mysql = require('mysql');
    var bcrypt = require('bcrypt');
  
    var connection = mysql({
      host: configuration.MYSQL_HOST,
      user: 'root',
      password: configuration.MYSQL_PASSWORD,
      database: 'mydb'
    });
  
    connection.connect();
  
    var query = 'SELECT id, nickname, email, password FROM users WHERE email = ?';
  
    connection.query(query, [ email ], function(err, results) {
      if (err) return callback(err);
      if (results.length === 0) return callback(new WrongUsernameOrPasswordError(email));
      var user = results[0];
  
      bcrypt.compare(password, user.password, function(err, isValid) {
        if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));
  
        callback(null, {
          user_id: user.id.toString(),
          nickname: user.nickname,
          email: user.email
        });
      });
    });
  }

/*
    This script will be executed when the user signs up.
    The parameters: user.email and user.password, are used to create a record in the user store.
*/
  function create(user, callback) {
    var mysql = require('mysql');
    var bcrypt = require('bcrypt');
  
    var connection = mysql({
      host: configuration.MYSQL_PASSWORD,
      user: 'root',
      password: configuration.MYSQL_PASSWORD,
      database: 'mydb'
    });
  
    connection.connect();
  
    var query = 'INSERT INTO users SET ?';
  
    bcrypt.hash(user.password, 10, function(err, hash) {
      if (err) return callback(err);
  
      var insert = {
        password: hash,
        email: user.email
      };
  
      connection.query(query, insert, function(err, results) {
        if (err) return callback(err);
        if (results.length === 0) return callback();
        callback(null);
      });
    });
  }

/*
    This script will be executed after a user that signed-up, and follows the "verification" link.
    The parameter: email is used to verify an account.
*/
  function verify(email, callback) {
    var mysql = require('mysql');
  
    var connection = mysql({
      host: configuration.MYSQL_PASSWORD,
      user: 'root',
      password: configuration.MYSQL_PASSWORD,
      database: 'mydb'
    });
  
    connection.connect();
  
    var query = 'UPDATE users SET email_Verified = true WHERE email_Verified = false AND email = ?';
  
    connection.query(query, [ email ], function(err, results) {
      if (err) return callback(err);
  
      callback(null, results.length > 0);
    });
  
  }

/*  
    This script will be executed when the user wishes to change his password, 
    the reset email was sent and the user follows the "change password" link.
    The parameters: email and newPassword are used to confirm the new password.
*/
 function changePassword(email, newPassword, callback) {
    var mysql = require('mysql');
    var bcrypt = require('bcrypt');
  
    var connection = mysql({
      host: configuration.MYSQL_HOST,
      user: 'root',
      password: configuration.MYSQL_PASSWORD,
      database: 'mydb'
    });
  
    connection.connect();
  
    var query = 'UPDATE users SET password = ? WHERE email = ?';
  
    bcrypt.hash(newPassword, 10, function(err, hash) {
      if (err) return callback(err);
  
      connection.query(query, [ hash, email ], function(err, results) {
        if (err) return callback(err);
        callback(null, results.length > 0);
      });
    });
  }

/*This script will be executed when the user wishes to change his password 
    to test if the user exists.*/
 function getByEmail(email, callback) {
    var mysql = require('mysql');
  
    var connection = mysql({
      host: configuration.MYSQL_HOST,
      user: 'root',
      password: configuration.MYSQL_PASSWORD,
      database: 'mydb'
    });
  
    connection.connect();
  
    var query = 'SELECT id, nickname, email FROM users WHERE email = ?';
  
    connection.query(query, [ email ], function(err, results) {
      if (err || results.length === 0) return callback(err || null);
  
      var user = results[0];
      callback(null, {
        user_id: user.id.toString(),
        nickname: user.nickname,
        email: user.email
      });
    });
  }

  /*
    This script will be executed when a user is deleted.
  */
 function remove(id, callback) {
    var mysql = require('mysql');
  
    var connection = mysql({
      host: configuration.MYSQL_HOST,
      user: 'me',
      password: configuration.MYSQL_PASSWORD,
      database: 'mydb'
    });
  
    connection.connect();
  
    var query = 'DELETE FROM users WHERE id = ?';
  
    connection.query(query, [ id ], function(err) {
      if (err) return callback(err);
      callback(null);
    });
  }


/* 
  Modify datetime after user is created  
*/

  function datetime (datetime, callback) {
    var mysql = require('mysql');

    var connection = mysql({
        host: configuration.MYSQL_HOST,
        user: 'me',
        password: configuration.MYSQL_PASSWORD,
        database: 'mydb'
    });

    connection.connect();

    var query = 'UPDATE FROM users ? WHERE id = ?';

    connection.query(query, [datetime], [id], function(err) {
        if (err) return callback (err);
        callback(null);
    });

  }