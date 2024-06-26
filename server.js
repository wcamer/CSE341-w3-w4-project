const express = require('express')
const app = express()
const mongodb = require('./database/db')
const bodyParser = require('body-parser')
//////////
// const passport = require('passport') // this is being imported from passport-setup
const passport = require('./util/passport-setup')
const session = require('express-session')
// const ghStrat = require('passport-github2').Strategy

const cors = require('cors')

const port = process.env.PORT || 3000


app.use(bodyParser.json())

app.use(session({
    secret: process.env.SECRET, //should be a random number
    resave: false, 
    saveUninitialized: true,
}))


//Passport intialization
app.use(passport.initialize()) //this is initialized in passport-setup
app.use(passport.session())// this is set up in passport-setup

app.use((req,res,next) => {
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    next()
})

// console.log("here is passport...\n",passport)
app.use(cors({ methods: ['GET', 'POST','PUT','DELETE']}))
app.use(cors({origin: '*'}))


app.use('/' , require('./routes'))



app.get('/github/callback', passport.authenticate('github', {
    
    failureRedirect: '/api-docs', session: false}),
    (req, res) =>{
        req.session.user = req.user;
        console.log(`Welcome user "${req.session.user.username}`)
        res.redirect('/')
        
        
    }
)


mongodb.init((err) =>{
    if(err) {
        console.log(err)
    }else{
        app.listen(port, () => {console.log("Database is connected and listening on port: ", port)})
    }
})