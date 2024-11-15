const express = require('express')
require("dotenv").config();
const systemConfig = require('./config/system');
// const { connect, sql } = require('./config/database')
const bodyParser = require('body-parser');
const flash = require('express-flash')
const expresSession = require('express-session')


const app = express()
const port = process.env.PORT
app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.locals.prefixAdmin = systemConfig.prefixAdmin
app.use(flash());
app.use(expresSession({
    secret: 'cuongcookcool',
    cookie: { maxAge: 60000 }
}));

// khai báo route
const route = require("./routes/client/index-route");
const routeAdmin = require("./routes/admin/index-route");
app.use(express.static(`./public`));

route(app);
routeAdmin(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})