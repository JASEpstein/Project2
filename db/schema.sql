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