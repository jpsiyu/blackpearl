import { User } from "@/scripts/chat/user";

export class Default {
  public chatUser: User;

  constructor() {
    this.chatUser = new User();
  }
}
