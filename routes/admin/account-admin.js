const express = require('express')
const router = express.Router()
const controller = require('../../controllers/admin/account-admin')

router.get('/', controller.accountAdmin)

module.exports = router;