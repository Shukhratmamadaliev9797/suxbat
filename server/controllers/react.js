const mongoose = require("mongoose");
const React = require("../model/React");
const User = require("../model/User");

exports.reactPost = async (req, res) => {
  try {
    const { postId, react } = req.body;
    const check = await React.findOne({
      postRef: postId,
      reactBy: mongoose.Types.ObjectId(req.user.id),
    });
    if (check == null) {
      const newReact = new React({
        react: react,
        postRef: postId,
        reactBy: req.user.id,
      });
      await newReact.save();
      res.status(200).json({ message: "Reacted" });
    } else {
      if (check.react == react) {
        await React.findByIdAndRemove(check._id);
        res.status(200).json({ message: "Removed" });
      } else {
        await React.findByIdAndUpdate(check._id, { react: react });
        res.status(200).json({ message: "Updated" });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getReacts = async (req, res) => {
  try {
    const reactsArray = await React.find({ postRef: req.params.id });

    const newReacts = reactsArray.reduce((group, react) => {
      let key = react["react"];
      group[key] = group[key] || [];
      group[key].push(react);
      return group;
    }, {});

    const reacts = [
      { react: "Like", count: newReacts.Like ? newReacts.Like.length : 0 },
      { react: "Love", count: newReacts.Love ? newReacts.Love.length : 0 },
      { react: "Haha", count: newReacts.Haha ? newReacts.Haha.length : 0 },
      { react: "Sad", count: newReacts.Sad ? newReacts.Sad.length : 0 },
      { react: "Wow", count: newReacts.Wow ? newReacts.Wow.length : 0 },
      { react: "Angry", count: newReacts.Angry ? newReacts.Angry.length : 0 },
    ];

    const check = await React.findOne({
      postRef: req.params.id,
      reactBy: req.user.id,
    });

    const user = await User.findById(req.user.id);
    const checkSaved = user?.savedPosts.find(
      (post) => post.post.toString() == req.params.id
    );

    res.status(200).json({
      reacts,
      check: check?.react,
      total: reactsArray.length,
      checkSaved: checkSaved ? true : false,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
