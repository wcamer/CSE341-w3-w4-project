const express = require('express')
const app = express()
const passport = require('passport')
const session = require('express-session')
const dotenv = require('dotenv').config()
const gitStrat = require('passport-github2').Strategy



//best left in the server.js file
// app.use(passport.initialize())
// app.use(passport.session())

passport.use(new gitStrat({
    
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL

    },
    (accessToken, refreshToken, profile, done) => {
        // passport callback funciton to pass into database
        //find would be to find the user in the database
        //create would create a user in the database if they don't already exist
        //uncomment code below when creating those seperate functions
        // User.findOrCreate( {githubId: profile.id}, function (err,user) {
        //     return done(err,user)
        //     });

        // }
        // console.log("HERE IS FROM THE GITSTRAT ITS THE PROFILE",profile)

        return done(null,profile);}
))

passport.serializeUser((user, done)=>{
    // console.log("here is from the serializerUSER",user)
    done(null,user)
})

passport.deserializeUser((user,done)=>{
    done(null,user)
})

module.exports = passport 