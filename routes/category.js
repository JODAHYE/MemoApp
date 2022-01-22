const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const Post = require('../models/Post');
router.post('/create', (req, res)=>{
  console.log(req.body.name);
  Category.findOne({userId: req.body.userId, name: req.body.name}, (err, category)=>{
    if(err) return res.status(500).json({msg: err});
    if(category) return res.status(200).json({isExist: true, category});
    else{
      new Category({
        userId: req.body.userId,
        name: req.body.name
      }).save((err, category)=>{
        if(err) return res.status(500).json({msg: err});
        return res.status(201).json({msg: '카테고리 생성', isExist: false, category});
      })    
    }
  })
});


router.get('/list/:userId/all', (req, res)=>{
  Category.find({userId: req.params.userId}).exec((err, categories)=>{
    if(err) return res.status(500).json({msg: err});
    return res.status(200).json({categories});
  })
})

router.delete('/delete/:userId/:name', (req, res)=>{
  Category.findOneAndRemove({userId: req.params.userId, name: req.params.name}).exec((err, category)=>{
    if(err) return res.status(500).json({msg: err});
    if(category){
        Post.deleteMany({userId: req.params.userId, category: category._id}).exec((err, posts)=>{
        return res.status(200).json({msg: '카테고리 제거'});
      });
    }
  })
})

router.get('/:userId/:name', (req, res)=>{
  Category.findOne({userId: req.params.userId, name: req.params.name}).exec((err, category)=>{
    if(err) return res.status(500).json({msg: err});
    return res.status(200).json({msg: '카테고리 id', id: category._id});
  })
})


module.exports = router;