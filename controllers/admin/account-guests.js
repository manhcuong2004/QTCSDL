module.exports.accountGuest = async (req, res) => {
    res.render('admin/pages/account-guests/index.pug', {
        pageTitle: "Quản lí tài khoản khách thuê",
    })
}