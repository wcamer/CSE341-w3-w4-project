const mDB = require('../database/db')
const mongoDbObjectId = require('mongodb').ObjectId

const getAllFood = async (req,res) => {
    const collection = await mDB.getDB().db().collection('food').find().toArray()
    // console.log(collection)
    res.setHeader("Content-Type", "application/json")
    // res.send(collection)
    res.json(collection)
}

const getFood = async (req,res) => {
    const id = new mongoDbObjectId(req.params.id)
    const food = await mDB.getDB().db().collection('food').find({_id: id}).toArray()
    
    res.setHeader("Content-Type", "application/json")
    res.json(food)
}

const createFood = async (req,res) => {
     /*
    #swagger.responses[204] = {description: "Creation was successful"}
    */
    const newFood = {
        name: req.body.name,
        group: req.body.group
      
    }
    const db = await mDB.getDB().db().collection('food').insertOne(newFood)
    if (db.acknowledged){
        res.status(204).send('Creation was done')
    }else{
        res.status(500).json(db.error) || "Error occured while trying to create this vehicle.  Operation canceled"
    }
}

const updateFood = async (req,res) => {
     /*
    #swagger.responses[204] = {description: "Update was successful"}
    */
    const id = new mongoDbObjectId(req.params.id)
    
    const foodInfo = {
        name: req.body.name,
        group: req.body.group
    }

    const db = await mDB.getDB().db().collection('food').replaceOne({_id: id}, foodInfo)
    if (db.modifiedCount > 0){
        res.status(204).send('update was done')
    }else{
        res.status(500).json(db.error || "Error during 'food update' operation.  Update canceled.")
    }
}

const deleteFood = async (req, res) =>{
     /*
    #swagger.responses[204] = {description: "Deletion was successful"}
    */
    const id = new mongoDbObjectId(req.params.id)


    const db = await mDB.getDB().db().collection('food').deleteOne({_id: id})
    if (db.deletedCount > 0){
        res.status(204).send('deletion was done')
    }else{
        // const look = await mDB.getDB().db().collection('food').findOne({_id: id})
        // console.log("here is look" ,look)
        res.status(500).json(db.error || "Error occured during deletion.  Operation canceled")
    }
}

module.exports = {getAllFood, getFood, updateFood, deleteFood, createFood}