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
        const sqlString = `
            INSERT INTO phongtro (maphong, dientich, soluongnguoi, gia, trangthai_phong)
            VALUES (@id, @area, @countp, @price, N'Trống')
        `;
        await pool.request()
            .input('id', sql.Char(10), req.body.maphong)
            .input('area', sql.Int, req.body.dientich)
            .input('countp', sql.Int, req.body.soluongnguoi)
            .input('price', sql.Money, req.body.gia)
            .query(sqlString);
        req.flash('success', 'Thêm phòng mới thành công!');
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
        const sqlString = `
          UPDATE phongtro 
          SET dientich = @area, 
              soluongnguoi = @countp, 
              gia = @price, 
              trangthai_phong = @status
          WHERE maphong = @id
      `;

        await pool.request()
            .input('area', sql.Int, req.body.dientich)
            .input('countp', sql.Int, req.body.soluongnguoi)
            .input('price', sql.Money, req.body.gia)
            .input('status', sql.NVarChar, req.body.trangthai_phong)
            .input('id', sql.Char(10), req.body.maphong)
            .query(sqlString);

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
        const sqlString = `DELETE FROM phongtro WHERE maphong = @id`;
        let id = req.params.id
        await pool.request()
            .input('id', sql.Char(10), id)
            .query(sqlString);
        req.flash('success', 'Xóa phòng thành công!');
        res.redirect(req.headers.referer);
    } catch (err) {
        console.error("Error delete room:", err.message || err);
        req.flash('error', err.message);
        return res.redirect(req.headers.referer || '/');
    }
};