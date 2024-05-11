const mDB = require('../database/db')
const mongoDbObjectId = require('mongodb').ObjectId

const getAllCars = async (req,res) => {
    const collection = await mDB.getDB().db().collection('cars').find().toArray()
    // console.log(collection)
    res.setHeader("Content-Type", "application/json")
    // res.send(collection)
    res.json(collection)
}

const getCar = async (req,res) => {
    /*
    #swagger.description = Use this to get the Maxima 663d016ca665137bd12b2a70
    */
    const id = new mongoDbObjectId(req.params.id)
    // console.log("here is id from the car contorller...", id)
    const car = await mDB.getDB().db().collection('cars').find({_id: id}).toArray()

    res.setHeader("Content-Type", "application/json")
    res.json(car)
}

const createCar = async (req,res) => {
       /*
    #swagger.responses[204] = {description: "Car creation was successful"}
    */
    const newCar = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        trim: req.body.trim,
        color: req.body.color,
        price: req.body.price,
        miles: req.body.miles
    }

    const db = await mDB.getDB().db().collection('cars').insertOne(newCar)
    if (db.acknowledged){
        res.status(204).send("creation was successful")
    }else{
        res.status(500).json(db.error) || "Error occured while trying to create this vehicle.  Operation canceled"
    }
}

const updateCar = async (req,res) => {
    /*
    #swagger.responses[204] = {description: "Update was successful"}
    */
    
    const id = new mongoDbObjectId(req.params.id)
    // console.log("hiiiiiiiiiiiiii from the controller ", id)
    const carInfo = {
        make: req.body.make,
        model: req.body.model,
        year: req.body.year,
        trim: req.body.trim,
        color: req.body.color,
        price: req.body.price,
        miles: req.body.miles
    }
    // console.log("here is carinfo from update controller ", carInfo)

    const db = await mDB.getDB().db().collection('cars').replaceOne({_id: id}, carInfo)
    // console.log('here is db....',db)
    if (db.modifiedCount > 0){
        res.status(204).send("Update was successful!!!")
       
        
    }else{
        res.status(500).json(db.error || "Error during 'car update' operation.  Update canceled.")
    }
}

const deleteCar = async (req, res) =>{
       /*
    #swagger.responses[204] = {description: "Deletion was successful"}
    */
    const id = new mongoDbObjectId(req.params.id)
    const db = await mDB.getDB().db().collection('cars').deleteOne({_id: id})
    if (db.deletedCount > 0){
        res.status(204).send('Deletion was successful!!!')
    }else{
        res.status(500).json(db.error || "Error occured during deletion.  Operation canceled")
    }
}

module.exports = {getAllCars, getCar, updateCar, deleteCar, createCar}