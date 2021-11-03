const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helment = require('helmet');
const morgan = require('morgan');
const indexRoute = require("./routes/index")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const gameRoute = require("./routes/games")

dotenv.config();

mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

//middleware
app.use(express.json());
app.use(helment());
app.use(morgan("common"));

app.use('/', indexRoute);
app.use("/server/users", userRoute);
app.use("/server/auth", authRoute);
app.use("/server/games", gameRoute);

app.listen(5000, () => {
    console.log("backend server is running")
})

