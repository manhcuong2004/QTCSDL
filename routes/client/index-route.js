const loginRoutes = require('./login')
const contractRoutes = require('./contract')
const billRoutes = require('./bill')
const tenantRoutes = require('./tenant')

module.exports = (app) => {
    app.use('/login', loginRoutes)
    app.use('/contract', contractRoutes)
    app.use('/bill', billRoutes)
    app.use('/tenant', tenantRoutes)

}