const mysql = require('promise-mysql');

let pool;

const init = async () => {
    pool = await mysql.createPool({
        host: 'localhost',
        port: '3306',
        user: 'tiger',
        password: 'genesis30ftw',
        database: 'mapleroyals_analytics'
    });
};

init();

module.exports = {
    query: (...args) => pool.query(...args)
};
