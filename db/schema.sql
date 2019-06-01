--drops database if one already exsists
DROP DATABASE IF EXISTS nerdbox_db;
--creates database
CREATE DATABASE nerdbox_db;

--create subscriptions table
CREATE TABLE
IF NOT EXISTS Subscriptions
(
    id auto_increment int not null primary key,
    name varchar (60),
    price DECIMAL (10, 2),
    number_of_items int,
    premium varchar (30),
    shipping varchar (60),
    img INT (10)
);

--creates categories table
CREATE TABLE
IF NOT EXISTS Categories
(
    id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    name VARCHAR (50) NOT NULL,
    img INT (10),
    description VARCHAR (225),
);

--creates account table 
CREATE TABLE
IF NOT EXISTS accounts
(
   id INT AUTO_INCREMENT NOT NULL,
   firstName VARCHAR (50) NOT NULL,
   lastName VARCHAR (50),
   street VARCHAR (50),
   city VARCHAR (50),
   state VARCHAR (50),
   zip INT (10),
   balance DECIMAL (10,2),
   email VARCHAR (100),
   phone INT (10),
   accountKey VARCHAR (50),
   description VARCHAR (255),
    PRIMARY KEY (id)
);

--creates cart table 
CREATE TABLE
IF NOT EXISTS cart
(
    id INT AUTO_INCREMENT NOT NULL,
   UserID INT (10) NOT NULL,
   SubscriptionId INT (10),
   quantity VARCHAR (50),
   PRIMARY KEY (id)
);