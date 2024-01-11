const asyncHandler = require("express-async-handler");
const InvoiceModel = require('../model/Invoice');

const CreateInvoice = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { userId, TotalAmount, InvoiceDate} = req.body;

    if (!userId || !TotalAmount || !InvoiceDate  ) {
        res.status(400).json({ error: "Please provide valid data for creating an invoice" });
        return;
    }

    try {
        // Create the invoice
        const createInvoiceQuery = "INSERT INTO Invoices (userId, TotalAmount, InvoiceDate) VALUES (?, ?, ?)";
        const createInvoiceValues = [userId, TotalAmount, InvoiceDate];

        const invoiceResults = await InvoiceModel.query(createInvoiceQuery, createInvoiceValues);
        const insertedInvoiceId = invoiceResults[0].insertId;

        console.log(`Invoice with ID ${insertedInvoiceId} created successfully`);

      
      

        res.status(201).json({ message: `Invoice with ID ${insertedInvoiceId} created successfully` });
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message || "Internal Server Error");
    }
});

module.exports = { CreateInvoice };
