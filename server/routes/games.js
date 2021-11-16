const router = require("express").Router();
const Game = require("../models/Game");
const User = require("../models/User");

router.get("/", (req, res) => {
    res.send("game route")
});

router.get("/test", (req, res) => {
    res.send("test route")
});

router.post("/add", async(req, res) => {
    const game =  new Game(req.body)
    try {
        await game.save();
        res.send("ok")  
    }
    catch(err) {
        response.status(500).send(error);
    }
})

//get all games
router.get("/all", async(req, res) => {
    try{
        const games = await Game.find({});
        res.status(200).json(games);
    }
    catch(err){
        res.status(500).json(err);
    }
});

// get game
router.get("/:id", async(req, res) => {
    try{
        const game = await Game.findById(req.params.id);
        res.status(200).json(game);
    }
    catch(err){
        res.status(500).json(err);
    }
});


module.exports = router;