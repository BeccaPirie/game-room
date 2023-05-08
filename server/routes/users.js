const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Game = require("../models/Game")
const protect = require("../middleware/auth")

// update user
router.put("/:id", protect, async(req, res) => {
    if(req.user._id == req.params.id || req.user.isAdmin){
        try{
            await User.findByIdAndUpdate(req.params.id, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    profilePicture: req.body.profilePicture
                }
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

// update user password
router.put("/updatePassword/:id", protect, async(req,res) => {
    if(req.user._id == req.params.id || req.user.isAdmin){
        try{
            const user = await User.findById(req.params.id)
            const validPassword = await bcrypt.compare(req.body.oldPassword, user.password);

            if(!validPassword) {
                res.status(400).json("wrong password");
            }
            else {
                const salt = await bcrypt.genSalt(10);
                const newPassword = await bcrypt.hash(req.body.newPassword, salt);

                await User.findByIdAndUpdate(req.params.id, {
                    $set: {
                        password: newPassword
                    }
                });
                res.status(200).json("Password has been updated")  
            }
        }
        catch(err){
            return res.status(500).json(err);
        }
    } else {
        return res.status(403).json("You can only update your account")
    }
});

// delete user
router.delete("/:id", protect, async(req, res) => {
    if(req.user._id == req.params.id){
        try{
            await User.findByIdAndDelete(req.params.id);
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
router.put("/:id/follow", protect, async(req, res) => {
    if(req.user._id !== req.params.id) {
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
router.put("/:id/unfollow", protect, async(req, res) => {
    if(req.user._id !== req.params.id) {
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
router.get("/following/:user", protect, async (req, res) => {
    try {
        const currentUser = User.findById(req.user._id)
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
        const currentUser = await User.findOne({username: req.params.user}) || await User.findById(req.params.user);
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
    try {
      const currentUser = await User.findOne({username: req.params.user}) || await User.findById(req.params.user);
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
        const currentUser = await User.findOne({username: req.params.user}) || await User.findById(req.params.user);
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
router.put("/:gameId/add-to-favourites/", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
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
router.put("/:gameId/remove-from-favourites", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
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
router.put("/:gameId/add-to-recently-played", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
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
router.put("/:gameId/remove-from-recently-played", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
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
router.put("/:gameId/last-played", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        await user.updateOne({$set:{lastPlayed:req.params.gameId}})
        res.status(200).json("Game set to last played")
    }
    catch(err) {
        res.status(500).json(err)
    }
})

// update points
router.put("/add-user-points/:points", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        await user.updateOne({$inc:{points:req.params.points}})
        res.status(200).json("Points updated")
    }
    catch(err) {
        res.status(500).json(err)
    }
})

// add top score
router.put("/add-top-score/:score", protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const checkGame = user.topScores.find(score => score.gameId === req.body.gameId)
        if(checkGame) return res.json("game already added")
        await user.updateOne({$push:{
            topScores:{
                gameId: req.body.gameId,
                score: req.params.score
            }
        }})
        res.status(200).json("Top score added")
    } catch (err) {
        res.status(500).json(err)
    }
})

// update top score
router.put("/update-top-score/:score", protect, async(req, res) => {
    try {
        await User.findOneAndUpdate({
            _id: req.user._id,
            'topScores.gameId': req.body.gameId
        },
        {$set: {'topScores.$.score': req.params.score}},
        {new:true})
        res.status(200).json("Top score updated")
    }
    catch(err) {
        res.status(500).json(err)
    }
})

// search users
router.get("/getUsers/:search", async(req, res) => {
    try{
        const searchTerm = req.params.search
        const users = await User.find({username: searchTerm});
        res.status(200).json(users);
    }
    catch(err){
        res.status(500).json(err);
    }
});

module.exports = router