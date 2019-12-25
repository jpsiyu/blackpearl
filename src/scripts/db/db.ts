import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';
import { Default } from './default';
import { User } from '@/scripts/chat/user'

export class DB {
  private db: low.LowdbSync<any>;

  constructor() {
    const adapter = new LocalStorage('db');
    this.db = low(adapter);

    const dbDefault: Default = new Default();
    this.db.defaults(dbDefault);

  }

  public setChatUser(user: User) {
    this.db.set("chatUser", user).write();
  }
}