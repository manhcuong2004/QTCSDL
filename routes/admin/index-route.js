const loginRoutes = require('./login')
const manageRoom = require('./manage-rooms')
const manageBill = require('./manage-bills')
const manageContract = require('./manage-contracts')
const manageGuest = require('./manage-guests')
const manageRevenue = require('./manage-revenue')

module.exports = (app) => {
    app.use('/admin/login', loginRoutes)
    app.use('/admin/manage-rooms', manageRoom)
    app.use('/admin/manage-bills', manageBill)
    app.use('/admin/manage-contracts', manageContract)
    app.use('/admin/manage-guests', manageGuest)
    app.use('/admin/manage-revenue', manageRevenue)
}