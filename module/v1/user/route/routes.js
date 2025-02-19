const User=require("../Controllers/User");
const customerRoute=(app)=>{
    app.post("/v1/user/signup",User.signup);
    app.post("/v1/user/login",User.login);
}
module.exports=customerRoute;