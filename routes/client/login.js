const express = require('express')
const router = express.Router()
const controller = require('../../controllers/client/user-controller')


router.get('/', controller.login)
router.post('/', controller.loginPost)


module.exports = router;