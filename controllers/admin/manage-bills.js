const { connect, sql } = require('../../config/database')
const dayjs = require("dayjs");
const FindBillHelper = require("../../public/js/findHelper");


module.exports.manageBill = async (req, res) => {
    try {

        let pool = await connect;
        const objectSearch = FindBillHelper(req.query);
        let tieudung = await pool.request().query("select * from tieudung");

        let query = "select * from hoadon where deleted = 0";
        // Lấy thông tin tìm kiếm từ query

        if (objectSearch.regex) {
            query += ` and maphong LIKE '%${objectSearch.keyword}%'`;
        }

        let result = await pool.request().query(query);
        const bills = result.recordset
        const tieudungs = tieudung.recordset

        const formattedBills = bills.map(bill => ({
            ...bill,
            ngaytao: dayjs(bill.ngaytao).format("YYYY/MM/DD"),
        }));

        res.render('admin/pages/manage-bills/index.pug', {
            pageTitle: "Quản lí hóa đơn",
            bills: formattedBills,
            tieudung: tieudungs
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
            .input('maphong', sql.Char(10), req.body.maphong)
            .input('cccd', sql.Char(12), req.body.cccd)
            .execute('spCreateHoadon')
        req.flash('success', 'New bill added successfully!');
        res.redirect(req.headers.referer);
    } catch (err) {
        console.error("Error create bill:", err.message || err);
        req.flash('error', err.message);
        return res.redirect(req.headers.referer || '/');
    }
};


module.exports.edit = async (req, res) => {
    try {
        const pool = await connect;
        let id = req.params.id
        await pool.request()
            // .input('status', sql.NVarChar, req.body.trangthai_phong)   
            .input('mahoadon', sql.Char(10), id)
            .execute('spEditHoadon')
        req.flash('success', 'Sửa hóa đơn thành công!');
        res.redirect(req.headers.referer);
    } catch (err) {
        console.error("Error edit room:", err.message || err);
        req.flash('error', err.message);
        return res.redirect(req.headers.referer || '/');
    }
};

module.exports.delete = async (req, res) => {

    try {
        const pool = await connect;
        let id = req.params.id
        await pool.request()
            .input('mahoadon', sql.Char(10), id)
            .execute('spDelHoadon')
        req.flash('success', 'Delete bill success!');
        res.redirect(req.headers.referer);
    } catch (err) {
        console.error("Error delete bill:", err.message || err);
        req.flash('error', err.message);
        return res.redirect(req.headers.referer || '/');
    }
};

module.exports.addDetail = async (req, res) => {
    try {
        const pool = await connect;
        console.log(req.body)
        await pool.request()
            .input('mahoadon', sql.Char(10), req.body.mahoadon)
            .input('matieudung', sql.Char(10), req.body.matieudung)
            .input('soluong', sql.Int, req.body.soluong)
            .input('khuyenmai', sql.Money, req.body.khuyenmai)
            .execute('spCreateCTHD')
        req.flash('success', 'Add service success!');
        res.redirect(req.headers.referer);
    } catch (err) {
        console.error("Error ddd service:", err.message || err);
        req.flash('error', err.message);
        return res.redirect(req.headers.referer || '/');
    }
};

