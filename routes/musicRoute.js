const router = require('express').Router()
// const { check } = require('express-validator')
const musicController = require('../controllers/musicCon')
const val = require('../util/musicValidation')
const {checkObj} = require('./auth')

router.get("/"  ,musicController.getAllMusic)
router.get("/:id", val.getMusicRules(), val.getMusicCheck, musicController.getOneMusic)
// router.get("/:id",  musicController.getmusic)

router.post("/", checkObj.authCheck, val.createMusicRules(), val.createMusicCheck, musicController.createMusic)
router.put("/:id", checkObj.authCheck, val.updateMusicRules(), val.updateMusicCheck,  musicController.updateOneMusic)
router.delete("/:id",checkObj.authCheck, val.deleteMusicRules(), val.deleteMusicCheck, musicController.deleteOneMusic)

module.exports = router