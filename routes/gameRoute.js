const router = require('express').Router()
const gameController = require('../controllers/gameCon')
const val = require('../util/gameValidation')
const {checkObj} = require('./auth')

router.get("/" , gameController.getAllGames)
router.get("/:id", val.getGameRules(), val.getGameCheck, gameController.getGame)
// router.post("/",  gameController.createGame)
router.post("/", checkObj.authCheck, val.createGameRules(), val.createGameCheck, gameController.createGame)
router.put("/:id",  checkObj.authCheck, val.updateGameRules(), val.updateGameCheck, gameController.updateGame)
router.delete("/:id", checkObj.authCheck, val.deleteGameRules(), val.deleteGameCheck, gameController.deleteGame)

module.exports = router