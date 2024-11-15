module.exports.manageContract = async (req, res) => {
    res.render('admin/pages/manage-contracts/index.pug', {
        pageTitle: "Quản lí hợp đồng",
    })
}