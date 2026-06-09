require("dotenv").config();

const mongoose = require("mongoose");

const Driver = require("./models/Driver");

const drivers = require("./data/drivers");

const seed = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        await Driver.deleteMany();

        await Driver.insertMany(drivers);

        console.log("Database Seeded");

        process.exit();

    } catch (error) {

        console.log(error);

        process.exit(1);

    }

};

seed();