import { Chat } from "@/scripts/app/chat";

export class App {
  public chat: Chat;

  constructor() {
    this.chat = new Chat();
  }
}
