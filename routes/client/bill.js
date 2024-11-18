const express = require('express')
const router = express.Router()
const controller = require('../../controllers/client/bill-controller')


router.get('/', controller.bill)


module.exports = router;