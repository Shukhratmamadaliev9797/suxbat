const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      text: true,
    },
    last_name: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      text: true,
    },
    username: {
      type: String,
      required: [true, "username is required"],
      trim: true,
      text: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    picture: {
      type: String,
      default:
        "https://res.cloudinary.com/dbusuq5am/image/upload/v1665957987/upload/images/default-profile-pic-e1513291410505_mjgmjz.jpg",
    },

    cover: {
      type: String,
      trim: true,
    },
    gender: {
      type: String,
      required: [true, "Gender is required"],
    },
    bYear: {
      type: Number,
      required: true,
      trim: true,
    },
    bMonth: {
      type: Number,
      required: true,
      trim: true,
    },
    bDay: {
      type: Number,
      required: true,
      trim: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    friends: [{ type: ObjectId, ref: "User" }],
    following: [{ type: ObjectId, ref: "User" }],
    followers: [{ type: ObjectId, ref: "User" }],
    requests: [{ type: ObjectId, ref: "User" }],
    story: { type: Array },
    setting: {
      darkMode: { type: Boolean, default: false },
    },
    savedPosts: [
      {
        post: {
          type: ObjectId,
          ref: "Post",
        },
        savedAt: {
          type: Date,
          required: true,
        },
      },
    ],
    search: [
      {
        user: {
          type: ObjectId,
          ref: "User",
        },
        createdAt: { type: Date, required: true },
      },
    ],
    details: {
      bio: {
        type: String,
        default: "Add your bio",
      },
      job: {
        type: String,
        default: "Add your job",
      },
      workplace: {
        type: String,
        default: "Add your workplace",
      },
      highSchool: {
        type: String,
        default: "Add your high school",
      },
      college: {
        type: String,
        default: "Add your college",
      },
      university: {
        type: String,
        default: "Add your university",
      },
      address: {
        type: String,
        default: "Add your address",
      },
      country: {
        type: String,
        default: "Add your country",
      },
      relationship: {
        type: String,
        enum: ["Single", "In a relationship", "Married", "Divorced"],
      },
      instagram: {
        type: String,
        default: "Add your instagram",
      },
      linkedin: {
        type: String,
        default: "Add your linkedin",
      },

      mobileNumber: {
        type: String,
        default: "Add your mobile number",
      },
      homeNumber: {
        type: String,
        default: "Add your home number",
      },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
