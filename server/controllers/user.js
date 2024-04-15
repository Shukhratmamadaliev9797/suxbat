const jwt = require("jsonwebtoken");
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require("../helpers/validation");

const User = require("../model/User");
const bcrypt = require("bcrypt");
const { generateToken } = require("../helpers/token");
const { sendVerificationEmail, sendResetCode } = require("../helpers/mailer");
const Code = require("../model/Code");
const generateCode = require("../helpers/generateCode");
const Post = require("../model/Post");
const mongoose = require("mongoose");

exports.register = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    //validate email format
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email address" });
    }

    //check email exist or not
    const checkEmail = await User.findOne({ email });

    if (checkEmail) {
      return res.status(400).json({
        message: "This email already exists, use different email address",
      });
    }
    //validate character size
    if (!validateLength(first_name, 3, 15)) {
      return res
        .status(400)
        .json({ message: "First name must be between 3 and 15 characters" });
    }
    if (!validateLength(last_name, 3, 15)) {
      return res
        .status(400)
        .json({ message: "Last name must be between 3 and 15 characters" });
    }
    if (!validateLength(password, 6, 40)) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }
    //bcrypt password
    const bcryptedPassword = await bcrypt.hash(password, 12);

    //validate username
    let tempUsername = first_name + last_name;
    let newUsername = await validateUsername(tempUsername);

    //create new userf
    const user = await new User({
      first_name,
      last_name,
      bDay,
      password: bcryptedPassword,
      username: newUsername,
      bYear,
      email,
      bMonth,
      gender,
    }).save();

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      picture: user.picture,
      friends: user.friends,
      followers: user.followers,
      following: user.following,
      setting: user.setting,
      message: "Register Success! Please verify your email.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.activateAccount = async (req, res) => {
  try {
    const validUser = req.user.id;
    const { token } = req.body;
    const user = jwt.verify(token, process.env.TOKEN_SECRET_PASSWORD);
    const check = await User.findById(user.id);
    if (validUser !== user.id) {
      return res
        .status(400)
        .json({ message: "Authorization failed, Account details don't match" });
    }
    if (check.verified == true) {
      return res
        .status(400)
        .json({ message: "This email is already verified" });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(200)
        .json({ message: "The email verified and activated successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "The incorrect email address" });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({ message: "The incorrect password" });
    }
    const token = generateToken({ id: user._id.toString() }, "7d");
    res.send({
      id: user._id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      picture: user.picture,
      friends: user.friends,
      followers: user.followers,
      following: user.following,
      setting: user.setting,
      message: "Register Success! Please verify your email.",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendVerificationEmail = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (user.verified === true) {
      return res
        .status(400)
        .json({ message: "This account is already activated " });
    }
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      "30m"
    );

    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    return res
      .status(200)
      .json({ message: "Email Verification Link has been sent" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findUser = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select("-password");
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).json({ message: "Email not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.sendResetPasswordCode = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email }).select("-password");
    await Code.findOneAndRemove({ user: user._id });
    const code = generateCode(5);

    const saveCode = await new Code({ code, user: user._id }).save();
    sendResetCode(user.email, user.first_name, code);
    res.status(200).json({ message: "Password reset code has been sent" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.validateResetCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const user = await User.findOne({ email });
    const DbCode = await Code.findOne({ user: user._id });
    console.log(user, DbCode);
    if (code !== DbCode.code) {
      return res.status(400).json({ message: "Verification code is wrong." });
    }
    return res.status(200).json({ message: "Verified" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

exports.changePassword = async (req, res) => {
  const { email, password } = req.body;
  const cryptedPassword = await bcrypt.hash(password, 12);
  await User.findOneAndUpdate({ email }, { password: cryptedPassword });
  return res.status(200).json({ message: "Password changed successfully" });
};

exports.getProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findById(req.user.id);
    const profile = await User.findOne({ username }).select("-password");

    const friendship = {
      friends: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    };
    if (!profile) {
      res.status(404).json({ message: "Profile Not Found" });
      return;
    }
    if (
      user.friends.includes(profile._id) &&
      profile.friends.includes(user._id)
    ) {
      friendship.friends = true;
    }
    if (user.following.includes(profile._id)) {
      friendship.following = true;
    }
    if (user.requests.includes(profile._id)) {
      friendship.requestReceived = true;
    }
    if (profile.requests.includes(user._id)) {
      friendship.requestSent = true;
    }
    const posts = await Post.find({ user: profile._id })
      .populate("user")
      .populate(
        "comments.commentBy",
        "first_name last_name picture username commentAt"
      )
      .sort({ createdAt: -1 });
    await profile.populate("friends followers", "first_name last_name picture");
    res.status(200).json({ profile, posts, friendship });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfilePicture = async (req, res) => {
  try {
    const { url } = req.body;
    const update = await User.findByIdAndUpdate(req.user.id, { picture: url });
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProfileCover = async (req, res) => {
  try {
    const { url } = req.body;
    const update = await User.findByIdAndUpdate(req.user.id, { cover: url });
    res.status(200).json({ url });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDetails = async (req, res) => {
  try {
    const {
      bio,
      first_name,
      last_name,
      password,
      bYear,
      bMonth,
      bDay,
      address,
      country,
      relationship,
      highSchool,
      college,
      university,
      job,
      workplace,
      homeNumber,
      mobileNumber,
      instagram,
      linkedin,
    } = req.body;

    const user = await User.findById(req.user.id);
    if (user) {
      user.first_name = first_name || user.first_name;
      user.last_name = last_name || user.last_name;
      user.details.bio = bio || user.details.bio;
      user.bYear = bYear || user.bYear;
      user.bMonth = bMonth || user.bMonth;
      user.bDay = bDay || user.bDay;
      user.details.address = address || user.details.address;
      user.details.country = country || user.details.country;
      user.details.relationship = relationship || user.details.relationship;
      user.details.highSchool = highSchool || user.details.highSchool;
      user.details.college = college || user.details.college;
      user.details.university = university || user.details.university;
      user.details.job = job || user.details.job;
      user.details.workplace = workplace || user.details.workplace;
      user.details.homeNumber = homeNumber || user.details.homeNumber;
      user.details.mobileNumber = mobileNumber || user.details.mobileNumber;
      user.details.linkedin = linkedin || user.details.linkedin;
      user.details.instagram = instagram || user.details.instagram;
      if (password) {
        user.password = (await bcrypt.hash(password, 12)) || user.password;
      }

      const updatedUser = await user.save();
      return res.status(200).json(updatedUser);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addFriend = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);
      if (
        !receiver.requests.includes(sender._id) &&
        !receiver.friends.includes(sender._id)
      ) {
        await receiver.updateOne({ $push: { requests: sender._id } });
        await receiver.updateOne({ $push: { followers: sender._id } });
        await sender.updateOne({ $push: { following: receiver._id } });
        res.json({ message: "Friend request has been sent" });
      } else {
        return res.status(500).json({ message: "Already requested." });
      }
    } else {
      return req
        .status(500)
        .json({ message: "You can not send request to yourself" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.cancelRequest = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);
      if (
        receiver.requests.includes(sender._id) &&
        !receiver.friends.includes(sender._id)
      ) {
        await receiver.updateOne({ $pull: { requests: sender._id } });
        await receiver.updateOne({ $pull: { followers: sender._id } });
        await sender.updateOne({ $pull: { following: receiver._id } });
        res.json({ message: "Friend request has been cancelled" });
      } else {
        return res.status(500).json({ message: "Already cancelled." });
      }
    } else {
      return req
        .status(500)
        .json({ message: "You can not cancel request to yourself" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.follow = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);
      if (
        !receiver.followers.includes(sender._id) &&
        !sender.following.includes(receiver._id)
      ) {
        await receiver.updateOne({ $push: { followers: sender._id } });
        await sender.updateOne({ $push: { following: receiver._id } });
        res.json({ message: "Followed successfully" });
      } else {
        return res.status(500).json({ message: "Already followed." });
      }
    } else {
      return req
        .status(500)
        .json({ message: "You can not follow to yourself" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.unfollow = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);
      if (
        receiver.followers.includes(sender._id) &&
        sender.following.includes(receiver._id)
      ) {
        await receiver.updateOne({ $pull: { followers: sender._id } });
        await sender.updateOne({ $pull: { following: receiver._id } });
        res.json({ message: "Unfollowed successfully" });
      } else {
        return res.status(500).json({ message: "Already unfollowed." });
      }
    } else {
      return req
        .status(500)
        .json({ message: "You can not unfollow to yourself" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.acceptRequest = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const receiver = await User.findById(req.user.id);
      const sender = await User.findById(req.params.id);
      if (receiver.requests.includes(sender._id)) {
        await receiver.updateOne({
          $push: { friends: sender._id, following: sender._id },
        });
        await sender.updateOne({
          $push: { friends: receiver._id, followers: receiver._id },
        });
        await receiver.updateOne({ $pull: { requests: sender._id } });
        res.json({ message: "Friend request accepted" });
      } else {
        return res.status(500).json({ message: "Already friend." });
      }
    } else {
      return req
        .status(500)
        .json({ message: "You can not accept from yourself" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.unfriend = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const sender = await User.findById(req.user.id);
      const receiver = await User.findById(req.params.id);
      if (
        receiver.friends.includes(sender._id) &&
        sender.friends.includes(receiver._id)
      ) {
        await receiver.update({
          $pull: {
            friends: sender._id,
            following: sender._id,
            followers: sender._id,
          },
        });

        await sender.update({
          $pull: {
            friends: receiver._id,
            following: receiver._id,
            followers: receiver._id,
          },
        });

        res.json({ message: "Removed friend" });
      } else {
        return res.status(500).json({ message: "Already not friend." });
      }
    } else {
      return req
        .status(500)
        .json({ message: "You can not unfriend  yourself" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteRequest = async (req, res) => {
  try {
    if (req.user.id !== req.params.id) {
      const receiver = await User.findById(req.user.id);
      const sender = await User.findById(req.params.id);
      if (receiver.requests.includes(sender._id)) {
        await receiver.update({
          $pull: {
            requests: sender._id,
            followers: sender._id,
          },
        });

        await sender.update({
          $pull: {
            following: receiver._id,
          },
        });

        res.json({ message: "Deleted request" });
      } else {
        return res.status(500).json({ message: "Already deleted." });
      }
    } else {
      return req.status(500).json({ message: "You cannot delete  yourself" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.search = async (req, res) => {
  try {
    const searchTerm = req.params.searchTerm;
    const results = await User.find({ $text: { $search: searchTerm } }).select(
      "first_name last_name username picture"
    );
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addToSearchHistory = async (req, res) => {
  try {
    const { searchUser } = req.body;
    const search = {
      user: searchUser,
      createdAt: new Date(),
    };
    const user = await User.findById(req.user.id);
    const check = user.search.find((x) => x.user.toString() === searchUser);
    if (check) {
      await User.updateOne(
        {
          _id: req.user.id,
          "search._id": check._id,
        },
        {
          $set: { "search.$.createdAt": new Date() },
        }
      );
    } else {
      await User.findByIdAndUpdate(req.user.id, {
        $push: {
          search,
        },
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSearchHistory = async (req, res) => {
  try {
    const results = await User.findById(req.user.id)
      .select("search")
      .populate("search.user", "first_name last_name username picture");
    res.json(results.search);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.removeFromSearch = async (req, res) => {
  try {
    const { searchUser } = req.body;
    await User.updateOne(
      { _id: req.user.id },
      { $pull: { search: { user: searchUser } } }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFriendsPageInfo = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select(
        "first_name last_name picture username friends requests following followers"
      )
      .populate(
        "friends",
        "first_name last_name picture username friends cover"
      )
      .populate(
        "requests",
        "first_name last_name picture username friends cover"
      )
      .populate("following", "first_name last_name picture username friends")
      .populate("followers", "first_name last_name picture username friends")
      .populate({
        path: "friends",
        populate: {
          path: "friends",
          select: "first_name last_name picture username friends",
        },
      });

    const sentRequests = await User.find({
      requests: mongoose.Types.ObjectId(req.user.id),
    }).select("first_name last_name picture username");

    res.json({
      user: user,
      friends: user.friends,
      requests: user.requests,
      following: user.following,
      followers: user.followers,
      sentRequests,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.suggestFriends = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
