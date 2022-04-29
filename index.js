import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import user from "./routes/user.js";
import post from "./routes/post.js";
import category from "./routes/category.js";
import cors from "cors";
import path from "path";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("연결"))
  .catch((e) => console.log(e));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", user);
app.use("/post", post);
app.use("/category", category);
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build")); // set static folder
  //returning frontend for any route other than api
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Example app listening at ${PORT}`);
});
