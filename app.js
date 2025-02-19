const express=require("express");
let config=require("./config/config");
const app_routing=require("./module/app-routing");
const bodyParser = require("body-parser");


let app = express();
const urlencoderParser=bodyParser.urlencoded({
    extended:true
});
app.use(bodyParser.json());
app_routing.v1(app);

try {
    app.listen(config.server_listen,()=>{
        console.log("Server Sate : Running Posrt : "+config.server_listen);
        
    });
}
catch (error) {
    console.log("Connection Failed....");

}