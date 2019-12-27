import { BIP32Interface } from "bip32";

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
}
