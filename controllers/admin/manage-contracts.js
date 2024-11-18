const { connect, sql } = require('../../config/database')

module.exports.manageContract = async (req, res) => {
    try {
        let pool = await connect;
        let result = await pool.request().query("select * from hopdong");
        const contracts = result.recordset
        res.render('admin/pages/manage-contracts/index.pug', {
            pageTitle: "Quản lí hợp đồng",
            contracts: contracts
        })
    } catch (err) {
        console.log("Error:", err);
        res.status(500).send("Lỗi hệ thống");
    }
}