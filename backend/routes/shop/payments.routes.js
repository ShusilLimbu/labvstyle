const express = require('express')
const router = express.Router();
const {createOrder, capturePayment, getAllOrdersByUser, getOrdersDetail} = require('../../controllers/shop/payment.controler')

router.post('/create', createOrder);
router.post('/capture', capturePayment);
router.get('/list/:userId', getAllOrdersByUser);
router.get('/details/:id', getOrdersDetail);

module.exports = router;