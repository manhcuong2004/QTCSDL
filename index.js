const express = require('express')
require("dotenv").config();
const systemConfig = require('./config/system');
// const { connect, sql } = require('./config/database')
const bodyParser = require('body-parser');
const flash = require('express-flash')
const expresSession = require('express-session')
const methodOverride = require('method-override')


const app = express()
const port = process.env.PORT
app.set('view engine', 'pug');
app.set('views', './views');

app.use(methodOverride('_method'))
app.use(bodyParser.urlencoded({
    extended: true,
    parameterLimit: 100000, // Số lượng tham số tối đa
    limit: '10mb' // Giới hạn kích thước dữ liệu
})); app.use(bodyParser.json());
app.use(flash());
app.use(expresSession({
    secret: 'cuongcookcool',
    cookie: { maxAge: 60000 },
    // saveUninitialized: true,
    // resave: false,
}));

// khai báo route
const route = require("./routes/client/index-route");
const routeAdmin = require("./routes/admin/index-route");
app.use(express.static(`./public`));

app.locals.prefixAdmin = systemConfig.prefixAdmin


route(app);
routeAdmin(app);


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})