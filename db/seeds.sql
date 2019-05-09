CREATE DATABASE nerdbox_db;

INSERT INTO nerdbox_db.Subscriptions
    (name,price,number_of_items,premium,shipping,img)
VALUES
    ("One-Time", "29.99", "5-10", "1 PREMIUM Item Guaranteed!", "FREE Shipping Included!", "1"),
    ("Mini", 11.99, "3-5", "1in3 Chance of PREMIUM Item", "FREE Shipping Included!", "1"),
    ("Original", 24.99, "5-10", "1 PREMIUM Item Guaranteed!", "FREE Shipping Included!", "1"),
    ("Premium", 34.99, "15-18", "2 PREMIUM Items Guaranteed!", "FREE Shipping Included!", "2");


INSERT INTO nerdbox_db.Categories
    (name, img, description)
VALUES
    ("Movies", "1", "Assortment of Popular Movie-related stuff"),
    ("Anime", "1", "Assortment of Anime stuff from all genres (Kodomo, Shonen, Shojo, Seinen, Josie, Harem, Reverse Harem, Romance, Horror, Comedy, Ecchi, Mecha, Lolicon, Shotacon, Isekai, Yaoi, Yuri, Drama, Supernatural, Thriller, Slice of Life)"),
    ("Comics", "1", "Assortment of Marvel, DC and/or Indie Comics stuff"),
    ("Video Gaming", "1", "Assortment of Video Gaming accessories/gear"),
    ("Analog Gaming", "1", "Assortment of Analog Gaming stuff"),
    ("Music", "1", "Assortment of cool Music stuff"),
    ("TV Shows", "1", "Assortment of Popular TV Show-related stuf"),
    ("Random", "1", "Assortment of Random pop culture related stuff");