const express = require('express')

const { searchProducts } = require('../../controllers/shop/searchControler');

const router = express.Router();

router.get('/:keyword', searchProducts);



module.exports = router;