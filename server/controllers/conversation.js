const Conversation = require("../model/Conversation");
const Message = require("../model/Message");

exports.createConversations = async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (error) {
    res.status(500).json(err);
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
