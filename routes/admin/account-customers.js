const express = require('express')
const router = express.Router()
const controller = require('../../controllers/admin/account-customers')

router.get('/', controller.accountcustomer)

module.exports = router;