const mDB = require('../database/db')
const mongoDbObjectId = require('mongodb').ObjectId

const getAllMusic = async (req,res) => {
    const collection = await mDB.getDB().db().collection('music').find().toArray()
    // console.log(collection)
    res.setHeader("Content-Type", "application/json")
    // res.send(collection)
    res.json(collection)
}

const getOneMusic = async (req,res) => {
    const id = new mongoDbObjectId(req.params.id)
    const music = await mDB.getDB().db().collection('music').find({_id: id}).toArray()
    
    res.setHeader("Content-Type", "application/json")
    res.json(music)
}

const createMusic = async (req,res) => {
     /*
    #swagger.responses[204] = {description: "Creation was successful"}
    */
    const newMusic = {
        name: req.body.name,
        genre: req.body.genre
      
    }
    const db = await mDB.getDB().db().collection('music').insertOne(newMusic)
    if (db.acknowledged){
        res.status(204).send('Creation was done')
    }else{
        res.status(500).json(db.error) || "Error occured while trying to create this vehicle.  Operation canceled"
    }
}

const updateOneMusic = async (req,res) => {
     /*
    #swagger.responses[204] = {description: "Update was successful"}
    */
    const id = new mongoDbObjectId(req.params.id)
    
    const musicInfo = {
        name: req.body.name,
        genre: req.body.genre
    }

    const db = await mDB.getDB().db().collection('music').replaceOne({_id: id}, musicInfo)
    if (db.modifiedCount > 0){
        res.status(204).send('update was done')
    }else{
        res.status(500).json(db.error || "Error during 'music update' operation.  Update canceled.")
    }
}

const deleteOneMusic = async (req, res) =>{
     /*
    #swagger.responses[204] = {description: "Deletion was successful"}
    */
    const id = new mongoDbObjectId(req.params.id)


    const db = await mDB.getDB().db().collection('music').deleteOne({_id: id})
    if (db.deletedCount > 0){
        res.status(204).send('deletion was done')
    }else{
        // const look = await mDB.getDB().db().collection('music').findOne({_id: id})
        // console.log("here is look" ,look)
        res.status(500).json(db.error || "Error occured during deletion.  Operation canceled")
    }
}

module.exports = {getAllMusic, getOneMusic, updateOneMusic, deleteOneMusic, createMusic}