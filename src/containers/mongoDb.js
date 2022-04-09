import mongoose from "mongoose";
import config from "../config";
(async () => {
  try {
    const db = await mongoose.connect(config.mongoRemote.cnxStr);
    await console.log("DB connected");
  } catch (err) {
    console.log(err);
  }
})();

class mongoContainer {
  constructor(modelSchema) {
    this.model = modelSchema;
  }
  createChat = async () => {
    const chat = await new this.model();
    try {
      await chat.save();
      console.log("Chat created", chat);
    } catch (err) {
      console.log(err);
    }
  };
  saveMessage = async (data) => {
    const chat = await this.model.findById({ _id: "6250c34f14d8cc41f482c523" });
    console.log(chat.messages);
    chat.messages.push(data);
    try {
      await chat.save();
      console.log(`Mensaje de ${data.id} agregado. `);
    } catch (err) {
      console.log(err);
    }
  };

  getMessages = async () => {
    const chat = await this.model.findById({ _id: "6250c34f14d8cc41f482c523" });
    const messages = chat.messages
    const mapMessages = messages.map((message) => ({
      user: {
        id: message.id,
        name: message.name,
        lastname: message.lastname,
        age: message.age,
        alias: message.alias,
        avatar: message.avatar,
      },
      content: {
        message: message.message,
      },
    }));
    console.log(mapMessages);
    return mapMessages
  };

  // saveMessage = async (data) => {
  //     console.log("data recibied", data);
  //     const chat = await new this.model(data);
  //     console.log(chat);
  //     chat.messages.push(data);
  //     try {
  //       await chat.save();
  //       console.log("Message saved", chat);
  //     } catch (err) {
  //       console.log(err);
  //     }
  // }
}

export default mongoContainer;
