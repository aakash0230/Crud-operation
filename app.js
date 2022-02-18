const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyparser = require("body-parser");
// const hbs = require("hbs");
const path = require('path');
const app = express();

const connectDB = require("./server/database/connection");


dotenv.config({path : 'config.env'});
const PORT = process.env.PORT || 8080;

// log requests
app.use(morgan('tiny'));

// mongo db connection
connectDB();

// parse request to body parser
app.use(bodyparser.urlencoded({extended:true}));

// set view wengine
app.set("view engine","ejs");
// app.set("views",path.join(__dirname,"views/hbs"));

// hbs.registerPartials(path.join(__dirname,"/views/include"));

// load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")));
app.use('/js',express.static(path.resolve(__dirname,"assets/js")));
app.use('/img',express.static(path.resolve(__dirname,"assets/img")));

// load routers
app.use('/',require('./server/routes/router'));

app.listen(PORT, () => {
    console.log(`server is running on port no ${PORT}`);
})