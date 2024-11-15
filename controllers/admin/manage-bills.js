module.exports.manageBill = async (req, res) => {
    res.render('admin/pages/manage-bills/index.pug', {
        pageTitle: "Quản lí hóa đơn",
    })
}