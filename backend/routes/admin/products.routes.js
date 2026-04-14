const express = require('express')

const {handleImageUpload, addProduct, fetchAllProducts, editProduct, deleteProduct} = require('../../controllers/admin/productsController.js');

const {upload} = require('../../helpers/cloudinary.js');

const router = express.Router();

router.post('/uploadImage', upload.single('myfile'), handleImageUpload);
router.post('/addProduct', addProduct);
router.put('/editProduct/:id', editProduct);
router.get('/getProducts', fetchAllProducts);
router.delete('/deleteProduct/:id', deleteProduct)


module.exports = router;