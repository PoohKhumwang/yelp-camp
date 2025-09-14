const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;

db.on("error", console.error.bind(console.log, "Connection Error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "68a349154729c85c7ec1dfff",
      location: `${cities[random1000].city} ,${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: `https://picsum.photos/400?random=${Math.random()}`,
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam facilis est ipsa tempore aliquam. Corporis temporibus in non. Facere officiis ad vitae aperiam sequi reprehenderit! Ducimus quisquam quas ab mollitia.",
      price: price,
      geometry: {
        type: "Point", // Don't do `{ location: { type: String } }`,
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dpq0yg9oi/image/upload/v1756382729/YelpCamp/drhfc2a9jaza0wvljd4w.jpg",
          filename: "YelpCamp/drhfc2a9jaza0wvljd4w",
        },
        {
          url: "https://res.cloudinary.com/dpq0yg9oi/image/upload/v1756382731/YelpCamp/dh8nlssvjrcw9fr4uts4.jpg",
          filename: "YelpCamp/dh8nlssvjrcw9fr4uts4",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
