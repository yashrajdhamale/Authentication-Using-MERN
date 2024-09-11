require('dotenv').config();
const express = require('express'); // Importing Express module
const ConnectDB = require('./ConnectDB'); // Importing database connection module
const router = require('./Router');
const cors = require('cors');

const app = express(); // Creating an Express app instance
const PORT = 3001; // Defining the port number

app.use(cors()); 
app.use(express.json());

app.use('/',router);


// Connect to the database and start the server
ConnectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Connected to the port http://localhost:${PORT}/`); // Log when the server starts
    });
}).catch((err) => {
    console.error('Failed to connect to the database', err); // Log if the database connection fails
});
