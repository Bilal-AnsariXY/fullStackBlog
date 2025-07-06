const mongoose = require('mongoose');

require('dotenv').config();

const database = () => {
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("db is connected");
    }).catch((err) => {
        console.log(err);
        process.exit(1);
    })
}

module.exports = database