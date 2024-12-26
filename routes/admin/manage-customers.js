const express = require('express')
const router = express.Router()
const controller = require('../../controllers/admin/manage-customers')

router.get('/', controller.managecustomer)
router.post('/', controller.create);

router.put('/', controller.edit);

router.delete('/delete/:id', controller.delete);
module.exports = router;


