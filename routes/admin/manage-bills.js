const express = require('express')
const router = express.Router()
const controller = require('../../controllers/admin/manage-bills')

router.get('/', controller.manageBill)

module.exports = router;