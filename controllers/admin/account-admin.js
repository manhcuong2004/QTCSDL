module.exports.accountAdmin = async (req, res) => {
    res.render('admin/pages/account-admin/index.pug', {
        pageTitle: "Tài khoản cá nhân",
    })
}