const { connect, sql } = require('../../config/database')


module.exports.manageBill = async (req, res) => {
    try {
        let pool = await connect;
        let result = await pool.request().query("select * from hoadon where deleted = 0");
        const bills = result.recordset
        res.render('admin/pages/manage-bills/index.pug', {
            pageTitle: "Quản lí hóa đơn",
            bills: bills
        })
    } catch (err) {
        console.log("Error:", err);
        res.status(500).send("Lỗi hệ thống");
    }
}