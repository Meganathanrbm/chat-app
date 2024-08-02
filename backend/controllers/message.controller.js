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
    // let senderChatList = new Set(sender.chatList?.map((user) => user._id));
    let sendermp = {};
    let receivermp = {};
    // filter the unique chats
    let senderChatList = sender.chatList.filter((user) => {
      sendermp[user.emailId] = (sendermp[user.emailId] || 0) + 1;
      return user.emailId !== receiver.emailId && sendermp[user.emailId] <= 1;
    });
    let receiverChatList = receiver.chatList.filter((user) => {
      receivermp[user.emailId] = (receivermp[user.emailId] || 0) + 1;
      return user.emailId !== sender.emailId && sendermp[user.emailId] <= 1;
    });
    senderChatList = [
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
    receiverChatList = [
      {
        _id: sender._id,
        fullname: sender.fullname,
        emailId: sender.emailId,
        gender: sender.gender,
        createdAt: sender.createdAt,
        profilePic: receiver.profilePic,
      },
      ...receiverChatList,
    ];
    sender.chatList = senderChatList;
    receiver.chatList = receiverChatList;
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
      // io.to(receiverSocketId).emit("newChatList", receiverChatList);
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
