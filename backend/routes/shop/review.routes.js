const express = require('express');

const{addProductReview, getProductReview} = require('../../controllers/shop/productReviewControler')
const {authMiddleware} =require("../../controllers/auth/auth.controler")

const router = express.Router();

router.post('/add',authMiddleware ,addProductReview)
router.get('/:productId', getProductReview)

module.exports = router;
