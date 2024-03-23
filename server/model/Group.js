const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define a schema for the group
const groupSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cover: {
    type: String,
    default:
      "https://res.cloudinary.com/djdbhmqqd/image/upload/v1711065137/Assests/power-of-facebook-groups_cgt7bj.jpg",
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User", // Assuming you have a User model
  },
  members: [
    {
      type: Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
    },
  ],
  admins: [
    {
      type: Schema.Types.ObjectId,
      ref: "User", // Assuming you have a User model
    },
  ],
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],

  created_at: {
    type: Date,
    default: Date.now,
  },
});

groupSchema.index({ title: "text" });

// Create a model using the schema
const Group = mongoose.model("Group", groupSchema);

module.exports = Group;
