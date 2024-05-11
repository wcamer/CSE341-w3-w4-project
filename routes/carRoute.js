const router = require('express').Router()
const carController = require('../controllers/carCon')
const val = require('../util/carValidation')

router.get("/" , carController.getAllCars)
router.get("/:id", val.getCarRules(), val.getCarCheck, carController.getCar)
// router.get("/:id",  carController.getCar)

router.post("/", val.createCarRules(), val.createCarCheck, carController.createCar)
router.put("/:id", val.updateCarRules(), val.updateCarCheck,  carController.updateCar)
router.delete("/:id", val.deleteCarRules(), val.deleteCarCheck, carController.deleteCar)

module.exports = router