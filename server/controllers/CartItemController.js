const asyncHandler = require("express-async-handler");
const CartItemModel = require('../model/CartItems');

const CreateCartItem = asyncHandler(async (req, res) => {
    const { Quantity, UserId, itemId } = req.body;
    console.log(req.body);
    console.log(Quantity, UserId, itemId);
    if (!Quantity || !UserId || !itemId) {
        res.status(400).json({ error: "Please Enter All the Fields" });
        return;
    }

    try {
        const InsertItemQuery = "INSERT INTO CartItems (Quantity, userId, ItemId) VALUES (?, ?, ?)";
        const InsertItemValues = [Quantity, UserId, itemId];

        const userResults = await CartItemModel.query(InsertItemQuery, InsertItemValues);
        const InsertedItemId = userResults[0].insertId;
        console.log(userResults[0]);

        console.log(`Item with ID ${InsertedItemId} inserted successfully`);
        res.status(201).json(`Item with ID ${InsertedItemId} inserted successfully`);

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message || "Internal Server Error");
    }
});

const GetCartItems = asyncHandler(async (req, res) => {
    try {
        const getCartItemQuery = `
    SELECT CartItems.id AS CartItemId, CartItems.Quantity, CartItems.userId, CartItems.ItemId,
         
           Product.* 
    FROM CartItems
    JOIN Product ON CartItems.ItemId = Product.id
`;


        const CartItems = await CartItemModel.query(getCartItemQuery);
            console.log(CartItems)
        // Send all retrieved cart items with product details as a response
        res.json({ CartItems});
    } catch (error) {
        console.error(error);

        // Handle the error and send an appropriate response
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

  



const RemoveCartItems = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { id } = req.body;
console.log(id)
    try {
        // Construct the DELETE query to remove the item from the CartItems table
        const removeCartItemQuery = `
            DELETE FROM CartItems
            WHERE id = ?;
        `;

        // Execute the DELETE query
        await CartItemModel.query(removeCartItemQuery, [id]);

        // Send a success response
        res.json({ message: 'Cart item removed successfully' });
    } catch (error) {
        console.error(error);

        // Handle the error and send an appropriate response
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


const UpdateCartItemQuantity = asyncHandler(async (req, res) => {
    const { id, Quantity } = req.body;

    try {
   
        const updateCartItemQuery = `
            UPDATE CartItems
            SET Quantity = ?
            WHERE id = ?;
        `; 
        const result = await  CartItemModel.query(updateCartItemQuery, [Quantity, id]); 
        console.log(result[0].affectedRows)     
        if (result[0].affectedRows > 0) {    
            res.json({ message: 'Cart item quantity updated successfully' });
        } else {       
            res.status(404).json({ message: 'Cart item not found' });
        }
    } catch (error) {
        console.error(error);

        // Handle the error and send an appropriate response
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

const RemoveAllCartItemsByUserId=asyncHandler(async(req,res)=>{
    console.log(req.body)
    const { userId } = req.body;
console.log(userId)
    try {
        // Construct the DELETE query to remove the item from the CartItems table
        const removeCartItemQuery = `
            DELETE FROM CartItems
            WHERE userId = ?;
        `;

        // Execute the DELETE query
        await CartItemModel.query(removeCartItemQuery, [userId]);

        // Send a success response
        res.json({ message: 'Cart item removed successfully' });
    } catch (error) {
        console.error(error);

        // Handle the error and send an appropriate response
        res.status(500).json({ message: 'Internal Server Error' });
    }
})


module.exports = { CreateCartItem, GetCartItems,RemoveCartItems,UpdateCartItemQuantity,RemoveAllCartItemsByUserId};
