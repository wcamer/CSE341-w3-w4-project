const router = require('express').Router()
// const { check } = require('express-validator')
const carController = require('../controllers/carCon')
const val = require('../util/carValidation')
const {checkObj} = require('./auth')

router.get("/"  ,carController.getAllCars)
router.get("/:id", val.getCarRules(), val.getCarCheck, carController.getCar)
// router.get("/:id",  carController.getCar)

router.post("/", checkObj.authCheck, val.createCarRules(), val.createCarCheck, carController.createCar)
router.put("/:id", checkObj.authCheck, val.updateCarRules(), val.updateCarCheck,  carController.updateCar)
router.delete("/:id",checkObj.authCheck, val.deleteCarRules(), val.deleteCarCheck, carController.deleteCar)

module.exports = router