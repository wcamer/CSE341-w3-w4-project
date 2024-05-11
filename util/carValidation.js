const {body, validationResult} = require('express-validator')
const mongodb = require('../database/db')
const mongoDbObjectId = require('mongodb').ObjectId
const val = {}


val.getCarRules = () => {
    

    return [

        body('_id')
        .trim()
        // .notEmpty()
        .isLength({min: 0, max: 24 })
        .withMessage("Please enter a valid id")
        .custom(
             async (_id, {req}) => {
            // console.log(">>>>>>>>>>>>>>>>>>>>>>>>>")
            _id = new mongoDbObjectId(req.params.id)
            //  console.log(_id, ".............here is the id",req.params)
            // console.log("!!!!!!!!!!!!!",_id, "------", req.params.id,req.body)
            // const _id = new mongoDbObjectId(req.params.id)
            const car = await mongodb.getDB().db().collection('cars').findOne({_id: _id})
            if(!car) {
                throw new Error("Car ID isn't Valid!!!" )
            }
         //console.log("hellow from inside the get cars rules and here is the _id.....", car, _id)
        })
    ]
}

val.getCarCheck = async (req, res, next) =>{
    // const _id = req.params 
    // req.body = _id
    // const _id = "hi world"
    // req.body = req.params
    const _id = req.params.id
     req.body = {_id}
    // console.log("here is _id", _id,"\n here is req.body",req.body)//,"\nhere is req.params",req.params)
    // console.log("here is req.body", req.body)
    let errors = []
    errors =  validationResult(req)

    if(!errors.isEmpty()){
        console.log("Rule violation in getCarCheck!!!  Operation canceled")
        res.status(400).json({Message: errors})
        return
    }
    else{
        console.log("It passed the getCarCheck and associated rules.  Proceeding with retrieval operation")

    }
    next()
}

val.createCarRules = () => {
    return [
        body('make')
        .trim()
        .isLength({min: 1, max: 41})
        .withMessage("Please enter a valid name"),

        body('model')
        .trim()
        .isLength({min: 1, max: 41})
        .withMessage("Please enter a valid model"),

        body('trim')
        .trim()
        .isLength({min: 1, max: 41})
        .withMessage("Please enter a valid trim level"),
        // .custom( console.log("hellow from inside the creat cars rules")),

        body('year')
        .trim()
        .toInt()
        .isLength({min: 4, max:4})
        .isInt()
        .withMessage("Please enter a 4 digit year"),
        

        body('color')
        .trim()
        .isLength({min: 1, max: 41})
        .withMessage("Please enter a valid color"),
        

        body('price')
        .trim()
        .toInt()
        .isLength({min: 1, max: 6})
        .isInt()
        .isNumeric()
        .withMessage("Please enter a valid price without the dollar sign "),
        

        body('miles')
        .trim()
        .toInt()
        .isLength({min: 1, max: 6})
        .isInt()
        .isNumeric()
        .withMessage("Please enter a valid mileage  "),
        
        
    ]
}


val.createCarCheck = async(req, res, next) =>{
    // console.log( req.body, "here is req.body in create car")
    let errors = []
    errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log("Rule violation in createCarCheck!!!  Operation canceled")
        res.status(400).json({Message: errors})
        return
    }else{
        console.log("It passed the createCarCheck and associated rules.  Proceeding to createCar operation")

    }
    next()
}


val.updateCarRules = () => {
    return [
        body('make')
        .trim()
        .isLength({min: 0 , max: 51 })
        // .isAlpha()
        .withMessage("Please enter a valid name"),

        body('model')
        .trim()
        .isLength({min: 1, max: 41})
        // .isAlpha()
        .withMessage("Please enter a valid model"),

        body('year')
        .trim()
        .isLength({min: 4, max: 4})
        // .toInt()
        // .isInt()
        .withMessage("Please enter a 4 digit year"),

        body('trim')
        .trim()
        .isLength({min: 1, max: 41})
        // .isAlpha()
        .withMessage("Please enter a valid trim level"),
        // .custom( console.log("hellow from inside the creat cars rules")),

       

        body('color')
        .trim()
        .isLength({min: 1, max: 41})
        // .isAlpha()
        .withMessage("Please enter a valid color"),
        

        body('price')
        .trim()
        .isLength({min: 1, max: 41})
        .toInt()
        .isInt()
        .isNumeric()
        .withMessage("Please enter a valid price without the dollar sign "),
        

        body('miles')
        .trim()
        .isLength({min: 1, max: 6})
        .toInt()
        .isInt()
        .isNumeric()
        .withMessage("Please enter a valid mileage  "),
        
        
    ]
}


val.updateCarCheck = async(req, res, next) =>{
   
    console.log("here is req.body", req.body)
    let errors = []
    errors = validationResult(req)
    // console.log(errors,"here is validationrresult",validationResult(req))
    if(!errors.isEmpty()){
        console.log("Rule violation in updateCarCheck!!!  Operation canceled")
        res.status(400).json({Message: errors})
        return
    }
    else{
        console.log("It passed the updateCarCheck and associated rules.  Proceeding to update operation")

    }
    next()
}



val.deleteCarRules = () => {
    return [
        body('_id')
        .trim()
        .isLength({min: 0, max: 24})
        .withMessage("Please enter a valid car ID")
        .custom(
            async (_id, {req}) => {
           _id = new mongoDbObjectId(req.params.id)
           const car = await mongodb.getDB().db().collection('cars').findOne({_id: _id})
        //    console.log("helow from delete rules her e is _id", _id,"\n here is car...",car)

           if(!car) {
             console.log("$$$$$$$$$$$")
            // res.status(400).json({message: errors})
               throw new Error("THis car ID doesn't exist!!!  Deletion canceled" )
           } 
           else{
            console.log("!!!!!!!!!!!!!!")
            // next()
           }
       })
    ]
}

val.deleteCarCheck = async(req, res, next) =>{
    console.log("here is req.params ihn delete",req.params,
    "\n here is req.body", req.body)

    req.body = req.params
    req.body_id = req.params.id 
    console.log("here is req.body_id", req.body_id)
    let errors = [] 
    errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log("Rule violation in deleteCarCheck!!!  Operation canceled")
        res.status(400).json({message: errors})
        return
    }else{
        console.log("It passed the deleteCarCheck and associated rules.  Proceeding to deletion operation")

    }
    next()
}

module.exports = val