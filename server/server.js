const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const UserRoutes = require('./Routes/UserRoutes');
const pool = require('./database/conn');  // Import the connection pool
const userModel = require('./model/UserModel');
const ProductModel=require('./model/ProductModel');
const CartItemTable=require("./model/CartItems")
const Invoice=require("./model/Invoice")

const conn=require('./database/conn')

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5050;

app.use(express.json());
app.use(cors());



const initializeConnection = async () => {
    try {
        await conn.createDatabase();  // Use the exported function
        await pool.query('USE OnlineShopping');  // Switch to the created database
        await userModel.createUserTable();
        await ProductModel.createProductTable();
        await CartItemTable.createCartItemTable();
        await Invoice.createInvoiceTable();
        await pool; // Wait for the connection pool to be established
        console.log('Database connection pool initialized');
    } catch (err) {
        console.error('Error initializing database connection pool:', err);
        process.exit(1); // Exit the application if there's an error
    }
};




// Initialize the connection pool before starting the server
initializeConnection().then(() => {
    app.get('/', (req, res) => {
        res.send('API Is Running');
    });

    app.use('/api/user', UserRoutes);

    app.listen(PORT, () => {
        console.log('Running on PORT', PORT);
    });
});
