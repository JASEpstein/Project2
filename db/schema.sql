CREATE DATABASE nerdbox_db;
USE nerdbox_db;

CREATE TABLE subscription
(
    id INTEGER NOT NULL
    AUTO_INCREMENT,
    category VARCHAR
    (20),
    subscription_level INTEGER NOT NULL,
    PRIMARY KEY
    (id)
);
1

USE nerdbox_db;

CREATE TABLE accounts
(
    id int NOT NULL AUTO_INCREMENT,
    firstName varchar(30) NOT NULL,
    lastName varchar(30) NOT NULL,
    street VARCHAR(30) NOT NULL,
    city VARCHAR(30) NOT NULL,
    state VARCHAR(2) NOT NULL,
    zip int(5) NOT NULL,
    balance decimal(12, 2) DEFAULT NULL,
    email VARCHAR(100) NOT NULL,
    phone int NOT NULL,
    accountKey VARCHAR(8) NOT NULL,
    PRIMARY KEY (id)
);

