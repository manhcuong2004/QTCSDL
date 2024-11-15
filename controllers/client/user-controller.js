module.exports.login = async (req, res) => {
    res.render('client/pages/login/login.pug', {
        pageTitle: "Đăng nhập",
    })
}