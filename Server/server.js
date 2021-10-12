// Load configuration
require('./config/config')

// modules
const express = require("express")


const app = express()
const port = process.env.PORT;

app.get('/', (req, res) => {
    res.send("HI")
})

// Port listening
app.listen(port, () => { console.log('Server is listening on ', port) });
