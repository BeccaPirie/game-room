const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const helment = require('helmet');
const morgan = require('morgan');
const userRoute = require("./routes/users")
const authRoute = require("./routes/auth")
const gameRoute = require("./routes/games")
const multer = require("multer")
const path = require("path")

dotenv.config();

mongoose.connect(process.env.MONGO_URL,
    { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.use("/images", express.static(path.join(__dirname, "public/images")))

//middleware
app.use(express.json());
app.use(helment());
app.use(morgan("common"));

const storage = multer.diskStorage({
    destination:(req, file, cb ) => {
        cb(null, "public/images")
    },
    filename: (req, file, cb) => {
        cb(null, req.body.name)
    }
})

const upload = multer({ storage: storage });
app.post("/server/upload", upload.single("file"), (req, res) => {
    try{
        return res.status(200).json("File uploaded successfully")
    }
    catch(err) {
        console.log(err)
    }
})

app.use("/server/users", userRoute);
app.use("/server/auth", authRoute);
app.use("/server/games", gameRoute);

app.listen(5000, () => {
    console.log("backend server is running")
})

