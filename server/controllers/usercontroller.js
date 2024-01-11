const asyncHandler = require("express-async-handler");
const UserModel = require('../model/UserModel'); // Fix the import
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')



const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
      console.log(req.body);
    if (!name || !email || !password) {
        res.status(400).json({ error: "Please Enter All the Fields" });
        return;
    }

    try {
        // Check if the user with the given email already exists
        const userExistsQuery = "SELECT * FROM User WHERE email = ?";
        const userExistsValues = [email];

        const results = await UserModel.query(userExistsQuery, userExistsValues);

        if (results.length > 0) {
            console.log(results);
            throw new Error("User Already Exists");
        } else {
            // Hash the password before storing it
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            // Create a new user with the hashed password
            const createUserQuery = "INSERT INTO User (name, email, password) VALUES (?, ?, ?)";
            const createUserValues = [name, email, hashedPassword];

            const result = await UserModel.query(createUserQuery, createUserValues);
            const userId = result.insertId;

            console.log(`User with ID ${userId} created successfully`);
            res.status(201).json(`User with ID ${userId} created successfully`);
        }
    } catch (error) {
        console.error(error);
        res.status(500).send(error.message || "Internal Server Error");
    }
};


const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
     // console.log(email,password)
    if (!email || !password) {
        res.status(400).json({ error: "Please Enter All the Fields" });
        return;
    }

    try {
        const userExistsQuery = "SELECT * FROM User WHERE email = ?";
        const userExistsValues = [email];

        const userResults = await UserModel.query(userExistsQuery, userExistsValues);
        console.log(userResults)
        console.log(Object.keys(userResults).length );
        if (Object.keys(userResults).length > 0) 
            {
            // const hashedPassword = userResults[0].password;

            // Compare the provided password with the hashed password
            const passwordMatch = await bcrypt.compare(password, userResults[0].password);

            if (passwordMatch) {
                res.json({
                    UserId:userResults[0].id,
                    token: generateToken(userResults[0].id),
                });
            } else {
                res.status(401);
                throw new Error("Invalid Email or Password");
            }
        } else {
            res.status(401);
            throw new Error("User not found");
        }
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message || "Internal Server Error");
    }
});




const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    })
};
module.exports = { registerUser, loginUser };
