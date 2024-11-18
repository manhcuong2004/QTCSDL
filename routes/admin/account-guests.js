const express = require('express')
const router = express.Router()
const controller = require('../../controllers/admin/account-guests')

router.get('/', controller.accountGuest)

module.exports = router;