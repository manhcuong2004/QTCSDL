const express = require('express')
const router = express.Router()
const controller = require('../../controllers/admin/manage-contracts')

router.get('/', controller.manageContract)

module.exports = router;