const express = require('express')
const router = express.Router()
const swaggerUi = require('swagger-ui-express')
const swaggerDoc = require('../project2-swagger-output.json')


router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDoc))



router.use('/cars', require('./carRoute'))
router.use('/games' , require('./gameRoute'))

router.get('/', (req,res) =>
    res.send("Welcome to Project 2.  Use the cars route or game route")

)


router.use('/cars', require('./carRoute'))
router.use('/games' , require('./gameRoute'))


module.exports = router