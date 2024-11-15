module.exports.manageRevenue = async (req, res) => {
    res.render('admin/pages/manage-revenue/index.pug', {
        pageTitle: "Quản lí doanh thu",
    })
}