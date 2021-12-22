const router = require("express").Router();
const Game = require("../models/Game");

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

// save score
router.put("/save-score/:score", async(req, res) => {
    try{
        const game = await Game.findById(req.body.gameId)
        await game.updateOne({$push:{score:req.params.score}})
        res.status(200).json("Score added to database")
    }
    catch(err){
        res.status(500).json(error)
    }
})

module.exports = router;