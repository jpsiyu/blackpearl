import { Visitor } from '@/scripts/shh/visitor';
import store from '@/store';
import { Message } from '@/scripts/message/message';
import { Private } from '@/scripts/contact/private';

export class SHH {
  public visitor: Visitor;
  private symPasswd: string = 'apple&banana';
  private symKeyID: string = '';

  constructor() {
    this.visitor = new Visitor();
  }

  public async init() {
    await this.visitor.initWeb3();
  }

  public async startSubscribe(topics: string[]) {
    this.symKeyID = await this.visitor.web3.shh.generateSymKeyFromPassword(this.symPasswd);

    for (const topic of topics) {
      const options: any = {
        symKeyID: this.symKeyID,
        topics: [topic],
      };
      this.visitor.web3.shh.subscribe('messages', options,
        (error: Error, message: any, subscription: any) => {
          this.rece(error, message, subscription);
        },
      );
    }
  }

  public startPrivSubscribe(keyPair: string) {
    const options = {
      privateKeyID: keyPair,
    };
    this.visitor.web3.shh.subscribe('messages', options,
      (error: Error, message: any, subscription: any) => {
        this.recePriv(error, message, subscription);
      },
    );
  }

  public async send(topic: string, message: Message) {
    const hash = await this.visitor.web3.shh.post({
      symKeyID: this.symKeyID,
      topic,
      powTime: this.visitor.powTime,
      powTarget: this.visitor.powTime,
      payload: this.visitor.web3.utils.utf8ToHex(JSON.stringify(message)),
      ttl: this.visitor.ttl,
    });
  }

  public async sendPriv(pubKey: string, message: Message) {
    const hash = await this.visitor.web3.shh.post({
      pubKey,
      payload: this.visitor.web3.utils.utf8ToHex(JSON.stringify(message)),
      powTime: this.visitor.powTime,
      powTarget: this.visitor.powTime,
      topic: '',
      ttl: this.visitor.ttl,
    });
  }

  public rece(error: Error, message: any, subscription: any) {
    if (!message) {
      return;
    }
    const msgHex: string = message.payload;
    const msgStr: string = this.visitor.web3.utils.hexToUtf8(msgHex);
    const msg: Message = JSON.parse(msgStr);
    store.commit('pushMessage', msg);
  }

  public recePriv(error: Error, message: any, subscription: any) {
    if (!message) {
      return;
    }
    const msgHex: string = message.payload;
    const msgStr: string = this.visitor.web3.utils.hexToUtf8(msgHex);
    const msg: Message = JSON.parse(msgStr);
    msg.chatID = msg.pubKey;
    store.commit('pushMessage', msg);
    this.addPriv(msg);
  }

  private addPriv(msg: Message) {
    const priv: Private = new Private(msg.pubKey, msg.sender, msg.pubKey);
    store.commit('addPrivate', priv);
  }
}
