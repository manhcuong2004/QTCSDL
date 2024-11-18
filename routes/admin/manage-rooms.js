const express = require('express')
const router = express.Router()
const controller = require('../../controllers/admin/manage-rooms')

router.get('/', controller.manageRoom);

router.post('/', controller.create);

router.put('/', controller.edit);

router.delete('/delete/:id', controller.delete);
module.exports = router;