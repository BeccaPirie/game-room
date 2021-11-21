const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Game = require("../models/Game")

router.get("/test", (req, res) => {
    res.send("test")
});

// update user
router.put("/:id", async(req, res) => {
    if(req.body.userId == req.params.id || req.body.isAdmin){
        if(req.body.password){
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            catch(err){
                return res.status(500).json(err);
            }
        }
        try{
            const user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            });
            res.status(200).json("Account has been updated")
        }
        catch(err){
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can only update your account")
    }
});

// delete user
router.delete("/:id", async(req, res) => {
    if(req.body.userId == req.params.id || req.body.isAdmin){
        try{
            const user = await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted")
        }
        catch(err){
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can only delete your account")
    }
});

// get user
router.get("/", async(req, res) => {
    const userId = req.query.userId;
    const username = req.query.username;
    try{
        const user = userId 
        ? await User.findById(userId)
        : await User.findOne({username: username});
        const {password, updatedAt, ...other} = user._doc;
        res.status(200).json(other);
    }
    catch(err){
        res.status(500).json(err);
    }
});

// follow user
router.put("/:id/follow", async(req, res) => {
    if(req.body.userId !== req.params.id) {
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)) {
                await user.updateOne({$push:{followers:req.body.userId}});
                await currentUser.updateOne({$push:{following:req.params.id}});
                res.status(200).json("User has been followed");
            } else {
                res.status(403).json("You already follow this user");
            }
        }
        catch(err){
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can't follow yourself")
    }
});

// unfollow user
router.put("/:id/unfollow", async(req, res) => {
    if(req.body.userId !== req.params.id) {
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)) {
                await user.updateOne({$pull:{followers:req.body.userId}});
                await currentUser.updateOne({$pull:{following:req.params.id}});
                res.status(200).json("User has been unfollowed");
            } else {
                res.status(403).json("You don't follow this user");
            }
        }
        catch(err){
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can't unfollow yourself")
    }
});

// get following
router.get("/following/:user", async (req, res) => {
    try {
        const currentUser =
        await User.findOne({username: req.params.user}) || await User.findById(req.params.user);
        const following = await Promise.all(
            currentUser.following.map((userId) => {
                return User.findById(userId)
            })
        );
        res.status(200).json(following);
    }
    catch(err) {
        res.status(500).json(err);
    }
})

// get followers
router.get("/followers/:user", async (req, res) => {
    try {
        const currentUser =
        await User.findOne({username: req.params.user}) || await User.findById(req.params.user);
        const followers = await Promise.all(
            currentUser.followers.map((userId) => {
                return User.findById(userId)
            })
        );
        res.status(200).json(followers)
    }
    catch(err) {
        res.status(500).json(err);
    }
})

// get users favourite games
router.get("/favourite-games/:user", async (req, res) => {
    // const userId = req.query.userId;
    // const username = req.query.username;
    try {
      const currentUser = 
      await User.findOne({username: req.params.user}) || await User.findById(req.params.user);
        const favouriteGames = await Promise.all(
            currentUser.favGames.map((gameId) => {
                return Game.findById(gameId)
            })
        );
         res.status(200).json(favouriteGames);      
    } catch (err) {
        res.status(500).json(err);
    }
})

// get users recently played games
router.get("/recently-played-games/:user", async (req, res) => {
    try {
        const currentUser = 
        await User.findOne({username: req.params.user}) || await User.findById(req.params.user);
          const recentlyPlayedGames = await Promise.all(
              currentUser.recentGames.map((gameId) => {
                  return Game.findById(gameId)
              })
          );
           res.status(200).json(recentlyPlayedGames);      
      } catch (err) {
          res.status(500).json(err);
      }
})

// add game to favourites
router.put("/:gameId/add-to-favourites", async (req, res) => {
    try {
        const user = await User.findById(req.body.userId)
        if(!user.favGames.includes(req.params.gameId)) {
            await user.updateOne({$push:{favGames:req.params.gameId}})
            res.status(200).json("Game has been added to favourites")
        } else {
            res.status(403).json("This game is already in your favourites")
        }
    }
    catch(err) {
        res.status(500).json(err)
    }
})

// remove game from favourites
router.put("/:gameId/remove-from-favourites", async (req, res) => {
    try {
        const user = await User.findById(req.body.userId)
        if(user.favGames.includes(req.params.gameId)) {
            await user.updateOne({$pull:{favGames:req.params.gameId}})
            res.status(200).json("Game has been removed from favourites")
        }
        else {
            res.status(403).json("This game is not in your favourites")
        }
    }
    catch(err) {
        res.status(500).json(err)
    }
})

// add game to recently played
router.put("/:gameId/add-to-recently-played", async (req, res) => {
    try {
        const user = await User.findById(req.body.userId)
        await user.updateOne({$push:
            {recentGames:{
                $each:[req.params.gameId],
                $position:0,
                $slice:10
            }}})
        res.status(200).json("Game added to recently played")     
    }
    catch(err) {
        res.status(500).json(err)
    }
})

// remove game from recently played
router.put("/:gameId/remove-from-recently-played", async (req, res) => {
    try {
        const user = await User.findById(req.body.userId)
        if(user.recentGames.includes(req.params.gameId)) {
            await user.updateOne({$pull:{recentGames:req.params.gameId}})
            res.status(200).json("Game removed from recently played")
        }
    }
    catch(err) {
        res.status(500).json(err)
    }
})

// add game to last played
router.put("/:gameId/last-played", async (req, res) => {
    try {
        const user = await User.findById(req.body.userId)
        await user.updateOne({$set:{lastPlayed:req.params.gameId}})
        res.status(200).json("Game set to last played")
    }
    catch(err) {
        res.status(500).json(err)
    }
})

// update points
router.put("/add-user-points/:points", async (req, res) => {
    try {
        const user = await User.findById(req.body.userId)
        await user.updateOne({$inc:{points:req.params.points}})
        res.status(200).json("Points updated")
    }
    catch(err) {
        res.status(500).json(err)
    }
})

// search users

module.exports = router