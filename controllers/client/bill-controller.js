const { connect, sql } = require('../../config/database')
const systemConfig = require("../../config/system")

module.exports.bill = async (req, res) => {
    res.render('client/pages/bill/index.pug', {
        pageTitle: "Thông tin hợp đồng của bạn",
    })
}