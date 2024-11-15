const loginRoutes = require('./login')

module.exports = (app) => {
    app.get('/login', loginRoutes)


}