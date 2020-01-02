export interface ICoin {
  code: string;
  address: string;
  isToken: boolean;
  decimals: number;
}

export interface INetwork {
  netID: number;
  name: string;
  color: string;
  url: string;
  coins: ICoin[];
}
