const express = require("express");
const conn = require("./config/database");
let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.engine('html', require('ejs').renderFile)
app.set('view Engine', 'html')




const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/login', (req, res) => {
    res.render(__dirname + "/login.html")
});
app.post('/login', function (req, res) { // Changed to POST method
    const userObj = {
        email: req.body.email,
        password: req.body.password
    };
    console.log(req.body.password);
    console.log(req.body.email);
    
    const query = "SELECT * FROM tbl_user WHERE email='"+req.body.email+"' AND password='"+req.body.password+"' AND is_delete=0";
    console.log(query)
    conn.query(query, function (error, result) { 
        console.log(result.length);
            
        if (result.length > 0) {

            res.redirect("/show_detail");
        } else {
            res.redirect("login");
            console.log(error);
            
        }
    });
});



app.get('/show_detail', function (req, res) {
    conn.query("select * from tbl_user where is_active='1' and is_delete='0'", function (error, result) {
        if (!error && result.length > 0) {
            res.render(__dirname + "/show_detail.html", { result: result });
        }
        else {
            res.render(__dirname + "/show_detail.html", { result: [] });
        }
    });
});
app.get('/add_user', (req, res) => {
    res.render(__dirname + "/add_user.html")
});

app.post('/add_user', function (req, res) {
    const userObj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone_no: req.body.phone_no,
        password: req.body.password,
        gender: req.body.gender,
        salary: req.body.salary,
        designation: req.body.designation,
        address: req.body.address
    };

    const query = "INSERT INTO tbl_user (first_name, last_name, email, phone_no, password, gender, salary, designation, address) VALUES (?,?,?,?,?,?,?,?,?)";

    conn.query(query, [
        userObj.first_name, 
        userObj.last_name, 
        userObj.email, 
        userObj.phone_no, 
        userObj.password, 
        userObj.gender, 
        userObj.salary, 
        userObj.designation, 
        userObj.address
    ], function (error, result) {
        
        if (error) {
            console.error("Error inserting data:", error);
            res.redirect("/add_user?error=Failed to Add User"); // Redirecting properly
        } else {
            console.log("User added successfully:", result);
            res.redirect("/show_detail"); // Ensure this route is defined
        }
    });
});

app.get('/edit_user/:user_id', (req, res) =>{
    conn.query("select * from tbl_user where user_id='"+req.params.user_id+"' and is_delete='0'",function(error,result){
        if (!error && result.length > 0) {
            res.render(__dirname + "/edit_user.html", { result: result });
        }
        else {
            res.render(__dirname + "/show_detail.html", { result: [] });
        }
    });
});

app.post('/edit_user/:user_id', function (req, res) {
    const userObj = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone_no: req.body.phone_no,
        password: req.body.password,
        gender: req.body.gender,
        salary: req.body.salary,
        designation: req.body.designation,
        address: req.body.address
    };
    const user_id=req.params.user_id;
    const query = `
    UPDATE tbl_user 
    SET first_name=?, last_name=?, email=?, phone_no=?, password=?, gender=?, salary=?, designation=?, address=? 
    WHERE user_id=? AND is_delete='0'`;    
    conn.query(query, [
        userObj.first_name, 
        userObj.last_name, 
        userObj.email, 
        userObj.phone_no, 
        userObj.password, 
        userObj.gender, 
        userObj.salary, 
        userObj.designation, 
        userObj.address,
        user_id
    ], function (error, result) {
        
        if (result.affectedRows > 0) {
            console.log("User updated successfully:", result);
            return res.redirect("/show_detail?success=User updated successfully");
        } else {
            return res.redirect("/edit_user/" + user_id + "?error=No changes made or user not found");
        }
    });
});


/*app.get('/delete/:user_id',function(req,res){
    conn.query("update tbl_user set is_delete=1 where user_id='"+req.params.user_id+"'"),function (error, result) {
        if (!error && result.length > 0) {
            res.redirect("/show_detail");
        } else {
            res.redirect("/show_detail");
        }
    }
});*/

app.get('/delete/:user_id', function(req, res) {
    const userId = req.params.user_id;

    // Using parameterized queries to avoid SQL injection
    const query = "UPDATE tbl_user SET is_delete = 1 WHERE user_id = ?";

    conn.query(query, [userId], function(error, result) {
        if (error) {
            console.error("Error while deleting the user: ", error);
            res.redirect("/show_detail?error=Unable to delete user");
        } else if (result.affectedRows > 0) {
            res.redirect("/show_detail?message=User successfully deleted");
        } else {
            res.redirect("/show_detail?error=User not found or already deleted");
        }
    });
});


try {
    app.listen(3033);
    console.log("Server Running : 3033");
}
catch (error) {
    console.log("Connection Failed....");

}