import BigNumber from "bignumber.js";

class UserOrder {
  private order: any;
  private tokenGet: number | string;
  private amountGet: number | string;
  private tokenGive: number | string;
  private amountGive: number | string;
  private expires: number | string;
  private clientNonce: number | string;
  private seller: number | string;

  constructor(order: any) {
    this.order = order;
    this.tokenGet = this.order.returnValues[0];
    this.amountGet = this.order.returnValues[1];
    this.tokenGive = this.order.returnValues[2];
    this.amountGive = this.order.returnValues[3];
    this.expires = this.order.returnValues[4];
    this.clientNonce = this.order.returnValues[5];
    this.seller = this.order.returnValues[6];
  }

  isBuy() {
    const ethAddr = "0x0000000000000000000000000000000000000000";
    return this.tokenGet !== ethAddr;
  }

  price() {
    let price = this.isBuy()
      ? new BigNumber(this.amountGive).dividedBy(this.amountGet)
      : new BigNumber(this.amountGet).dividedBy(this.amountGive);
    return price;
  }

  amount() {
    let amount = this.isBuy()
      ? new BigNumber(this.amountGet)
      : new BigNumber(this.amountGive);
    return amount;
  }
}

export default UserOrder;
