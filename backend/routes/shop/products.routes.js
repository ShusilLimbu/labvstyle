const express = require('express')

const {getFilteredProducts, getProductDetails} = require('../../controllers/shop/productControler.js');

const router = express.Router();

router.get('/getProducts', getFilteredProducts);
router.get('/getProducts/:id', getProductDetails)



module.exports = router;