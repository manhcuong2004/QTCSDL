const { connect, sql } = require('../../config/database')


module.exports.manageRevenue = async (req, res) => {
    try {
        let pool = await connect;
        let result = await pool.request().query("select * from hoadon where deleted = 0");
        const totalQuery = await pool.request()
            .query("SELECT SUM(tongtien) AS total FROM hoadon WHERE MONTH(ngaytao) = 11 AND YEAR(ngaytao) = 2024");

        const revenues = result.recordset;
        const total = totalQuery.recordset[0]?.total || 0;

        res.render('admin/pages/manage-revenue/index.pug', {
            pageTitle: "Quản lí doanh thu",
            revenues: revenues,
            total: total
        })
    } catch (err) {
        console.log("Error:", err);
        res.status(500).send("Lỗi hệ thống");
    }
}