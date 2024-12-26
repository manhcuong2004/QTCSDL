const express = require('express')
const router = express.Router()
const controller = require('../../controllers/admin/manage-bills')

router.get('/', controller.manageBill)
router.post('/', controller.create);

router.post('/add-detail/', controller.addDetail);


router.put('/edit/:id', controller.edit);

router.delete('/delete/:id', controller.delete);
module.exports = router;
module.exports = router;