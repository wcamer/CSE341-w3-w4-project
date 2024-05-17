const router = require('express').Router()
// const { check } = require('express-validator')
const foodController = require('../controllers/foodCon')
const val = require('../util/foodValidation')
const {checkObj} = require('./auth')

router.get("/"  ,foodController.getAllFood)
router.get("/:id", val.getFoodRules(), val.getFoodCheck, foodController.getFood)
// router.get("/:id",  foodController.getfood)

router.post("/", checkObj.authCheck, val.createFoodRules(), val.createFoodCheck, foodController.createFood)
router.put("/:id", checkObj.authCheck, val.updateFoodRules(), val.updateFoodCheck,  foodController.updateFood)
router.delete("/:id",checkObj.authCheck, val.deleteFoodRules(), val.deleteFoodCheck, foodController.deleteFood)

module.exports = router