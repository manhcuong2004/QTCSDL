const { connect, sql } = require('../../config/database')
const FindRoomHelper = require("../../public/js/findHelper")

module.exports.manageRoom = async (req, res) => {
    try {
        let pool = await connect;

        // Lấy thông tin tìm kiếm từ query
        const objectSearch = FindRoomHelper(req.query);

        let query = "SELECT * FROM phongtro";
        if (objectSearch.regex) {
            query += ` WHERE maphong LIKE '%${objectSearch.keyword}%'`;
        }
        let result = await pool.request().query(query);
        const rooms = result.recordset;

        res.render("admin/pages/manage-rooms/index.pug", {
            pageTitle: "Quản lí phòng trọ",
            rooms: rooms,
        });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send("Lỗi hệ thống");
    }
};
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