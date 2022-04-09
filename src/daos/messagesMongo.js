import chatSchema from '../../models/chatSchema';
import mongoContainer from '../containers/mongoDb';
const chatApi = new mongoContainer(chatSchema.model);

module.exports = chatApi;