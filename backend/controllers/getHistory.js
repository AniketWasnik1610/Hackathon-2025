const Digit = require('../Models/digitModel');

exports.getHistory = async (req, res) => {
    try {
        const { call } = req.query;
        const ith = parseInt(call) || 1;
        const digit = await Digit.findOne({ name: "digit" });


        if (!digit) {
            return res.status(400).json({ error: "Not Found" })
        }

        const index = ith - 1;

        const toSend = digit.history.slice(index, index + 50);

        return res.status(200).json({ history: toSend });
    } catch (err) {
        console.log("error in random number generation error => ", err.message);
        return res.status(500).json({ error: err.message });
    }
}