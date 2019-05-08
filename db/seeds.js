var db = require("../models");

module.exports = {
	createSeedData: function() {
		// db.sequelize.dropAllTables
			db.sequelize.sync({ force: true }).then(function() {
				db.Category
					.bulkCreate([
						{
                            name: "Movies",
                            img: "",
                            desc: "Assortment of Popular Movie-related stuff"
                        },
                        {
                            name: "Anime",
                            img: "",
                            desc: "Assortment of Anime stuff from all genres (Kodomo, Shonen, Shojo, Seinen, Josie, Harem, Reverse Harem, Romance, Horror, Comedy, Ecchi, Mecha, Lolicon, Shotacon, Isekai, Yaoi, Yuri, Drama, Supernatural, Thriller, Slice of Life)"
                        },
                        {
                            name: "Comics",
                            img: "",
                            desc: "Assortment of Marvel, DC and/or Indie Comics stuff"
                        },
                        {
                            name: "Video Gaming",
                            img: "",
                            desc: "Assortment of Video Gaming accessories/gear"
                        },
                        {
                            name: "Analog Gaming",
                            img: "",
                            desc: "Assortment of Analog Gaming stuff"
                        },
                        {
                            name: "TV Shows",
                            img: "",
                            desc: "Assortment of Popular TV Show-related stuff "
                        },
                        {
                            name: "Music",
                            img: "",
                            desc: "Assortment of cool Music stuff"
                        },
                        {
                            name: "Random",
                            img: "",
                            desc: "Assortment of Random pop culture related stuff"
                        }
                    ])
					.then(function() {
						db.Subscription
							.bulkCreate([
                                {
                                    name: "One-Time",
                                    price: 29.99,
                                    number_of_items: 5-10,
                                    premium: "1 PREMIUM Item Guaranteed!",
                                    shipping: "FREE Shipping NOT Included",
                                    img: ""
                                },
                                {
                                    name: "Mini",
                                    price: 11.99,
                                    number_of_items: 3-5,
                                    premium: "1in3 Chance of PREMIUM Item",
                                    shipping: "FREE Shipping Included!",
                                    img: ""
                                },
                                {
                                    name: "Original",
                                    price: 29.99,
                                    number_of_items: 5-10,
                                    premium: 1,
                                    shipping: "FREE Shipping Included!",
                                    img: ""
                                },
                                {
                                    name: "Premium",
                                    price: 29.99,
                                    number_of_items: 5-10,
                                    premium: 1,
                                    shipping: "FREE Shipping Included!",
                                    img: ""
                                }
                                
                            ])
                     });
            };
