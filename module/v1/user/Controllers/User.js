const responseCode=require("../../../../utillities/response-error-code");
const constant=require("../../../../config/constant");
const common=require("../../../../utillities/common");
const userModel=require("../models/User-model");
class User{
    constructor(){}
    signup(req,res){
        const request_data=req.body;
       /* if(paramValidator.signup(request_data).code==true){
            const message={
                code:responseCode.OPERATION_FAILED,
                message:paramValidator.signup(request_data).message
            }
            common.response(res,message);
        }*/
        
           // request_data.role="U";
            userModel.signup(request_data,(_responseData)=>{
                //common.response(res,_responseData);
                res.json(_responseData); 
            });
    }
    login(req,res){
        const request_data=req.body;
        userModel.login(request_data,(_responseData)=>{
            //common.response(res,_responseData);
            res.json(_responseData); 
        });
    }
}
module.exports=new User;
