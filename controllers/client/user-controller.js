const { connect, sql } = require('../../config/database')
const systemConfig = require("../../config/system")

module.exports.login = async (req, res) => {
    res.render('admin/pages/login/login.pug', {
        pageTitle: "Đăng nhập",
    })
}

// module.exports.loginPost = async (req, res) => {
//     console.log(req.body)
//     const { username, password, userType } = req.body;
//     try {
//         const pool = await connect;

//         let tableName;
//         if (userType === 'option2') {
//             tableName = 'khachthue';
//         }

//         const query = `
//             SELECT tendn, mk
//             FROM chutro
//             WHERE tendnkh = @username AND deleted = 0
//         `;
//         const result = await pool
//             .request()
//             .input('username', username)
//             .query(query);
//         if (result.recordset.length > 0) {
//             const user = result.recordset[0];
//             if (password === user.mk) {
//                 return res.redirect(`/manage-rooms`);
//             }
//         }
//         req.flash('error', 'Tên đăng nhập hoặc mật khẩu không đúng!');
//         return res.redirect('/login');

//     } catch (err) {
//         console.log("Error:", err);
//         res.status(500).send("Lỗi hệ thống");
//     }
// }