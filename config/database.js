const sql = require('mssql/msnodesqlv8');

const config = {
    server: "localhost",
    user: "hmcuong",
    password: "280404",
    database: "qlpt",
    driver: "msnodesqlv8"
};

const connect = new sql.ConnectionPool(config).connect().then(pool => {
    return pool;
});
module.exports = {
    connect: connect,  // Đổi tên biến cho dễ nhận biết
    sql: sql
}
