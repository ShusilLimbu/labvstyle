const { imageUploadUtil } = require('../../helpers/cloudinary');
const Product = require('../../models/product.model');



const handleImageUpload = async(req,res)=>{
    try {
        const b64 = Buffer.from(req.file.buffer).toString('base64');
        const url = 'data:' + req.file.mimetype + ';base64,' + b64;
        const result = await imageUploadUtil(url);

        res.json({
            success: true,
            result,
        })
    } catch (error) {
        res.json({
            success: false,
            message: 'An error occurred'
        });
        
    }
};


//add a new product

const addProduct = async(req,res)=>{
    try {
     const { image, title, description, category, brand, price, salePrice, totalStock} = req.body;

     const createProduct = new Product({
        image,
        title, 
        description, 
        category, 
        price, 
        salePrice, 
        totalStock,
     })

     await createProduct.save();
     res.status(201).json({
        success: true,
        data: createProduct,
        message: 'Producto Agregado Correctamente'
     });
        

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ocurrio un error al agregar el producto'
        })
    }

}


//fetch all products

const fetchAllProducts = async(req,res)=>{
    try {
        const listOfProducts = await Product.find({});
        res.status(200).json({
            success: true,
            data: listOfProducts,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ocurrio un error al mostrar los productos'
        })
    }

}


// edit a product

const editProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const {
            image,
            title, 
            description, 
            category, 
            brand, 
            price, 
            salePrice, 
            totalStock,
         } = req.body;

        let findProductById = await Product.findById(id);
        if(!findProductById) return res.status(404).json({
            success:false,
            message: 'Producto no encontrado',
        });
        findProductById.title = title || findProductById.title;
        findProductById.description = description || findProductById.description;
        findProductById.categoty = category || findProductById.categoty;
        findProductById.brand = brand || findProductById.brand;
        findProductById.price = price === '' ? 0 : price || findProductById.price;
        findProductById.salePrice = salePrice === '' ? 0 : salePrice || findProductById.salePrice;
        findProductById.totalStock = totalStock || findProductById.totalStock;
        findProductById.image = image || findProductById.image;

        await findProductById.save();
        res.status(200).json({
            success: true,
            data: findProductById,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Ocurrio un error al agregar el producto'
        })
    }

}



// delete a product

const deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params;
        const deleteProductById = await Product.findByIdAndDelete(id);
        if(!deleteProductById) return res.status(404).json({
            success: false,
            message: 'Product not found'
        });
        return res.status(200).json({
            success: true,
            message: 'Product deleted successfully.',
        })

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'An error occurred while adding the product.”',
        })
    }

}



module.exports = { handleImageUpload, addProduct, fetchAllProducts, editProduct, deleteProduct };