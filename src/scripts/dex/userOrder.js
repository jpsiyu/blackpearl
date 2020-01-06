import BigNumber from 'bignumber.js'

class UserOrder {
  constructor(order) {
    this.order = order
    this.tokenGet = this.order.returnValues[0]
    this.amountGet = this.order.returnValues[1]
    this.tokenGive = this.order.returnValues[2]
    this.amountGive = this.order.returnValues[3]
    this.expires = this.order.returnValues[4]
    this.clientNonce = this.order.returnValues[5]
    this.seller = this.order.returnValues[6]
  }

  isBuy() {
    const ethAddr = '0x0000000000000000000000000000000000000000'
    return this.tokenGet !== ethAddr
  }

  price() {
    let price = this.isBuy()
      ? BigNumber(this.amountGive).dividedBy(BigNumber(this.amountGet))
      : BigNumber(this.amountGet).dividedBy(BigNumber(this.amountGive))
    return price
  }

  amount() {
    let amount = this.isBuy()
      ? BigNumber(this.amountGet)
      : BigNumber(this.amountGive)
    return amount
  }

}

export default UserOrder