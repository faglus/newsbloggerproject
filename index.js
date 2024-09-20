const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

// Import routes and middleware
const isBlogExist = require('./middleware/blogExist');

const adminRoute = require('./routes/admin.route')

// Global middleware to check if the blog exists

app.use(isBlogExist.isBlogEXistOrNot);


// Use routes

app.use('/', adminRoute)



// Root route
app.get('/', (req, res) => {
    res.send("Welcome to the NEWZBLOGGER new project!");
});












// Mongoose connection
const databaseUrl = process.env.DATABASE_URL;
const dbName = 'newzblogger';

mongoose.connect(databaseUrl, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log(`Connected to MongoDB: ${dbName}`);
});



// Start server on specified port
const PORTNo = process.env.PORT
app.listen(PORTNo, () => {
    console.log(`Server started at PORT No ${PORTNo}`);
});