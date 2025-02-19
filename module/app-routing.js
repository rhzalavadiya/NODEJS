class routing{
    v1(app){
        const user=require("./v1/user/route/routes");
        user(app);
    }
}
module.exports=new routing();