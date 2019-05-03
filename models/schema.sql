DROP DATABASE IF EXISTS exampledb;
CREATE DATABASE exampledb;

DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;



--//To Make user database
CREATE DATABASE mydb;

USE mydb;

CREATE TABLE users 
(
	user_id int NOT NULL AUTO_INCREMENT,
    nickname VARCHAR(15) NOT NULL,
    password VARCHAR(10),
    PRIMARY KEY (user_id)
)
