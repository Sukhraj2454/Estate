// Load configuration and database connection
require('./config/config');
require("./db/mongoose");

// Modules
const express = require("express");
const app = express();
const port = process.env.PORT;

// User Modules
const { userRouter } = require('./Router/userRouter');

// Controller modules
const userController = require('./controllers/userController');

app.use(express.json());
app.use('/user', userRouter);

// Requests
app.get('/', (req, res) => {
    res.send("Main Page.");
});

app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;

    res.status(status).json({
        message: message,
        errors: error.data
    });
});

// Port
app.listen(port, () => { console.log('Server is listening on ', port) });

