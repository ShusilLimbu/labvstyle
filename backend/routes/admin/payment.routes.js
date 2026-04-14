const express = require('express')
const router = express.Router();
const {getAllOrdersOfAdmin, getOrdersDetailsForAdmin, updateOrderStatus} = require('../../controllers/admin/payment.controler')


router.get('/get', getAllOrdersOfAdmin);
router.get('/details/:id', getOrdersDetailsForAdmin);
router.put('/update/:id', updateOrderStatus);


module.exports = router;