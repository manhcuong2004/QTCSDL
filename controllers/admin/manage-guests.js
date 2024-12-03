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

module.exports.create = async (req, res) => {
    try {
        const pool = await connect;
        await pool.request()
            .input('cccd', sql.Char(12), req.body.cccd)
            .input('tenkh', sql.NVarChar(50), req.body.tenkh)
            .input('sdtkhach', sql.Char(10), req.body.sdtkhach)
            .input('tendnkh', sql.Varchar(16), req.body.tendnkh)
            .input('mkkh', sql.VarChar(12), req.body.mkkh)
            .input('gioitinh', sql.VarChar(5), req.body.gioitinh)
            .input('ngaysinh', sql.DateTime, req.body.ngaysinh)
            .input('quequan', sql.NVarChar(50), req.body.quequan)
            .input('maphong', sql.Char(10), req.body.maphong)
            .execute('spCreateCus')
        req.flash('success', 'New information customer added successfully!');
        res.redirect(req.headers.referer);
    } catch (err) {
        console.error("Error create information customer:", err.message || err);
        req.flash('error', err.message);
        return res.redirect(req.headers.referer || '/');
    }
};


module.exports.edit = async (req, res) => {
    try {
        const pool = await connect;
        await pool.request()
            // .input('status', sql.NVarChar, req.body.trangthai_phong)   
            .input('id', sql.Char(10), req.body.maphong)
            .input('area', sql.Int, req.body.dientich)
            .input('countp', sql.Int, req.body.soluongnguoi)
            .input('price', sql.Money, req.body.gia)
            .execute('spCheckEditRoom')
        // .query(sqlString);
        req.flash('success', 'Sửa phòng thành công!');
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
            .input('id', sql.Char(10), id)
            .execute('spDelRoom')
        req.flash('success', 'Delete room success!');
        res.redirect(req.headers.referer);
    } catch (err) {
        console.error("Error delete room:", err.message || err);
        req.flash('error', err.message);
        return res.redirect(req.headers.referer || '/');
    }
};