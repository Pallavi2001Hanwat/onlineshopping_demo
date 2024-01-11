const pool = require('../database/conn');

const createProductTable = async () => {
    const createProductTableQuery = `
        CREATE TABLE IF NOT EXISTS Product (
            id int(11) NOT NULL AUTO_INCREMENT,
            name varchar(255) NOT NULL,
            Description varchar(255) NOT NULL,
            Price decimal(10, 2) NOT NULL,
            SalePrice decimal(10, 2) DEFAULT 0,
            IsSale boolean,
            Discount decimal(10, 2),
            totalquantity int,
            imageURL varchar(255), 
      
            PRIMARY KEY (id)
        )
    `;

    try {
        const [result] = await pool.query(createProductTableQuery);
        console.log("Product table created");
    } catch (err) {
        console.error(err);
    }
};

const query = async (sql, values = null) => {
    try {

        if (pool && !pool._closed) {
            console.log(sql, values);
            const result = values ? await pool.query(sql, values) : await pool.query(sql);
          //  console.log(result);
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
    createProductTable,
    query
};
