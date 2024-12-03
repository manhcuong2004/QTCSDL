const { connect, sql } = require('../../config/database')

module.exports.accountGuest = async (req, res) => {
    try {
        let pool = await connect;
        let result = await pool.request().query("select * from khachthue");
        const accounts = result.recordset
        res.render('admin/pages/account-guests/index.pug', {
            pageTitle: "Quản lí tài khoản khách thuê",
            accounts: accounts
        })
    } catch (err) {
        console.log("Error:", err);
        res.status(500).send("Lỗi hệ thống");
    }

}