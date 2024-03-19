const Conversation = require("../model/Conversation");
const Message = require("../model/Message");

exports.createConversations = async (req, res) => {
  try {
    // Check if conversation already exists between sender and receiver
    const existingConversation = await Conversation.findOne({
      members: {
        $all: [req.body.senderId, req.body.receiverId],
      },
    });

    if (existingConversation) {
      // Conversation already exists, send the existing conversation data
      res.status(200).json(existingConversation);
      return;
    }

    // Conversation doesn't exist, create a new one
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });

    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.listConversations = async (req, res) => {
  try {
    const conversations = await Conversation.find({
      members: { $in: [req.params.id] },
    });

    const conversationsWithLastMessage = await Promise.all(
      conversations.map(async (conversation) => {
        const lastMessage = await Message.findOne({
          conversationId: conversation._id,
        })
          .sort({ createdAt: -1 })
          .populate("sender", "picture first_name")
          .exec();

        return {
          conversation,
          lastMessage,
        };
      })
    );

    res.status(200).json(conversationsWithLastMessage);
  } catch (error) {
    res.status(500).json(error);
  }
};
