const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helment = require('helmet');
const morgan = require('morgan');
const indexRoute = require("./routes/index")
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")

dotenv.config();

mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
    console.log("Connected to MONGODB")
});

//middleware
app.use(express.json());
app.use(helment());
app.use(morgan("common"));

app.use('/', indexRoute);
app.use("/users", userRoute);
app.use("/auth", authRoute);

app.listen(5000, () => {
    console.log("backend server is running")
})

