const otpGenerator = require('otp-generator');
const Digit = require('../../Models/digitModel');
let io;

exports.setIO = (socketIO) => {
    io = socketIO;
};

function hasFourConsecutiveRepeatingDigits(otp) {
    return /(\d)\1{3}/.test(otp);
}

function checkAnamoly(otp) {
    if (hasFourConsecutiveRepeatingDigits(otp)) {
        return true;
    }
    return false;
}

exports.generateFirstOTP = async () => {
    try {

        do {
            otp = otpGenerator.generate(12, {
                upperCaseAlphabets: false,
                specialChars: false,
                lowerCaseAlphabets: false,
                digits: true
            });
        } while (checkAnamoly(otp));

        let digit = await Digit.findOne({ name: "digit" });

        if (digit) {
            digit.currentOtp = otp;
            digit.history = digit.history ? [...digit.history, otp] : [otp];
            await digit.save();
            if (io) {
                io.emit('Number', { number: otp });
            }
        } else {
            digit = await Digit.create({
                name: "digit",
                currentOtp: otp,
                history: [otp]
            });
        }

        console.log("otp: ", otp);
        return otp;
    } catch (err) {
        console.error("Error in OTP generation: ", err.message);
        throw err;
    }
}