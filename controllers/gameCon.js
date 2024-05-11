const mDB = require('../database/db')
const mongoDbObjectId = require('mongodb').ObjectId

const getAllGames = async (req,res) => {
    const collection = await mDB.getDB().db().collection('games').find().toArray()
    // console.log(collection)
    res.setHeader("Content-Type", "application/json")
    // res.send(collection)
    res.json(collection)
}

const getGame = async (req,res) => {
    const id = new mongoDbObjectId(req.params.id)
    const game = await mDB.getDB().db().collection('games').find({_id: id}).toArray()
    
    res.setHeader("Content-Type", "application/json")
    res.json(game)
}

const createGame = async (req,res) => {
     /*
    #swagger.responses[204] = {description: "Creation was successful"}
    */
    const newgame = {
        name: req.body.name,
        rating: req.body.rating
      
    }
    const db = await mDB.getDB().db().collection('games').insertOne(newgame)
    if (db.acknowledged){
        res.status(204).send('Creation was done')
    }else{
        res.status(500).json(db.error) || "Error occured while trying to create this vehicle.  Operation canceled"
    }
}

const updateGame = async (req,res) => {
     /*
    #swagger.responses[204] = {description: "Update was successful"}
    */
    const id = new mongoDbObjectId(req.params.id)
    
    const gameInfo = {
        name: req.body.name,
        rating: req.body.rating
    }

    const db = await mDB.getDB().db().collection('games').replaceOne({_id: id}, gameInfo)
    if (db.modifiedCount > 0){
        res.status(204).send('update was done')
    }else{
        res.status(500).json(db.error || "Error during 'game update' operation.  Update canceled.")
    }
}

const deleteGame = async (req, res) =>{
     /*
    #swagger.responses[204] = {description: "Deletion was successful"}
    */
    const id = new mongoDbObjectId(req.params.id)


    const db = await mDB.getDB().db().collection('games').deleteOne({_id: id})
    if (db.deletedCount > 0){
        res.status(204).send('deletion was done')
    }else{
        // const look = await mDB.getDB().db().collection('games').findOne({_id: id})
        // console.log("here is look" ,look)
        res.status(500).json(db.error || "Error occured during deletion.  Operation canceled")
    }
}

module.exports = {getAllGames, getGame, updateGame, deleteGame, createGame}