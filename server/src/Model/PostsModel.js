import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema({
  Poster: { type: Schema.Types.ObjectId, ref: "Users", required: true }, // <-- reference to User
  Likes: { type: [Schema.Types.ObjectId], ref: "Users", default:[] },
  Comments: { type: [Object], default: [] },
  Date: { type: Date, default: Date.now },
  Content: { type: String, required: true },
});

export const Blogs = mongoose.model("Blogs", BlogSchema);
