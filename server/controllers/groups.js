const Group = require("../model/Group");

exports.createGroup = async (req, res) => {
  try {
    const group = await new Group(req.body).save();

    res.status(200).json({ message: "Group created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.listYourGroups = async (req, res) => {
  try {
    const yourGroups = await Group.find({ owner: req.params.id })
      .populate("owner", "first_name last_name picture cover username")
      .populate("members", "first_name last_name picture cover username");
    const joinedGroups = await Group.find({ members: req.params.id })
      .populate("owner", "first_name last_name picture cover username")
      .populate("members", "first_name last_name picture cover username");
    res
      .status(200)
      .json({ yourGroups: yourGroups, joinedGroups: joinedGroups });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.searchGroup = async (req, res) => {
  try {
    const { searchName } = req.body;

    const results = await Group.find({
      $text: { $search: searchName },
    }).populate("members", "first_name last_name picture cover username");
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.joinGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.body.groupId);
    if (!group.members.includes(req.user.id)) {
      await group.updateOne({ $push: { members: req.user.id } });

      res.json({ message: "You joined group" });
    } else {
      return res.status(500).json({ message: "Already joined." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.leaveGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.body.groupId);
    if (group.members.includes(req.user.id)) {
      await group.updateOne({ $pull: { members: req.user.id } });

      res.json({ message: "You left group" });
    } else {
      return res.status(500).json({ message: "Already left." });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.findGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id)
      .populate("owner", "first_name last_name picture cover username")
      .populate("members", "first_name last_name picture cover username")
      .populate("posts", "type text images user background comments")
      .populate({
        path: "posts",
        populate: {
          path: "user",
          select: "first_name last_name picture username cover",
        },
      })
      .populate({
        path: "posts",
        populate: {
          path: "comments",
          populate: {
            path: "commentBy",
            select: "first_name last_name picture username",
          },
        },
      });
    if (group) {
      res.status(200).json(group);
    } else {
      res.status(401).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addPostGroup = async (req, res) => {
  try {
    const { groupId, postId } = req.body;
    const group = await Group.findById(groupId);
    if (!group.posts.includes(postId)) {
      await group.updateOne({ $push: { posts: postId } });

      res.json({ message: "Discussion created" });
    } else {
      return res.status(500).json({ message: "Discussion created" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
