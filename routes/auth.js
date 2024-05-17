const router = require('express').Router()
const passport = require('passport')
const ghStrat = require('passport-github2')
const db = require('../database/db')

const checkObj = {}

// passport.use(new ghStrat({
//     clientID: process.env.cID,
//     clientSecret: process.env.cSecret,
//     callbackURL: 'http://127.0.0.1:3000/auth/github/callback'

// },
// function(accessToken, refreshToken, profile, done){
//     UserActivation.findOrCreate({ githubId: profile.id}, function (err, user) {
//         return done(err, user)
//     })
// }
// ))
checkObj.authCheck = async (req,res, next) =>{
    console.log("starting authorization check..........")
    if(req.session.user === undefined){
         res.status(400).json("You don't have access to perform that action")
         return
    }else{
        console.log("Authorization confirmed...")
    }
    next()
}


router.get("/",(req,res)=> {
    res.send('Hello from the Auth landing page.  If you are seeing this, something went wrong.')
    // res.redirect('')
    // res.redirect('/login/github')
    // res.redirect('/', authCheck)
    


})
router.get("/github", (req,res) =>{
    // res.send("you are now going to github")
    passport.authenticate('github', {scope: ['user:email']})
})

router.get("/logout", (req,res) =>{
    res.send("logging out but will be handled with passport")
})



// router.get("/login", (req,res) => {
//     // res.send("hi from the login page")
//     res.redirect('/auth/login/google')
// })



// router.get("/google", (req,res) => {
//     res.send("logging in with google but will be handled with passport")
// })




module.exports = {router, checkObj}