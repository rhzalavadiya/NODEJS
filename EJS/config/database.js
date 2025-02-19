const mysql=require("mysql");
const credential={
    host:'localhost',
    user:'root',
    password:'',
    database:'db_emp',
    dateString:'date'
}
const database = mysql.createPool(credential);
module.exports=database;