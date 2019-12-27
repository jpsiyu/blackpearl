import { BIP32Interface } from "bip32";

export class BIP32Node {
  private node: BIP32Interface;

  constructor(node: BIP32Interface) {
    this.node = node;
  }
}
