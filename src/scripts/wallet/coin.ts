export class Coin {
  public code: string;
  public address: string;
  public isToken: boolean;
  public decimals: number;

  constructor(
    code: string,
    address: string,
    isToken: boolean,
    decimals?: number
  ) {
    this.code = code;
    this.address = address;
    this.isToken = isToken;
    this.decimals = decimals === undefined ? 18 : decimals;
  }
}
