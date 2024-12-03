const sql = require('mssql/msnodesqlv8');

const config = {
    server: "localhost",
    user: "hmcuong",
    password: "280404",
    database: "qlpt",
    driver: "msnodesqlv8",
    options: {
        encrypt: false, // Sử dụng nếu cần mã hóa
        enableArithAbort: true,
        charset: 'utf8' // Cấu hình charset
    }

};

const connect = new sql.ConnectionPool(config).connect().then(pool => {
    return pool;
});
module.exports = {
    connect: connect,  // Đổi tên biến cho dễ nhận biết
    sql: sql
}

// const config = {
//     server: "34.57.228.212",
//     user: "sqlserver",
//     password: "quanlyphongtro1234",
//     database: "qlpt",
//     driver: "msnodesqlv8",
//     options: {
//         encrypt: false, // Sử dụng nếu cần mã hóa
//         enableArithAbort: true,
//         charset: 'utf8' // Cấu hình charset
//     }

// };