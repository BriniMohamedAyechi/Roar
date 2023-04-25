const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema(
    {
        fname:String,
        email:{type:String,unique:true},
        password:String,


    }
,{
    collection:"userinfo",
}
);

mongoose.model("userinfo",userDetailsSchema);