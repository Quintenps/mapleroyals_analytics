const mysql = require('promise-mysql');

let pool;

const init = async () => {
    pool = await mysql.createPool({
        host: process.env.MYSQL_HOST   || 'localhost',
        port: process.env.MYSQL_PORT   || '3306',
        user: process.env.MYSQL_USER   || 'tiger',
        password: process.env.MYSQL_PASSWORD || 'genesis30ftw',
        database: process.env.MYSQL_DATABASE || 'mapleroyals_analytics'
    });
};

init();

module.exports = {
    query: (...args) => pool.query(...args)
};
