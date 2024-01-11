const pool = require('../database/conn');

const createUserTable = async () => {
    const createUserTableQuery = `
        CREATE TABLE IF NOT EXISTS User (
            id int(11) NOT NULL AUTO_INCREMENT,
            name varchar(255) NOT NULL,
            email varchar(255) NOT NULL,
            password varchar(255) NOT NULL,
            PRIMARY KEY (id),
            UNIQUE KEY email_UNIQUE (email)
        )
    `;

    try {
        const [result] = await pool.query(createUserTableQuery);
       // console.log(result)
        console.log("User table created");
    } catch (err) {
        console.error(err);
    }
};

const query = async (sql, values) => {
    try {
        const [result] = await pool.query(sql, values);
        console.log(result)
        return result;
    } catch (err) {
        console.error(err);
        throw err;
    }
};

module.exports = {
    createUserTable,
    query
};
