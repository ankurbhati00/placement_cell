const express = require('express');
const app = express();
const PORT = 8000;
const Db = require('./config/mongoose');

app.use(express.urlencoded());
app.use(express.static('assets'));
app.set('view engine', 'ejs');
app.set('views', './views');



app.listen(PORT, (err)=>{

if(err){
    console.log("Error in listining..", err);
}

console.log(`Server is up on Port: ${PORT}  >>>>>>>>>>>`);

})