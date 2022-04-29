import express from "express";
import authMiddleware from "../middleware/auth.js";
import Category from "../models/Category.js";
import Post from "../models/Post.js";
const postRouter = express.Router();

postRouter.post("/save", authMiddleware, async (req, res) => {
  const { title, content, color, category } = await req.body;
  if (category) {
    Category.findOne({ userId: req.user.objectId, name: category }).exec(
      (err, result) => {
        new Post({
          title,
          content,
          color,
          category: result._id,
          userId: req.user.objectId,
        }).save((err, post) => {
          if (err) return res.json({ success: false, msg: err });
          return res
            .status(201)
            .json({ success: true, msg: "Created successfully", post });
        });
      }
    );
  } else {
    new Post({
      title,
      content,
      color,
      userId: req.user.objectId,
    }).save((err, post) => {
      if (err) return res.json({ success: false, msg: err });
      return res
        .status(201)
        .json({ success: true, msg: "Created successfully", post });
    });
  }
});

postRouter.get("/list", authMiddleware, (req, res) => {
  const skip = parseInt(req.query.skip);
  if (req.query.color) {
    Post.find({ userId: req.user.objectId, color: req.query.color })
      .sort({ date: -1 })
      .skip(skip)
      .limit(6)
      .exec((err, posts) => {
        if (err) return res.status(504).json({ success: false, msg: err });
        if (posts.length === 0)
          return res
            .status(200)
            .json({ success: false, msg: "Does not exist" });

        return res.status(200).json({ success: true, posts });
      });
  } else {
    Post.find({ userId: req.user.objectId })
      .sort({ date: -1 })
      .skip(skip)
      .limit(6)
      .exec((err, posts) => {
        if (err) return res.status(504).json({ success: false, msg: err });
        if (posts.length === 0)
          return res
            .status(200)
            .json({ success: false, msg: "Does not exist" });
        return res.status(200).json({ success: true, posts });
      });
  }
});
postRouter.get("/list/filter", authMiddleware, (req, res) => {
  const skip = parseInt(req.query.skip);
  console.log(req.query);
  if (req.query.color) {
    Category.findOne({
      userId: req.user.objectId,
      name: req.query.category,
    }).exec((err, result) => {
      Post.find({
        userId: req.user.objectId,
        category: result._id,
        color: req.query.color,
      })
        .sort({ date: -1 })
        .skip(skip)
        .limit(6)
        .exec((err, posts) => {
          if (err) return res.status(500).json({ success: false, msg: err });
          if (posts.length === 0)
            return res
              .status(200)
              .json({ success: false, msg: "Does not exist" });
          return res.status(200).json({ success: true, posts });
        });
    });
  } else {
    Category.findOne({
      userId: req.user.objectId,
      name: req.query.category,
    }).exec((err, result) => {
      Post.find({
        userId: req.user.objectId,
        category: result._id,
      })
        .sort({ date: -1 })
        .skip(skip)
        .limit(6)
        .exec((err, posts) => {
          if (err) return res.status(500).json({ success: false, msg: err });
          if (posts.length === 0)
            return res
              .status(200)
              .json({ success: false, msg: "Does not exist" });
          return res.status(200).json({ success: true, posts });
        });
    });
  }
});
postRouter.delete("/delete", authMiddleware, (req, res) => {
  Post.findByIdAndRemove(req.query.postId, (err, post) => {
    if (err) return res.status(400).json({ success: false, msg: err });
    return res
      .status(200)
      .json({ success: true, msg: "deleted successfully", post });
  });
});

postRouter.post("/update", authMiddleware, (req, res) => {
  Post.findByIdAndUpdate(req.body._id, req.body).exec((err, post) => {
    if (err) return res.status(400).json({ success: false, msg: err });
    return res
      .status(200)
      .json({ success: true, msg: "Uppdated successfully", post });
  });
});
export default postRouter;
