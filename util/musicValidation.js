const {body, validationResult} = require('express-validator')
const mongodb = require('../database/db')
const mongoDbObjectId = require('mongodb').ObjectId
const val = {}


val.getMusicRules = () => {
    

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
            const music = await mongodb.getDB().db().collection('music').findOne({_id: _id})
            if(!music) {
                throw new Error("music ID isn't Valid!!!" )
            }
         //console.log("hellow from inside the get music rules and here is the _id.....", music, _id)
        })
    ]
}

val.getMusicCheck = async (req, res, next) =>{
    const _id = req.params.id
    req.body = {_id}
    let errors = []
    errors =  validationResult(req)

    if(!errors.isEmpty()){
        console.log("Rule violation in getMusicCheck!!!  Operation canceled")
        res.status(400).json({Message: errors})
        return
    }
    else{
        console.log("It passed the getMusicCheck and associated rules.  Proceeding with retrieval operation")

    }
    next()
}

val.createMusicRules = () => {
    return [
        body('name')
        .trim()
        .isLength({min: 1 , max: 40})
        .withMessage("Please enter a valid name"),

        body('genre')
        .trim()
        .isLength({min: 1, max: 10})
        .withMessage("Please fix music genre")
      

    
        
    ]
}


val.createMusicCheck = async(req, res, next) =>{
    console.log( req.body, "here is req.body in create music")
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log("Rule violation in createMusicCheck!!!  Operation canceled")
        res.status(400).json({Message: errors})
        return
    }else{
        console.log("It passed the createMusicCheck and associated rules.  Proceeding to createmusic operation")

    }
    next()
}


val.updateMusicRules = () => {
    return [
        body('name')
        .trim()
        .isLength({min: 1 , max:40})
        .withMessage("Please enter a valid name"),

        body('genre')
        .trim()
        .isLength({min: 1, max: 10})
        .withMessage("Please fix music genre")
       
        
    ]
}


val.updateMusicCheck = async(req, res, next) =>{
  
    let errors = []
    errors = validationResult(req)
    
    if(!errors.isEmpty()){
        console.log("Rule violation in updateMusicCheck!!!  Operation canceled")
        res.status(400).json({Message: errors})
        return
    }else{
        console.log("It passed the updateMusicCheck and associated rules.  Proceeding to update operation")

    }
    next()
}



val.deleteMusicRules = () => {
    return [
        body('_id')
        .trim()
        .isLength({min: 24, max: 24})
        .withMessage("Please enter a valid music ID")
        .custom(
            async (_id, {req}) => {
           _id = new mongoDbObjectId(req.params.id)
           console.log('here is _id', _id)
           const music = await mongodb.getDB().db().collection('music').findOne({_id: _id})
           if(music === null) {
            // console.log("*******************")
                //  console.log("here is the not music music", music)
               throw new Error("THis music ID doesn't exist!!!  Deletion canceled" )
               
           }
           
       })

  

    ]
}

val.deleteMusicCheck = async(req, res, next) =>{
    req.body._id = req.params.id
    // console.log('here is req.body in check', req.body)
    let errors = [] 
    errors = validationResult(req.body._id)
    if(!errors.isEmpty()){
        console.log("Rule violation in deletemusicCheck!!!  Operation canceled")
        res.status(400).json({Message: errors})
        return
        
    
    }else{
        
        console.log("It passed the deletemusicCheck and associated rules.  Proceeding to deletion operation")
    }
    next()
}

module.exports = val