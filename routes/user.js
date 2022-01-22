require('dotenv').config();
const express = require('express');
const User = require('../models/User');
const router = express.Router();

router.post('/logout', (req,res)=>{
  User.findOneAndUpdate({token: req.body.token}, {token: ''}).exec((err, user)=>{
    if(err) return res.status(500).json({msg: err});
    return res.status(200).json({msg: '로그아웃', user});
  })
})

router.post('/sign_up', (req, res)=>{
  User.findOne({id: req.body.id}).exec((err, user)=>{
    if(err) return res.status(500).json({msg: err});
    if(!user){  // 유저가 디비에 없다면 저장
      new User({
        id: req.body.id,
        token: req.body.token
      }).save((err, user)=>{
        if(err) return res.status(500).json({msg: err});
        return res.status(201).json({msg: '회원 저장', user});
      })  //이미 저장된 유저라면 
    }else{
      User.findOneAndUpdate({id: req.body.id}, {token: req.body.token}).exec((err, user)=>{
        if(err) return res.status(500).json({msg: err});
        return res.status(200).json({msg: '기존 회원', user});
      }) 
    }
  })
})


module.exports = router;