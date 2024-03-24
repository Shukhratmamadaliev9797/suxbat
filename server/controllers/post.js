const Post = require("../model/Post");
const User = require("../model/User");

exports.createPost = async (req, res) => {
  try {
    const post = await new Post(req.body).save();
    await post.populate(
      "user",
      "first_name last_name cover picture username gender"
    );
    res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getAllPost = async (req, res) => {
  try {
    const followingTemp = await User.findById(req.user.id).select("following");
    const following = followingTemp.following;
    const followingPosts = await Post.find({ user: { $in: following } }) // using $in operator
      .populate("user", "first_name last_name picture username cover gender")
      .populate("comments.commentBy", "first_name last_name picture username")
      .populate("group", "title description cover owner")
      .sort({ createdAt: -1 });

    const userPosts = await Post.find({ user: req.user.id })
      .populate("user", "first_name last_name picture username cover gender")
      .populate("comments.commentBy", "first_name last_name picture username")
      .populate("group", "title description cover owner")
      .sort({ createdAt: -1 });
    followingPosts.push(...[...userPosts]);
    followingPosts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    res.json(followingPosts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.comment = async (req, res) => {
  try {
    const { comment, image, postId } = req.body;
    const newComments = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            comment: comment,
            image: image,
            commentBy: req.user.id,
            commentAt: new Date(),
          },
        },
      },
      { new: true }
    ).populate("comments.commentBy", "picture first_name last_name username");

    res.status(200).json(newComments.comments);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.savePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const user = await User.findById(req.user.id);
    const check = user?.savedPosts?.find(
      (post) => post.post.toString() == postId
    );

    if (check) {
      await User.findByIdAndUpdate(req.user.id, {
        $pull: { savedPosts: { _id: check._id } },
      });
    } else {
      await User.findByIdAndUpdate(req.user.id, {
        $push: { savedPosts: { post: postId, savedAt: new Date() } },
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
