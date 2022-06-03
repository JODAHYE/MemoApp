import dotenv from "dotenv";
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcrypt";

const userRouter = express.Router();
const saltRounds = 10;
dotenv.config();

userRouter.post("/login", (req, res) => {
  User.findOne({ id: req.body.id }).exec((err, user) => {
    if (err) return res.status(500).json({ success: false, msg: err });
    if (!user)
      return res
        .status(200)
        .json({ success: false, msg: "일치하지 않는 정보" });
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (!result)
        return res
          .status(200)
          .json({ success: false, msg: "일치하지 않는 정보" });
      const accessToken = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        algorithm: "HS256",
        expiresIn: "2h",
      });
      return res.status(200).json({ success: true, accessToken });
    });
  });
});

userRouter.post("/signup", (req, res) => {
  User.findOne({ id: req.body.id }).exec((err, user) => {
    if (err) return res.status(500).json({ msg: err });
    if (!user) {
      const { id, password } = req.body;
      bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          new User({
            id,
            password: hash,
          }).save((err, user) => {
            if (err) return res.status(500).json({ msg: err });
            return res
              .status(201)
              .json({ success: true, msg: "회원가입 성공", user });
          });
        });
      });
    } else {
      return res
        .status(200)
        .json({ success: false, msg: "이미 존재하는 ID", user });
    }
  });
});

export default userRouter;
