import Web3 from 'web3';

export class Visitor {
  public web3: Web3;
  public powTime: number;
  public powTarget: number;
  public ttl: number;
  public nodeUrl: string;

  constructor() {
    this.web3 = new Web3();
    this.powTime = 3;
    this.powTarget = 0.5;
    this.ttl = 100;
    // this.nodeUrl = "ws://localhost:8546";
    this.nodeUrl = 'ws://192.168.0.111:8546';
  }

  public async initWeb3() {
    this.web3.setProvider(new Web3.providers.WebsocketProvider(this.nodeUrl));
    await this.web3.eth.net.isListening();
  }


  public async newKeyPair(): Promise<string> {
    return this.web3.shh.newKeyPair();
  }

  public async getPubFromKeyPair(keyPair: string): Promise<string> {
    return this.web3.shh.getPublicKey(keyPair);
  }

  public async isKeyPairValid(keyPair: string): Promise<boolean> {
    try {
      const res = await this.web3.shh.hasKeyPair(keyPair);
      return Promise.resolve(res);
    } catch (err) {
      return Promise.resolve(false);
    }
  }
}
