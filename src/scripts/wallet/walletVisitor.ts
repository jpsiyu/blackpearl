import { Visitor } from "@/scripts/web3/visitor";
import ERC20ABI from "@/assets/contract/ERC20.json";
import { Transaction } from "ethereumjs-tx";

class WalletVisitor extends Visitor {
  private gasLimit: number = 50000;

  public loadErc20Contract(address: string) {
    const contract = new this.web3.eth.Contract(ERC20ABI, address);
    return contract;
  }

  public signTx(
    chain: string,
    privKey: Buffer,
    to: string,
    value: number,
    gasPrice: number,
    nonce: number,
    data: string
  ): string {
    const tx = new Transaction(
      {
        to,
        value,
        gasPrice,
        gasLimit: this.gasLimit,
        nonce,
        data
      },
      { chain: chain }
    );
    tx.sign(privKey);
    return "0x" + tx.serialize().toString("hex");
  }
}

export const visitor = new WalletVisitor();
