const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

router.post('/save', (req, res)=>{
  new Post(req.body).save((err, post)=>{
    if(err) return res.json({msg: err});
    return res.status(201).json({msg: '게시글이 저장되었습니다', post});
  })
})

router.get('/list/:userId/:categoryId/:skip', (req, res)=>{
  const skip = parseInt(req.params.skip);
  console.log(skip);
  if(req.params.categoryId==='all'){
    Post.find({userId: req.params.userId}).sort({date: -1}).skip(skip).limit(6).exec((err, posts)=>{
      if(err) return res.status(500).json({msg: err});
      return res.status(200).json({posts});
    });
  }else{
    Post.find({userId: req.params.userId, category: req.params.categoryId}).sort({date: -1}).skip(skip).limit(6).exec((err, posts)=>{
      if(err) return res.status(500).json({msg: err});
      return res.status(200).json({posts});
    })
  }
})
router.get('/list/:userId/:categoryId/:color/:skip', (req, res)=>{
  const color = '#' + req.params.color;
  const skip = parseInt(req.params.skip);
  if(req.params.categoryId==='all'){
    Post.find({userId: req.params.userId, color: color}).sort({date: -1}).skip(skip).limit(6).exec((err, posts)=>{
      if(err) return res.status(500).json({msg: err});
      return res.status(200).json({posts, color});
    })
  }else{
    Post.find({userId: req.params.userId, category: req.params.categoryId, color: color})
    .sort({date: -1}).skip(skip).limit(6).exec((err, posts)=>{
      if(err) return res.status(500).json({msg: err});
      return res.status(200).json({posts, color});
    })  
  }
});
router.delete('/delete/:userId/:postId', (req, res)=>{
  Post.findByIdAndRemove(req.params.postId, (err, post)=>{
    if(err) return res.status(400).json({msg: err});
    return res.status(200).json({msg: '삭제', post});
  })
});

router.post('/update', (req, res)=>{
  Post.findByIdAndUpdate(req.body._id, req.body).exec((err, post)=>{
    if(err) return res.status(400).json({msg: err});
    return res.status(200).json({msg: '수정', post});
  })
})
module.exports = router;