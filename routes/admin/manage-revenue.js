const express = require('express')
const router = express.Router()
const controller = require('../../controllers/admin/manage-revenue')

router.get('/', controller.manageRevenue)

module.exports = router;