const pool = require('../database/conn');
pool.query('USE OnlineShopping');

const createInvoiceTable = async () => {
    const createInvoiceTableQuery = `
    CREATE TABLE IF NOT EXISTS Invoices (
        id int(11) NOT NULL AUTO_INCREMENT,     
        userId int,
        TotalAmount Decimal,
        InvoiceDate Date,
        PRIMARY KEY (id),
        FOREIGN KEY (userId) REFERENCES User(id)
    )
    `;

    try {
        const [result] = await pool.query(createInvoiceTableQuery);
        console.log("Invoice table created");
    } catch (err) {
        console.error(err);
    }
};

const query = async (sql, values = null) => {
    try {
        if (pool && !pool._closed) {
            console.log(sql, values);
            const result = values ? await pool.query(sql, values) : await pool.query(sql);
            console.log(result)
            return result;
        } else {
            console.error('Database connection is not established.');
            return null;
        }
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = {
    createInvoiceTable,
    query
};
