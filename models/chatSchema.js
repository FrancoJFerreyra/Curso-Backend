import { Schema, model } from "mongoose";
import message from './message'
const chatSchema = new Schema({
  messages : [message.schema]
},
{
  timestamps : true,
  versionKey : false,
});

module.exports.model = model('chat', chatSchema)