const express = require('express')
const router = express.Router()
const controller = require('../../controllers/admin/manage-guests')

router.get('/', controller.manageGuest)

module.exports = router;