const crypto = require('crypto');
const nodemailer = require('nodemailer');

function generateOTP() {
    return crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP
}

const otp = generateOTP(); 

const transporter = nodemailer.createTransport({
    service: 'gmail', // or another service
    auth: {
        user: 'fireflickff@gmail.com',
        pass: 'efss ospk fzae nqba',
    },
});

function sendOTPEmail(email, otp) {
    const mailOptions = {
        from: 'fireflickff@gmail.com',
        to: email,
        subject: 'Your OTP Code',
        text: `Hello,\n\nYour OTP code is ${otp}. Please use this code to complete your registration.\n\nThank you for choosing our service!\n\nBest regards,\nFireFlick Team`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            // console.log('Email sent: ' + info.response);
        }
    });
}