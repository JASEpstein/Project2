var db = require("../models");

module.exports = {
  createSeedData: function() {
    db.Category.bulkCreate([
      {
        name: "Movies",
        description: "Assortment of Popular Movie-related stuff"
      },
      {
        name: "Anime",
        description:
          "Assortment of Anime stuff from all genres (Kodomo, Shonen, Shojo, Seinen, Josie, Harem, Reverse Harem, Romance, Horror, Comedy, Ecchi, Mecha, Lolicon, Shotacon, Isekai, Yaoi, Yuri, Drama, Supernatural, Thriller, Slice of Life)"
      },
      {
        name: "Comics",
        description: "Assortment of Marvel, DC and/or Indie Comics stuff"
      },
      {
        name: "Video Gaming",
        description: "Assortment of Video Gaming accessories/gear"
      },
      {
        name: "Analog Gaming",
        description: "Assortment of Analog Gaming stuff"
      },
      {
        name: "TV Shows",
        description: "Assortment of Popular TV Show-related stuff"
      },
      {
        name: "Music",
        description: "Assortment of cool Music stuff"
      },
      {
        name: "Random",
        description: "Assortment of Random pop culture related stuff"
      }
    ]).then(function() {
      db.Subscription.bulkCreate([
        {
          name: "One-Time",
          price: 29.99,
          number_of_items: "5-10",
          premium: "1 PREMIUM Item Guaranteed!",
          shipping: "FREE Shipping Included!"
        },
        {
          name: "Mini",
          price: 11.99,
          number_of_items: "3-5",
          premium: "1in3 Chance of PREMIUM Item",
          shipping: "FREE Shipping Included!"
        },
        {
          name: "Original",
          price: 24.99,
          number_of_items: "5-10",
          premium: "1 PREMIUM Item Guaranteed!",
          shipping: "FREE Shipping Included!"
        },
        {
          name: "Premium",
          price: 34.99,
          number_of_items: "15-18",
          premium: "2 PREMIUM Items Guaranteed!",
          shipping: "FREE Shipping Included!"
        }
      ]);
    });
  }
};
