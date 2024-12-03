const { connect, sql } = require('../../config/database')

module.exports.manageRoom = async (req, res) => {
    try {
        let pool = await connect;
        let result = await pool.request().query("select * from phongtro");
        const rooms = result.recordset
        res.render('admin/pages/manage-rooms/index.pug', {
            pageTitle: "Quản lí phòng trọ",
            rooms: rooms
        });
    } catch (err) {
        console.log("Error:", err);
        req.flash('error', 'Có lỗi xảy ra khi xóa phòng!');
        res.status(500).send("Lỗi hệ thống");
    }
}
module.exports.create = async (req, res) => {
    try {
        const pool = await connect;
        await pool.request()
            .input('id', sql.Char(10), req.body.maphong)
            .input('area', sql.Int, req.body.dientich)
            .input('countp', sql.Int, req.body.soluongnguoi)
            .input('price', sql.Money, req.body.gia)
            .execute('spCreateRoom')
        req.flash('success', 'New room added successfully!');
        res.redirect(req.headers.referer);
    } catch (err) {
        console.error("Error create room:", err.message || err);
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