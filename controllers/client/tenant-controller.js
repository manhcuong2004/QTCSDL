const { connect, sql } = require('../../config/database')
const systemConfig = require("../../config/system")

module.exports.tenant = async (req, res) => {
    res.render('client/pages/tenant/index.pug', {
        pageTitle: "Thông tin của bạn",
    })
}