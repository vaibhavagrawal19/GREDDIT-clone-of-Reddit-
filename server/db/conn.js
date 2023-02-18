const mongoose = require('mongoose')

const connectToServer = async (callback) => {
    try {
        await mongoose.connect(process.env.DATABASE_URI);
        console.log("Successfully connected to MongoDB!");
    }
    catch (err) {
        console.log(err)
    }
    return callback;
}

module.exports = {
    connectToServer,
}