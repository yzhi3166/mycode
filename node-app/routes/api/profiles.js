//Login & Register
const express =require("express");
const router =express.Router();
const passport =require("passport");
const Profile =require("../../models/Profile");

//$route GET请求 地址：api/profiles/test
//@desc  返回请求的 json数据
//@access public
router.get('/test',(req,res)=>{
    res.json({msg:"profile works"})
})
//$route POST请求 地址：api/profiles/add
//@desc  创建信息接口   
//@access Private
router.post("/add",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const  profilesFields={}

    if(req.body.type) profilesFields.type=req.body.type;
    if(req.body.describe) profilesFields.describe=req.body.describe;
    if(req.body.income) profilesFields.income=req.body.income;
    if(req.body.expend) profilesFields.expend=req.body.expend;
    if(req.body.cash) profilesFields.cash=req.body.cash;
    if(req.body.remark) profilesFields.remark=req.body.remark

    new Profile(profilesFields).save().then(profile=>{
        res.json(profile)
    })
})
//$route GET 地址：api/profiles
//@desc  获取所有信息   
//@access Private
router.get("/",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.find()
    .then(profile =>{
        if(!profile){
            return res.status(404).json("没有任何内容")
        }
        res.json(profile)
    })
    .catch(err =>res.status(404).json(err))
})
//$route GET 地址：api/profiles/:id
//@desc  获取单个信息   
//@access Private
router.get("/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.findOne({_id:req.params.id})
    .then(profile =>{ 
        if(!profile){
            return res.status(404).json("没有任何内容")
        }
        res.json(profile)
    })
    .catch(err =>res.status(404).json(err))
})
//$route POST请求 地址：api/profiles/edit
//@desc  编辑信息接口   
//@access Private
router.post("/edit/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    const  profilesFields={}

    if(req.body.type) profilesFields.type=req.body.type;
    if(req.body.describe) profilesFields.describe=req.body.describe;
    if(req.body.income) profilesFields.income=req.body.income;
    if(req.body.expend) profilesFields.expend=req.body.expend;
    if(req.body.cash) profilesFields.cash=req.body.cash;
    if(req.body.remark) profilesFields.remark=req.body.remark

    Profile.findOneAndUpdate(
        {_id:req.params.id},
        {$set:profilesFields},
        {new:true}
    ).then(profile=>res.json(profile))
})
//$route GET 地址：api/profiles/delete
//@desc  删除信息接口   
//@access Private
router.delete("/delete/:id",passport.authenticate("jwt",{session:false}),(req,res)=>{
    Profile.findOneAndRemove({_id:req.params.id}).then(profile=>{
        profile.save().then(profile=>res.json(profile))
    })
    .catch(err=>res.status(404).json("删除失败"))
})



module.exports =router;