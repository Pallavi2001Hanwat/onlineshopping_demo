const pool = require('../database/conn');
pool.query('USE OnlineShopping');

const createCartItemTable = async () => {
    const createCartItemTableQuery = `
    CREATE TABLE IF NOT EXISTS CartItems (
        id int(11) NOT NULL AUTO_INCREMENT,
        Quantity int,
        userId int,
        ItemId int,
        PRIMARY KEY (id),
        FOREIGN KEY (userId) REFERENCES User(id),
        FOREIGN KEY (ItemId) REFERENCES Product(id)
    )
    `;

    try {
        const [result] = await pool.query(createCartItemTableQuery);
        // console.log(result)
        console.log("CartItem table created");
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
    createCartItemTable,
    query
};
