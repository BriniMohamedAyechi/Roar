const e = require("express");
const express = require("express");
const app = express();
app.use(express.json());
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
app.use(cors());
app.set("view engine","ejs");
app.use(express.urlencoded({extended:false}));

const nodemailer = require('nodemailer');


const jwt =require("jsonwebtoken");
const { default: axios } = require("axios");

const JWT_token="5qzdlqzdqzdjkozqdkqzdmlqzdk^qzd^pqzodpopnnj" ;



const mongoUrl="mongodb+srv://brini123:12kjksziu@cluster1.nx6qegg.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongoUrl,{
    useNewUrlParser:true
}).then(()=>{
    console.log("Connected to Data Base ")
}).catch(e=>console.log(e));

require("./userDetails");

const User=mongoose.model("userinfo");

app.post("/register",async(req,res)=>{

    const {fname,lname,email,password}=req.body;
    const encryptedPassword= await bcrypt.hash(password,10);

    try {
        const oldUser= await User.findOne({email});
        if(oldUser){
           return res.json({error:"user Already exists"})
        }
        await User.create({
            fname,
            email,
            password:encryptedPassword,
        });
       /* const { username, secret, email, first_name, last_name } = req.body;
        try {
          const r = await axios.post(
            "https://api.chatengine.io/users/",
            { username, secret, email, first_name, last_name },
            { headers: { "Private-Key": "dc4e4171-b7b0-4d95-a48b-e50ed4b6e6c4" } }
          );
          return res.status(r.status).json(r.data);
        } catch (e) {
          return res.status(e.response.status).json(e.response.data);
        }*/
        res.send({status:"ok"})
    } catch (error) {
        res.send({status:"Something Went Wrong"});
        return res.status(e.response.status).json(e.res.data);

        
    }
})

app.post("/login",async(req,res)=>{
    const {email,password}=req.body;

    const user = await User.findOne({email});
    if(!user){
        return res.json({error:"user not found"});
    }
    if (await bcrypt.compare(password,user.password)){
        const token =jwt.sign({email:user.email},JWT_token);
    
    if(res.status(201)) //201 = request seccssfull
    {
        return res.json({status:"OK",data: token})
    }else{
        return res.json({error:"Error"});
    }
    res.json({status:"error",error:"Invalid Password"})}

});

app.post("/userData",async(req,res)=>{
    const {token}=req.body;
    try {
        const user=jwt.verify(token,JWT_token)
        const usermail= user.email;
        User.findOne({email: usermail}).then((data)=>{
            res.send({status:"ok",data:data});
        })
    } catch (error) {
        res.send({error:"error", data: "error"})
        
    }
})


app.post("/authenticate", async (req, res) => {
    const { username } = req.body;
    // Get or create user on Chat Engine!
    try {
      const r = await axios.put(
        "https://api.chatengine.io/users/",
        { username: username, secret: username, first_name: username },
        { headers: { "Private-Key": "dc4e4171-b7b0-4d95-a48b-e50ed4b6e6c4" } }
      );
      return res.status(r.status).json(r.data);
    } catch (e) {
      return res.status(e.response.status).json(e.response.data);
    }
  });

  app.post("/chatLogin", async (req, res) => {
    const { username, secret } = req.body;
  
    // Fetch this user from Chat Engine in this project!
    try {
      const r = await axios.get("https://api.chatengine.io/users/me/", {
        headers: {
          "Project-ID": "dc4e4171-b7b0-4d95-a48b-e50ed4b6e6c4",
          "User-Name": username,
          "User-Secret": secret,
        },
      });
      return res.status(r.status).json(r.data);
    } catch (e) {
      return res.status(e.response.status).json(e.response.data);
    }
  });

  app.post("/forget-password", async(req,res)=>{
    const {email}=req.body;
    try {
      const oldUser= await User.findOne({email});
      if(!oldUser){
         return res.json({status:"user does not exist"}); 
      }
      const secret = JWT_token + oldUser.password;
      const token = jwt.sign({email:oldUser.email, id:oldUser._id},secret);
      const link=`http://localhost:5000/reset-password/${oldUser._id}/${token}`;

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'qqdzqzdqzd@gmail.com',
          pass: 'ydvllltibddzcvqu',
        }
      });
      
      var mailOptions = {
        from: 'youremail@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: link,
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      }); 
      
    } catch (error) {
      
    }
  })
  
  app.get("/reset-password/:id/:token",async(req,res)=>{
    const {id,token}=req.params;
    console.log(req.params);

    const oldUser= await User.findOne({_id:id});
    if(!oldUser){
      return res.json({status:'user does not exist'});
    }
    const secret = JWT_token+ oldUser.password;
    try {
      const verify=jwt.verify(token,secret);
      res.render("index",{email:verify.email,status:"Not verifed"});      
    } catch (error) {
      res.send("not Verified");
      
    }

  })

  app.post("/reset-password/:id/:token",async(req,res)=>{
    const {id,token}=req.params;
    const {password}=req.body;
    const oldUser= await User.findOne({_id:id});
    if(!oldUser){
      return res.json({status:'user does not exist'});
    }
    const secret = JWT_token+ oldUser.password;
    try {
      const verify=jwt.verify(token,secret);
      const encryptedPassword=await bcrypt.hash(password,10);
      await User.updateOne(
        {
          _id:id,
        },
        {
          
          $set:{
            password:encryptedPassword,
          },
        }
      );
      res.render("index",{email:verify.email,status:"verified"});      
    } catch (error) {
      console.log(error)
      res.json({status:'something went wrong'});
      
    }

  })



app.listen(5000,()=>{
    console.log("Server Started")
})




