const mysql=require("mysql");
const credential={
    host:'localhost',
    user:'root',
    password:"",
    database:'db_deals',
    dateString:'date',
    port:3306
}
const database = mysql.createPool(credential);
module.exports=database;