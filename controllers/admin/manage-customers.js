const { connect, sql } = require('../../config/database')
const dayjs = require("dayjs");
const FindCusHelper = require("../../public/js/findHelper");

module.exports.managecustomer = async (req, res) => {
    try {
        let pool = await connect;

        const objectSearch = FindCusHelper(req.query);

        let query = `select * from khachthue where deleted = 0`;
        if (objectSearch.regex) {
            query += ` and tenkh LIKE '%${objectSearch.keyword}%'`;
        }
        let result = await pool.request().query(query);

        const customers = result.recordset


        const formattedCustomers = customers.map(contract => ({
            ...contract,
            ngaysinh: dayjs(contract.ngaysinh).format("YYYY/MM/DD"),
        }));
        res.render('admin/pages/manage-customers/index.pug', {
            pageTitle: "Quản lí khách thuê",
            customers: formattedCustomers
        })
    } catch (err) {
        console.log("Error:", err);
        res.status(500).send("Lỗi hệ thống");
    }
}

module.exports.create = async (req, res) => {
    try {
        const pool = await connect;
        await pool.request()
            .input('cccd', sql.Char(12), req.body.cccd)
            .input('tenkh', sql.NVarChar(50), req.body.tenkh)
            .input('sdtkhach', sql.Char(10), req.body.sdtkhach)
            .input('tendnkh', sql.VarChar(16), req.body.tendnkh)
            .input('mkkh', sql.VarChar(16), req.body.mkkh)
            .input('gioitinh', sql.VarChar(5), req.body.gioitinh)
            .input('ngaysinh', sql.Date, req.body.ngaysinh)
            .input('quequan', sql.NVarChar(50), req.body.quequan)
            .input('maphong', sql.Char(10), req.body.maphong)
            .execute('spCreateCus')
        console.log(req.body)
        req.flash('success', 'New information customer added successfully!');
        res.redirect(req.headers.referer);

    } catch (err) {
        console.log(req.body)
        console.error("Error create information customer:", err.message || err);
        req.flash('error', err.message);
        return res.redirect(req.headers.referer || '/');
    }
};


module.exports.edit = async (req, res) => {
    try {
        const pool = await connect;
        await pool.request()
            .input('cccd', sql.Char(12), req.body.cccd)
            .input('tenkh', sql.NVarChar(50), req.body.tenkh)
            .input('sdtkhach', sql.Char(10), req.body.sdtkhach)
            .input('gioitinh', sql.VarChar(5), req.body.gioitinh)
            .input('ngaysinh', sql.Date, req.body.ngaysinh)
            .input('quequan', sql.NVarChar(50), req.body.quequan)
            .input('maphong', sql.Char(10), req.body.maphong)
            .execute('spEditCus')
        // .query(sqlString);
        req.flash('success', 'Edit information customer successfully !!');
        res.redirect(req.headers.referer);
    } catch (err) {
        console.error("Error edit customer:", err.message || err);
        req.flash('error', err.message);
        return res.redirect(req.headers.referer || '/');
    }
};

module.exports.delete = async (req, res) => {
    try {
        const pool = await connect;
        let id = req.params.id
        await pool.request()
            .input('cccd', sql.Char(12), id)
            .execute('spDelCus')
        req.flash('success', 'Delete customer success!');
        res.redirect(req.headers.referer);
    } catch (err) {
        console.error("Error delete room:", err.message || err);
        req.flash('error', err.message);
        return res.redirect(req.headers.referer || '/');
    }
};