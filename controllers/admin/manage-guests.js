module.exports.manageGuest = async (req, res) => {
    res.render('admin/pages/manage-guests/index.pug', {
        pageTitle: "Quản lí khách thuê",
    })
}