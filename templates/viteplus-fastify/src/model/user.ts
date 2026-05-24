import BaseModel from './base';
import { UserTab } from '../types/database';

class Model extends BaseModel<UserTab> {
  list(email?: string) {
    const model = this.queryBuilder;
    if (email) {
      model.whereLike('email', `%${email}%`);
    }
    return model.orderBy('create_time', 'desc').select('*');
  }
}

const UserModel = new Model('soup_user_tab');
export default UserModel;
