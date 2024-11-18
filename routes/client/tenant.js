const express = require('express')
const router = express.Router()
const controller = require('../../controllers/client/tenant-controller')


router.get('/', controller.tenant)


module.exports = router;