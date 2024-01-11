const asyncHandler = require("express-async-handler");
const ProductModel = require('../model/ProductModel');

const getProduct = asyncHandler(async (req, res) => {
  try {
    const getProductQuery = 'SELECT * FROM Product';
    const products = await ProductModel.query(getProductQuery);
    console.log(products[0])

    // Send the retrieved products as a response
    res.json(products[0]);
  } catch (error) {
    console.error(error);

    // Handle the error and send an appropriate response
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});




const getSingleProduct = asyncHandler(async (req, res) => {
  try {
    console.log(req.params.id); 
    const productId = req.params.id; // the product ID is in the query parameters

    const getProductQuery = 'SELECT * FROM Product WHERE id = ?'; 
    const product = await ProductModel.query(getProductQuery, [productId]); 

    if (product && product.length > 0) {
      res.json({ product: product[0] }); 
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);

    // Handle the error and send an appropriate response
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});



module.exports = { getProduct,getSingleProduct};
