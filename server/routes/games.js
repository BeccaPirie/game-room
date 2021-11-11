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

// // get users favourite games
// router.get("/favourite-games/:user", async (req, res) => {
//     // const userId = req.query.userId;
//     // const username = req.query.username;
//     try {
//       const currentUser = 
//       await User.findOne({username: req.params.user}) || await User.findById(req.params.user);
//         const favouriteGames = await Promise.all(
//             currentUser.favGames.map((gameId) => {
//                 return Game.findById(gameId)
//             })
//         );
//          res.status(200).json(favouriteGames);      
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

// // get users recently played games
// router.get("/recently-played-games/:user", async (req, res) => {
//     try {
//         const currentUser = 
//         await User.findOne({username: req.params.user}) || await User.findById(req.params.user);
//           const recentlyPlayedGames = await Promise.all(
//               currentUser.recentGames.map((gameId) => {
//                   return Game.findById(gameId)
//               })
//           );
//            res.status(200).json(recentlyPlayedGames);      
//       } catch (err) {
//           res.status(500).json(err);
//       }
// })

module.exports = router;