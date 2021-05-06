const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const { static, response } = require("express");
const app=express();
const https= require("https");
// const { url } = require("inspector");
// const { resolve } = require("path");
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(requ,resp){
    const firstName=requ.body.fName;
    const lastName=requ.body.lName;
    const email=requ.body.email;
    
    const data={
        members:[
            {
                email_address:email,
                status:"subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us1.api.mailchimp.com/3.0/lists/b9028f3271";
    const options={
        method: "POST",
        auth:"ajay:54c4f00846bfabdba6f1e6090629df2c-us1"
    }
    const request = https.request(url,options,function(response){
        if(response.statusCode===200){
            resp.sendFile(__dirname+"/success.html")
        }
        else{
            resp.sendFile(__dirname+"/failure.html")
        }


        response.on("data",function(data){
            console.log(JSON.parse(data));
            
        })

    })
    request.write(jsonData);
    request.end();
});

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
    console.log("server is up");
});





// API key
// 54c4f00846bfabdba6f1e6090629df2c-us1

// list id
// b9028f3271