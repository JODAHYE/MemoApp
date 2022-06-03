import express from "express";
import authMiddleware from "../middleware/auth.js";
import Category from "../models/Category.js";
import Post from "../models/Post.js";

const categoryRouter = express.Router();

categoryRouter.post("/create", authMiddleware, (req, res) => {
  Category.findOne(
    { userId: req.user.objectId, name: req.body.name },
    (err, category) => {
      if (err) return res.status(500).json({ msg: err });
      if (category)
        return res
          .status(200)
          .json({ success: false, msg: "이미 존재", category });
      else {
        new Category({
          userId: req.user.objectId,
          name: req.body.name,
        }).save((err, category) => {
          if (err) return res.status(500).json({ msg: err });
          return res
            .status(201)
            .json({ success: true, msg: "생성 성공", category });
        });
      }
    }
  );
});

categoryRouter.get("/list/all", authMiddleware, (req, res) => {
  Category.find({ userId: req.user.objectId }).exec((err, categories) => {
    if (err) return res.status(500).json({ success: false, msg: err });
    return res.status(200).json({ success: true, categories });
  });
});

categoryRouter.delete("/delete", authMiddleware, (req, res) => {
  Category.findOneAndRemove({
    userId: req.user.objectId,
    name: req.query.name,
  }).exec((err, category) => {
    if (err) return res.status(500).json({ success: false, msg: err });
    if (category) {
      Post.deleteMany({
        userId: req.user.objectId,
        category: category._id,
      }).exec((err, posts) => {
        if (err) {
          console.log(err);
        }
        return res.status(200).json({ success: true, msg: "삭제 성공" });
      });
    } else {
      return res.status(200).json({ success: false, msg: "존재하지 않음" });
    }
  });
});

export default categoryRouter;
