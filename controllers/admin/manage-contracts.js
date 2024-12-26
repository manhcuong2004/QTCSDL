const { connect, sql } = require('../../config/database')
const dayjs = require("dayjs");
const FindContractHelper = require("../../public/js/findHelper");

module.exports.manageContract = async (req, res) => {
    try {
        let pool = await connect;
        const objectSearch = FindContractHelper(req.query);
        let query = `SELECT * FROM hopdong WHERE deleted = 0`;

        if (objectSearch.regex) {
            query += ` and maphong LIKE '%${objectSearch.keyword}%'`;
        }

        let result = await pool.request().query(query);
        const contracts = result.recordset;

        const formattedContracts = contracts.map(contract => ({
            ...contract,
            ngaytao: dayjs(contract.ngaytao).format("YYYY/MM/DD"),
            ngayhethan: dayjs(contract.ngayhethan).format("YYYY/MM/DD"),
        }));
        res.render('admin/pages/manage-contracts/index.pug', {
            pageTitle: "Quản lí hợp đồng",
            contracts: formattedContracts
        });
    } catch (err) {
        console.log("Error:", err);
        res.status(500).send("Lỗi hệ thống");
    }
};

module.exports.create = async (req, res) => {
    try {
        const pool = await connect;
        await pool.request()
            .input('ngayhethan', sql.Date, req.body.ngayhethan)
            .input('sotien_coc', sql.Money, req.body.sotien_coc)
            .input('cccd', sql.Char(12), req.body.cccd)
            .input('maphong', sql.Char(10), req.body.maphong)
            .execute('spCreateHopdong')
        console.log(req.body)
        req.flash('success', 'New contract added successfully!');
        res.redirect(req.headers.referer);
    } catch (err) {
        console.error("Error create contract:", err.message || err);
        req.flash('error', err.message);
        return res.redirect(req.headers.referer || '/');
    }
};


module.exports.edit = async (req, res) => {
    try {
        const pool = await connect;
        await pool.request()
            .input('mahopdong', sql.Char(10), req.body.mahopdong)
            .input('ngayhethan', sql.Date, req.body.ngayhethan)
            .input('sotien_coc', sql.Int, req.body.sotien_coc)
            .input('cccd', sql.Char(12), req.body.cccd)
            .input('maphong', sql.Money, req.body.maphong)
            .execute('spEditHopdong')
        // .query(sqlString);
        req.flash('success', 'Edit contract success!');
        console.log(req.body)
        res.redirect(req.headers.referer);
    } catch (err) {
        console.error("Error edit contract:", err.message || err);
        req.flash('error', err.message);
        return res.redirect(req.headers.referer || '/');
    }
};

module.exports.delete = async (req, res) => {

    try {
        const pool = await connect;
        let id = req.params.id
        await pool.request()
            .input('mahopdong', sql.Char(10), id)
            .execute('spDelHopdong')
        req.flash('success', 'Delete room success!');
        res.redirect(req.headers.referer);
    } catch (err) {
        console.error("Error delete room:", err.message || err);
        req.flash('error', err.message);
        return res.redirect(req.headers.referer || '/');
    }
};