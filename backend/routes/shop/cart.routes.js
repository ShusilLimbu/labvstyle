const express = require("express");
const {addToCart, fetchCartItems, deleteCartItem, updateCartItem,} = require("../../controllers/shop/cartControler");
const router = express.Router();

router.post('/add', addToCart);
router.get('/get/:userId', fetchCartItems);
router.put('/update', updateCartItem);
router.delete('/:userId/:productId', deleteCartItem);

module.exports = router;

