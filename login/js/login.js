/*
Asking AuthO for tokens for APP
*/
var request = require("request");

var options = { method: 'POST',
  url: 'https://dev-zu-dxu7j.auth0.com/oauth/token',
  headers: { 'content-type': 'application/json' },
  body: '{"client_id":"KE5JDDmBDs5fZxA44cprjlEOcTTRELmz","client_secret":"Aww8QFCwHmhJjOUL2xi9gMhpm7V4eVCEqTsmmiIwzdO-Kg_NFRbDzM2Lvuduhq_G","audience":"https://dev-zu-dxu7j.auth0.com/api/v2/","grant_type":"client_credentials"}' };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});

/*
Sending the token to the API
*/
var request = require("request");

var options = { method: 'GET',
  url: 'http://path_to_your_api/',
  headers: { authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImtpZCI6Ik1qRTNNamhDTkRBMU9VWXdSalkwUlRRMk5qYzVOa0U0TlRWRE1qUTNRMEkxTjBSRk9ETkVSUSJ9.eyJpc3MiOiJodHRwczovL2Rldi16dS1keHU3ai5hdXRoMC5jb20vIiwic3ViIjoiS0U1SkREbUJEczVmWnhBNDRjcHJqbEVPY1RUUkVMbXpAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vZGV2LXp1LWR4dTdqLmF1dGgwLmNvbS9hcGkvdjIvIiwiaWF0IjoxNTU3MjQ4NDc4LCJleHAiOjE1NTczMzQ4NzgsImF6cCI6IktFNUpERG1CRHM1Zlp4QTQ0Y3ByamxFT2NUVFJFTG16IiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.Q-rmnUdPPeiSCq8tSUE1oEcZhrOGzzRPJEKxUrHuhFX87p6lVYFH1XlNXes0J5BS4KnxCPwV8nRWOXRqlfcqnOkiLx8OamtCSMO4de01MFSZQUt3NCCaLPT2fLBE4ffKmPUWlxTs9TOKkSSd02WaRvg1Q8Y8BZh8A4FVmr0xkzOdgqjE16OoDuQ0IznzYpx4l3KXpodlxtvvQqy1SmQshMJP_ADuPvyPPGc_2D-AN8nGOwOn31YEdpb450paslqiEkzommbf85r2PybEpWxYD3ySpUOkC-NO1h9BomAqlHH5dxZK4lZ89j-DFRNQssWPQ_DT3DH7PsdjGI8Vs7RfLw' } };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
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

  /* 
  functions to call above functions when submit button is clicked 
  */

$(document).on("submit", function())