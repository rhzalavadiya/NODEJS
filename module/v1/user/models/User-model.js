const conn = require("../../../../config/database");
const responseCode = require("../../../../utillities/response-error-code");
const common = require("../../../../utillities/common");
const constant=require("../../../../config/constant");
const md5=require("md5");
const { log } = require("console");
class UserModel {
    constructor() {}

    signup(request_data, callback) {
        console.log("Signup request for user:", request_data.user_name);

        const data = {
            user_name: request_data.user_name,
            first_name: request_data.first_name,
            last_name: request_data.last_name,
            country_code_id: request_data.country_code_id, // Fixed typo
            phone_no: request_data.phone_no,
            email: request_data.email,
            password: md5(request_data.password),
            profile_pic: request_data.profile_pic,
            description: request_data.description, // Fixed typo
            location: request_data.location,
            latitude: request_data.latitude,
            longitude: request_data.longitude,
            referal_id: request_data.referal_id, // Fixed typo
        };

        const insert = "INSERT INTO tbl_user SET ?";
        conn.query(insert, data, (error, result) => {
            if (error) {
                console.error("Database insertion error:", error);
                return callback({
                    code: responseCode.OPERATION_FAILED,
                    message: error.sqlMessage || "Failed to insert user data."
                });
            }
            
            console.log("User inserted with ID:", result.insertId);
            common.getUserDetail(result.insertId, result.insertId, (err, userInfo) => {
                if (err) {
                    console.error("Error fetching user details:", err);
                    return callback({
                        code: responseCode.OPERATION_FAILED,
                        message: err
                    });
                }
                
                return callback({
                    code: responseCode.SUCCESS, // Fixed typo in SUCCESS
                    message: "User Signup Successfully",
                });
            });
        });
    }
    login(request_data, callback) {
        console.log("Login request for user:", request_data.email);

        if (!request_data.email || !request_data.password) {
            return callback({
                code: responseCode.INVALID_REQUEST,
                message: "Email and password are required"
            });
        }

        const email = request_data.email;
        const password = request_data.password;

        const loginQuery = "SELECT * FROM tbl_user WHERE email = ? AND password = ?";
        conn.query(loginQuery, [email, password], (error, result) => {
            console.log(result);
            
            if (error) {
                console.error("Database error:", error);
                return callback({
                    code: responseCode.OPERATION_FAILED,
                    message: "Database error occurred"
                });
            }

          else if (result.length <= 0) {
                return callback({
                    code: responseCode.NOT_REGISTERED,
                    message: "Invalid email or password"
                });
            }

            return callback({
                code: responseCode.SUCCESS,
                message: "Login Successfully"
            });
        });
    }
}

module.exports = new UserModel();
