// connection to mongoDB atlas database.

const mongoose = require('mongoose');

const connectDB = async() => {
    // mongoose.connect takes in the application URI generated from the DB. We store this in the process
    //      environment variables to make it secret
    const conn = await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
};

module.exports = connectDB; // exporting connection method to use in server.js