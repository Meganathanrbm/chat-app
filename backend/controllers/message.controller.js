import Conversation from "../db/models/conversation.model.js";
import Message from "../db/models/message.model.js";
import User from "../db/models/user.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body; // from the body payload
    const { id: receiverId } = req.params; // from the params dynamic route
    const senderId = req.user._id; // from the protectRoute middleware

    // find the conversation
    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    // if conversation doent exist , create a new conversation
    if (!conversation) {
      conversation = new Conversation({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });
    if (newMessage) {
      conversation.messages.push(newMessage);
    }
    // chatlist
    const sender = await User.findOne({ _id: senderId });
    const receiver = await User.findOne({ _id: receiverId });

    // filter the chats
    const senderChatList = sender.chatList.filter(
      (user) => user.emailId !== receiver.emailId
    );
    const receiverChatList = receiver.chatList.filter(
      (user) => user.emailId !== sender.emailId
    );
    sender.chatList = [
      {
        _id: receiver._id,
        fullname: receiver.fullname,
        emailId: receiver.emailId,
        gender: receiver.gender,
        createdAt: receiver.createdAt,
        profilePic: receiver.profilePic,
      },
      ...senderChatList,
    ];
    receiver.chatList = [
      {
        _id: sender._id,
        fullname: sender.fullname,
        emailId: sender.emailId,
        gender: sender.gender,
        createdAt: sender.createdAt,
        profilePic: sender.profilePic,
      },
      ...receiverChatList,
    ];

    await Promise.all([
      newMessage.save(),
      conversation.save(),
      sender.save(),
      receiver.save(),
    ]);

    // socket io functionality
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      //  io.to(<socketId>).emit() is used to send event to specifiy user
      io.to(receiverSocketId).emit("newMessage", newMessage);
      io.to(receiverSocketId).emit("newChatList", receiver.chatList);
    }
    res.status(201).json({
      code: 201,
      data: newMessage,
      message: "message send successfully",
    });
  } catch (error) {
    console.log("send message failed", error);
    res.status(500).json({ code: 500, error: "Internal Server Error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChat } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChat] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json({ code: 200, data: [] });
    }
    const messages = conversation.messages;
    return res.status(200).json({ code: 200, data: messages });
  } catch (error) {
    console.log("get message failed", error);
    res.status(500).json({ code: 500, error: "Internal Server Error" });
  }
};

export const getLastMessage = async (req, res) => {
  try {
    const { id: userToChat } = req.params;
    const senderId = req.user._id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChat] },
    }).populate("messages");
    if (!conversation) {
      return res.status(200).json({ code: 200, data: [] });
    }
    const lastMessage = conversation.messages[conversation.messages.length - 1];

    return res.status(200).json({ code: 200, data: lastMessage });
  } catch (error) {
    console.log("get last message failed", error);
    res.status(500).json({ code: 500, error: "Internal Server Error" });
  }
};

export const seenMessage = async (req, res) => {
  try {
    const { id: messageId } = req.params;
    const updatedMessage = await Message.findByIdAndUpdate(
      messageId,
      { seen: true },
      { new: true } // Return the updated document
    );
    if (!updatedMessage) {
      return res.status(500).json({
        code: 500,
        message: "Internal Server Error!",
      });
    }
    return res.status(200).json({
      code: 200,
      message: "Message marked as seen!",
    });
  } catch (error) {
    console.error("Error in seenMessage:", error);
    return res.status(500).json({ code: 500, error: "Internal Server Error" });
  }
};
