const {body, validationResult} = require('express-validator')
const mongodb = require('../database/db')
const mongoDbObjectId = require('mongodb').ObjectId
const val = {}


val.getFoodRules = () => {
    

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
            const food = await mongodb.getDB().db().collection('food').findOne({_id: _id})
            if(!food) {
                throw new Error("food ID isn't Valid!!!" )
            }
         //console.log("hellow from inside the get food rules and here is the _id.....", food, _id)
        })
    ]
}

val.getFoodCheck = async (req, res, next) =>{
    const _id = req.params.id
    req.body = {_id}
    let errors = []
    errors =  validationResult(req)

    if(!errors.isEmpty()){
        console.log("Rule violation in getfoodCheck!!!  Operation canceled")
        res.status(400).json({Message: errors})
        return
    }
    else{
        console.log("It passed the getfoodCheck and associated rules.  Proceeding with retrieval operation")

    }
    next()
}

val.createFoodRules = () => {
    return [
        body('name')
        .trim()
        .isLength({min: 1 , max: 40})
        .withMessage("Please enter a valid name"),

        body('group')
        .trim()
        .isLength({min: 1, max: 10})
        .withMessage("Please fix food group")
       
        
    ]
}


val.createFoodCheck = async(req, res, next) =>{
    console.log( req.body, "here is req.body in create food")
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log("Rule violation in createfoodCheck!!!  Operation canceled")
        res.status(400).json({Message: errors})
        return
    }else{
        console.log("It passed the createfoodCheck and associated rules.  Proceeding to createfood operation")

    }
    next()
}


val.updateFoodRules = () => {
    return [
        body('name')
        .trim()
        .isLength({min: 1 , max:40})
        .withMessage("Please enter a valid name"),

        body('group')
        .trim()
        .isLength({min: 1, max: 10})
        .withMessage("Please fix food group")
        
    ]
}


val.updateFoodCheck = async(req, res, next) =>{
  
    let errors = []
    errors = validationResult(req)
    
    if(!errors.isEmpty()){
        console.log("Rule violation in updatefoodCheck!!!  Operation canceled")
        res.status(400).json({Message: errors})
        return
    }else{
        console.log("It passed the updatefoodCheck and associated rules.  Proceeding to update operation")

    }
    next()
}



val.deleteFoodRules = () => {
    return [
        body('_id')
        .trim()
        .isLength({min: 24, max: 24})
        .withMessage("Please enter a valid food ID")
        .custom(
            async (_id, {req}) => {
           _id = new mongoDbObjectId(req.params.id)
           console.log('here is _id', _id)
           const food = await mongodb.getDB().db().collection('food').findOne({_id: _id})
           if(food === null) {
            // console.log("*******************")
                //  console.log("here is the not food food", food)
               throw new Error("THis food ID doesn't exist!!!  Deletion canceled" )
               
           }
           
       })

  

    ]
}

val.deleteFoodCheck = async(req, res, next) =>{
    req.body._id = req.params.id
    // console.log('here is req.body in check', req.body)
    let errors = [] 
    errors = validationResult(req.body._id)
    if(!errors.isEmpty()){
        console.log("Rule violation in deletefoodCheck!!!  Operation canceled")
        res.status(400).json({Message: errors})
        return
        
    
    }else{
        
        console.log("It passed the deletefoodCheck and associated rules.  Proceeding to deletion operation")
    }
    next()
}

module.exports = val