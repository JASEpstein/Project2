DROP DATABASE IF EXISTS nerdbox_db;
CREATE DATABASE nerdbox_db;
USE nerdbox_db;

CREATE TABLE category
(
    id INTEGER NOT NULL
    AUTO_INCREMENT,
    name VARCHAR
    (20),
    img VARCHAR
    (255),
    description VARCHAR
    (255),
    PRIMARY KEY
    (id)
);

    CREATE TABLE subscription
    (
        name VARCHAR (20),
        price VARCHAR (10),
        number_of_items VARCHAR (10),
        premium VARCHAR (100),
        shipping VARCHAR (100),
        img VARCHAR (255)

    );
