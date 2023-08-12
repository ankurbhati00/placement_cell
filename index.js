const express = require('express');
const app = express();
const PORT =process.env.PORT || 8000;
const Db = require('./config/mongoose');
const expressLayout = require('express-ejs-layouts');
const session = require("express-session");
const passport = require('passport');
const passportLocal = require('./config/passport_local_strategy');

app.use(express.urlencoded());
app.use(express.static('assets'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(expressLayout);
app.use(session({
    secret: 'peopy',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60 * 60 * 1000
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routers'));

app.listen(PORT, (err)=>{

if(err){
    console.log("Error in listining..", err);
}

console.log(`Server is up on Port: ${PORT}  >>>>>>>>>>>`);

})