const { connect, sql } = require('../../config/database')

module.exports.manageGuest = async (req, res) => {
    try {
        let pool = await connect;
        let result = await pool.request().query("select * from khachthue where deleted = 0");
        const guests = result.recordset
        res.render('admin/pages/manage-guests/index.pug', {
            pageTitle: "Quản lí khách thuê",
            guests: guests
        })
    } catch (err) {
        console.log("Error:", err);
        res.status(500).send("Lỗi hệ thống");
    }
}