module.exports.login = async (req, res) => {
    res.render('admin/pages/login/login.pug', {
        pageTitle: "Đăng nhập",
    })
}