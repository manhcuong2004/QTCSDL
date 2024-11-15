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
        console.error("Error creating room:", err.message || err);
        res.status(500).send("Error creating room");
    }
};
