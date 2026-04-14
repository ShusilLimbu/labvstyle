// const Product = require('../../models/product.model');



// const searchProducts = async(req,res) =>{
//     try {
//         const {keyword} = req.params;
//         console.log(keyword,'search for Products')
//         if(!keyword || typeof keyword !== 'string'){
//             return res.status(400).json({
//                 success:false,
//                 message:'You must enter a product. Characters only.'
//             })
//         }

//         const regEx = new RegExp(keyword, 'i');

//         const createSearchQuery = {
//             $or : [
//                 {title: regEx},
//                 {description: regEx},
//                 {category: regEx},
//                 {brand: regEx},
//             ]
//         }

//         const searchResults = await Product.find(createSearchQuery);

//         res.status(200).json({
//             success: true,
//             data: searchResults,
//         })

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Product not found.'
//         })
//     }
// }

// module.exports = {searchProducts}

const Product = require('../../models/product.model');

const searchProducts = async (req, res) => {
    try {
        const { keyword } = req.params;
        console.log(keyword, 'search for Products');

        if (!keyword || typeof keyword !== 'string') {
            return res.status(400).json({
                success: false,
                message: 'You must enter a product. Characters only.'
            });
        }

        // Convert keyword to lowercase for case-insensitive search
        const lowerKeyword = keyword.toLowerCase();

        // 1️⃣ Fetch all products from database
        const allProducts = await Product.find();

        // 2️⃣ Linear search: manually check each product
        const searchResults = [];
        for (let i = 0; i < allProducts.length; i++) {
            const product = allProducts[i];

            // Check if keyword is in title, description, category, or brand
            if (
                (product.title && product.title.toLowerCase().includes(lowerKeyword)) ||
                (product.description && product.description.toLowerCase().includes(lowerKeyword)) ||
                (product.category && product.category.toLowerCase().includes(lowerKeyword)) ||
                (product.brand && product.brand.toLowerCase().includes(lowerKeyword))
            ) {
                searchResults.push(product);
            }
        }

        // 3️⃣ Return results
        res.status(200).json({
            success: true,
            data: searchResults
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Product not found.'
        });
    }
};

module.exports = { searchProducts };