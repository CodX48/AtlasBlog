import mongoose, { Schema } from "mongoose";


const UserSchema = new Schema({
  UserName: {type: String, required: true},
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Posts: [{ type: Schema.Types.ObjectId, ref: "Blogs" }],
  Friends: [{ type: Schema.Types.ObjectId, ref: "Users" }], // if you want friends to be users too
});

export const User = mongoose.model("Users", UserSchema);
