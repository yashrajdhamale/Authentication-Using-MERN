const mongoose = require('mongoose');

const uri = process.env.URI; //give connection url

const ConnectDB = async() =>{
    try {
        await mongoose.connect(uri);
        console.log("Connected to the Database");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

module.exports = ConnectDB; 