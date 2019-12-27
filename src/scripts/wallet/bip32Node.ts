import { BIP32Interface } from "bip32";
import * as etherUtil from "ethereumjs-util";

export class BIP32Node {
  private node: BIP32Interface;

  constructor(node: BIP32Interface) {
    this.node = node;
  }

  public get publicKey(): string {
    return this.node.publicKey.toString("hex");
  }

  public get privateKey(): string {
    if (this.node.privateKey) {
      return this.node.privateKey.toString("hex");
    } else {
      return "";
    }
  }

  public get address(): string {
    return etherUtil.pubToAddress(this.node.publicKey, true).toString("hex");
  }

  public get checksumAddress(): string {
    return etherUtil.toChecksumAddress(this.address);
  }
}
