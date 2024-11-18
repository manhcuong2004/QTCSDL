const { connect, sql } = require('../../config/database')
const systemConfig = require("../../config/system")

module.exports.contract = async (req, res) => {
    res.render('client/pages/contract/index.pug', {
        pageTitle: "Thông tin hợp đồng của bạn",
    })
}