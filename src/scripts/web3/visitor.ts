import Web3 from "web3";
import ERC20ABI from "@/assets/contract/ERC20.json";

export class Visitor {
  public web3: Web3;
  private nodeUrl: string;

  constructor() {
    this.web3 = new Web3();
    this.nodeUrl = "";
  }

  public async setNetwork(nodeUrl: string): Promise<boolean> {
    if (this.nodeUrl === nodeUrl) {
      return Promise.resolve(true);
    }
    this.nodeUrl = nodeUrl;
    this.web3.setProvider(new Web3.providers.HttpProvider(nodeUrl));
    const res: boolean = await this.web3.eth.net.isListening();
    return res;
  }

  public loadErc20Contract(address: string) {
    const contract = new this.web3.eth.Contract(ERC20ABI, address);
    return contract;
  }
}
