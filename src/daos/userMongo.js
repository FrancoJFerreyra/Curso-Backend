import userModel from '../../models/userSchema';
import mongoContainer from '../containers/mongoDb';
const userApi = new mongoContainer(userModel);

module.exports = userApi;