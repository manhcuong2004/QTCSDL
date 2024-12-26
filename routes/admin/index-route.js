const loginRoutes = require('./login')
const manageRoom = require('./manage-rooms')
const manageBill = require('./manage-bills')
const manageContract = require('./manage-contracts')
const managecustomer = require('./manage-customers')
const manageRevenue = require('./manage-revenue')
const accountcustomer = require('./account-customers')
const accountAdmin = require('./account-admin')

module.exports = (app) => {
    app.use('/login', loginRoutes)
    app.use('/admin/manage-rooms', manageRoom)
    app.use('/admin/manage-bills', manageBill)
    app.use('/admin/manage-contracts', manageContract)
    app.use('/admin/manage-customers', managecustomer)
    app.use('/admin/manage-revenue', manageRevenue)
    app.use('/admin/account-customers', accountcustomer)
    app.use('/admin/account-admin', accountAdmin)
}