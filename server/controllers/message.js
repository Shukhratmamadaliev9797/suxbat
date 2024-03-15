const Message = require("../model/Message");
const mongoose = require("mongoose");

exports.createMessages = async (req, res) => {
  try {
    const { conversationId, text, sender } = req.body;
    const newMessage = new Message({
      conversationId,
      sender: mongoose.Types.ObjectId(sender), // Convert senderId to ObjectId
      text,
    });

    const savedMessage = await newMessage.save();

    // Populate the sender field in the savedMessage
    await savedMessage.populate("sender", "picture first_name");

    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.listMessages = async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.id,
    }).populate("sender", "picture first_name");
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(err);
  }
};
