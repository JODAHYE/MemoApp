import mongoose from "mongoose";
const { Schema } = mongoose;
const categorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
const Category = mongoose.model("Category", categorySchema);
export default Category;
