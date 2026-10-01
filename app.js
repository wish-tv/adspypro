const express = require('express')
const app = express()
require('dotenv').config()
const cors = require('cors')

const path = require('path');
// const whitelist = ['https://www.noovaplayer.com', 'https://dashboard.noovaplayer.com', 'https://reseller.noovaplayer.com'];
// const corsOptions = {
//     origin: function (origin, callback) {
//         if (!origin || whitelist.indexOf(origin) !== -1) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     }
// };
// app.use(cors(corsOptions));
app.use(cors())
const port = process.env.PORT || 3000

// Middleware setup
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }));
app.use(express.json({
    type: ['application/json', 'text/plain']
}));

app.use(express.urlencoded({
    extended: true
}));

// Connection DB
const connectionDB = require('./DB/connection')
connectionDB();

// Rate limiting sitting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 300,
    message: 'Too many requests, please try again later.',
});
app.use(limiter);

// Include your routes here
const { userRouter, subscriptionRouter } = require('./router/allRoutes')
app.use(userRouter, subscriptionRouter)

const request = require('request')
const CronJob = require('cron').CronJob;

// new CronJob('*/10 * * * *', function () {
//     request('https://servo-back.onrender.com/', function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             console.log('Wake up the server')
//         }
//     })
// }, null, true, 'America/New_York')

// Start server
app.get("/api/test", (req, res) => {
    res.json({ message: "API is working!" });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))