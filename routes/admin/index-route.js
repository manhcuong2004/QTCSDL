const loginRoutes = require('./login')
const manageRoom = require('./manage-rooms')
const manageBill = require('./manage-bills')
const manageContract = require('./manage-contracts')
const manageGuest = require('./manage-guests')
const manageRevenue = require('./manage-revenue')
const accountGuest = require('./account-guests')
const accountAdmin = require('./account-admin')

module.exports = (app) => {
    app.use('/login', loginRoutes)
    app.use('/admin/manage-rooms', manageRoom)
    app.use('/admin/manage-bills', manageBill)
    app.use('/admin/manage-contracts', manageContract)
    app.use('/admin/manage-guests', manageGuest)
    app.use('/admin/manage-revenue', manageRevenue)
    app.use('/admin/account-guests', accountGuest)
    app.use('/admin/account-admin', accountAdmin)
}