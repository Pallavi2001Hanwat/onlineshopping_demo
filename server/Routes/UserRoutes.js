const express = require('express');
const { registerUser, loginUser } = require('../controllers/usercontroller');
const { getProduct, getSingleProduct } = require('../controllers/ProductController');
const { CreateCartItem, GetCartItems, RemoveCartItems, UpdateCartItemQuantity, RemoveAllCartItemsByUserId } = require('../controllers/CartItemController');
const { CreateInvoice } = require('../controllers/InvoiceController');

const router = express.Router();

router.route('/').post(registerUser);
router.post('/login', loginUser);
router.get('/products', getProduct);
router.route('/SingleProduct/:id')
  .get(getSingleProduct);
router.post('/createCartItems', CreateCartItem);
router.get('/getCartItems', GetCartItems);
router.delete('/RemoveCartItems', RemoveCartItems);
router.put('/updateCartItemQuantity', UpdateCartItemQuantity);
router.post('/invoice', CreateInvoice);
router.delete('/RemoveAllCartItems', RemoveAllCartItemsByUserId);

module.exports = router;
