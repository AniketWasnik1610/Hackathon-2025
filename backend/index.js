const express = require('express');
const dotenv = require('dotenv');
const { createServer } = require("http");
const { Server } = require("socket.io");
const { connectDB } = require('./config/dbConnect');
const blog = require('./Route/blog');
const FirstOtp = require('./controllers/utils/FirstOtp');
const Digit = require('./Models/digitModel');
const cors = require("cors");

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 5000;

app.use(express.json());

const corsOption = {
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    optionSuccessStatus: 200
}

app.use(cors(corsOption));

app.get('/', (req, res) => {
    res.send('|| Shree Ganeshya Namaha ||');
});

app.use('/api/v1', blog);


io.on("connection", async (socket) => {
    console.log("Client connected with ID:", socket.id);

    try {
        const digit = await Digit.findOne({ name: "digit" });

        socket.emit('Number', {
            number: digit ? digit.currentOtp : '000000000000'
        });

        socket.on('frontendMessage', async (data) => {
            try {
                const digit = await Digit.findOne({ name: "digit" });
                if (digit) {
                    digit.currentOtp = data.number;
                    await digit.save();
                    io.emit('Number', { number: data.number });
                }
            } catch (error) {
                console.error('Error handling frontend message:', error);
                socket.emit('error', { message: 'Failed to process message' });
            }
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });

    } catch (error) {
        console.error('Error in socket connection:', error);
        socket.emit('error', { message: 'Internal server error' });
    }
});

httpServer.listen(PORT, () => {
    connectDB();
    console.log(`Server running on port ${PORT}`);
    FirstOtp.setIO(io);
    FirstOtp.generateFirstOTP();
    setInterval(FirstOtp.generateFirstOTP, 0.5 * 60 * 1000);
});