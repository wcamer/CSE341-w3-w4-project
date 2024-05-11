const {body, validationResult} = require('express-validator')
const mongodb = require('../database/db')
const mongoDbObjectId = require('mongodb').ObjectId
const val = {}


val.getGameRules = () => {
    

    return [

        body('_id')
        .trim()
        // .notEmpty()
        .isLength({min: 0, max: 24 })
        .withMessage("Please enter a valid id")
        .custom(async (_id, {req}) => {
            // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>")
            _id = new mongoDbObjectId(req.params.id)
            //  console.log(_id, ".............here is the id",req.params)
            // console.log("!!!!!!!!!!!!!",_id, "------", req.params.id,req.body)
            // const _id = new mongoDbObjectId(req.params.id)
            const game = await mongodb.getDB().db().collection('games').findOne({_id: _id})
            if(!game) {
                throw new Error("game ID isn't Valid!!!" )
            }
         //console.log("hellow from inside the get games rules and here is the _id.....", game, _id)
        })
    ]
}

val.getGameCheck = async (req, res, next) =>{
    const _id = req.params.id
    req.body = {_id}
    let errors = []
    errors =  validationResult(req)

    if(!errors.isEmpty()){
        console.log("Rule violation in getGameCheck!!!  Operation canceled")
        res.status(400).json({Message: errors})
        return
    }
    else{
        console.log("It passed the getGameCheck and associated rules.  Proceeding with retrieval operation")

    }
    next()
}

val.createGameRules = () => {
    return [
        body('name')
        .trim()
        .isLength({min: 1 , max: 40})
        .withMessage("Please enter a valid name"),

        body('rating')
        .trim()
        .isLength({min: 1, max: 1})
        .withMessage("Please fix game rating")
        .custom(async (id,{req}) => {
    
            validRating = ['E','e','T','t','M','m','P','p']
            rating = req.body.rating
    
    
            if(!validRating.includes(rating)) {
                console.log("************/*/*/*/*/*/*/**")
                throw new Error("Please enter a valid rating (E, T, M, P)" )
            }
        })

    
        
    ]
}


val.createGameCheck = async(req, res, next) =>{
    console.log( req.body, "here is req.body in create Game")
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log("Rule violation in createGameCheck!!!  Operation canceled")
        res.status(400).json({Message: errors})
        return
    }else{
        console.log("It passed the createGameCheck and associated rules.  Proceeding to createGame operation")

    }
    next()
}


val.updateGameRules = () => {
    return [
        body('name')
        .trim()
        .isLength({min: 1 , max:40})
        .withMessage("Please enter a valid name"),

        body('rating')
        .trim()
        .isLength({min: 1, max: 1})
        .withMessage("Please fix game rating")
        .custom(async (id,{req}) => {
    
            validRating = ['E','e','T','t','M','m','P','p']
            rating = req.body.rating
    
    
            if(!validRating.includes(rating)) {
                // console.log("************/*/*/*/*/*/*/**")
                throw new Error("Please enter a valid rating (E, T, M, P)" )
            }
            
            else{
                console.log("yo mama")
            }
       
        })
        
    ]
}


val.updateGameCheck = async(req, res, next) =>{
  
    let errors = []
    errors = validationResult(req)
    
    if(!errors.isEmpty()){
        console.log("Rule violation in updateGameCheck!!!  Operation canceled")
        res.status(400).json({Message: errors})
        return
    }else{
        console.log("It passed the updateGameCheck and associated rules.  Proceeding to update operation")

    }
    next()
}



val.deleteGameRules = () => {
    return [
        body('_id')
        .trim()
        .isLength({min: 24, max: 24})
        .withMessage("Please enter a valid Game ID")
        .custom(
            async (_id, {req}) => {
           _id = new mongoDbObjectId(req.params.id)
           console.log('here is _id', _id)
           const game = await mongodb.getDB().db().collection('games').findOne({_id: _id})
           if(game === null) {
            // console.log("*******************")
                //  console.log("here is the not game game", game)
               throw new Error("THis Game ID doesn't exist!!!  Deletion canceled" )
               
           }
           
       })

  

    ]
}

val.deleteGameCheck = async(req, res, next) =>{
    req.body._id = req.params.id
    // console.log('here is req.body in check', req.body)
    let errors = [] 
    errors = validationResult(req.body._id)
    if(!errors.isEmpty()){
        console.log("Rule violation in deleteGameCheck!!!  Operation canceled")
        res.status(400).json({Message: errors})
        return
        
    
    }else{
        
        console.log("It passed the deleteGameCheck and associated rules.  Proceeding to deletion operation")
    }
    next()
}

module.exports = val