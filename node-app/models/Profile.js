const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//creat Schema
const ProfileSchema = new Schema({
    type:{
        type:String
    },
    describe:{
        type:String
    },
    income:{
        type:String,
        required:true
    },
    expend:{
        type:String,
        required:true
    },
    cash:{
        type:String,
        required:true
    },
    remark:{
        type:String
    },
    identity:{
        type:String,
        requierd:true
    },
    date:{
        type:Date,
        default:Date.now
    },
})
module.exports= Profile =mongoose.model("profile",ProfileSchema)