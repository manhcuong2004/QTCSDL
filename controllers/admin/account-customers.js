const { connect, sql } = require('../../config/database')
const FindRoomHelper = require("../../public/js/findHelper")

module.exports.accountcustomer = async (req, res) => {
    try {
        let pool = await connect;
        const objectSearch = FindRoomHelper(req.query);
        let query = "select * from khachthue where deleted = 0";
        if (objectSearch.regex) {
            query += ` and tendnkh LIKE '%${objectSearch.keyword}%'`;
        }

        let result = await pool.request().query(query);

        const accounts = result.recordset
        res.render('admin/pages/account-customers/index.pug', {
            pageTitle: "Quản lí tài khoản khách thuê",
            accounts: accounts
        })
    } catch (err) {
        console.log("Error:", err);
        res.status(500).send("Lỗi hệ thống");
    }

}