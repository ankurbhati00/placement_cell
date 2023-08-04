const express = require('express');
const app = express();
const PORT = 8000;
const Db = require('./config/mongoose');
const expressLayout = require('express-ejs-layouts');

app.use(express.urlencoded());
app.use(express.static('assets'));
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(expressLayout);

app.use('/', require('./routers'));

app.listen(PORT, (err)=>{

if(err){
    console.log("Error in listining..", err);
}

console.log(`Server is up on Port: ${PORT}  >>>>>>>>>>>`);

})