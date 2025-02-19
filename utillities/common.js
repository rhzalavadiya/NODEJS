const httpStatus=require("http-status-codes");
const database=require("../config/database");
const responseCode=require("./response-error-code");
class common{

    response(res,message,statusCode=httpStatus.OK){
        res.status(statusCode);
        res.json(this.message);
    }
    generateOTP(){
        return "1234";
    }
    getUserDetail(user_id,login_user_id,callback){
        const context =this;
        const select="select * from tbl_user where user_id=? and is_delete=0";
        database.query(select,user_id,function(error,user){
            if(error){
                callback(error,[]);
            }
            else{
                if(user.length>0){
                    callback(undefined,user[0]);
                }
                else{
                    callback(("No Data Found"),[]);
                }
            }
        });
    }
}
module.exports=new common;