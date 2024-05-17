const express = require('express')
const router = express.Router()
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('../project2-swagger-output.json');
const passport = require('passport');
const session = require("express-session")


router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDoc))



router.use('/cars', require('./carRoute'))
router.use('/games' , require('./gameRoute'))
router.use('/food', require('./foodRoute'))
router.use('/music', require('./musicRoute'))

router.use('/login', passport.authenticate('github'), (req, res) =>{})
router.use('/logout',(req, res, next)=>{
    req.logout((err)=>{
        if(err) {return next(err)}
        res.redirect('/')
    })
} )

router.get('/', (req,res) =>{
    if(req.session.user == undefined){
        res.send("Welcome to Project 2.  Use the cars route or game route")
        console.log("here is the session object", session)
    }
    else{
        console.log('here is the successful session user found',req.session)
        res.send(`Welcome "${req.session.user.username}" to Project 2.  Use the cars route or game route`)
    }

    
})




module.exports = router