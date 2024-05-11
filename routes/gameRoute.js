const router = require('express').Router()
const gameController = require('../controllers/gameCon')
const val = require('../util/gameValidation')

router.get("/" , gameController.getAllGames)
router.get("/:id", val.getGameRules(), val.getGameCheck, gameController.getGame)
// router.post("/",  gameController.createGame)
router.post("/", val.createGameRules(), val.createGameCheck, gameController.createGame)
router.put("/:id", val.updateGameRules(), val.updateGameCheck, gameController.updateGame)
router.delete("/:id", val.deleteGameRules(), val.deleteGameCheck, gameController.deleteGame)

module.exports = router