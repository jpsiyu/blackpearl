import { Visitor } from "@/scripts/web3/visitor";
import ERC20ABI from "@/assets/contract/ERC20.json";
import { Transaction } from "ethereumjs-tx";

class WalletVisitor extends Visitor {
  public loadErc20Contract(address: string) {
    const contract = new this.web3.eth.Contract(ERC20ABI, address);
    return contract;
  }

  public signTx(privKey: Buffer, to: Buffer, value: Buffer, gasPrice: Buffer, nonce: Buffer, data: Buffer): Buffer {
    const tx = new Transaction({
      to,
      value,
      gasPrice,
      nonce,
      data
    })
    tx.sign(privKey)
    return tx.serialize()
  }
}

export const visitor = new WalletVisitor();
