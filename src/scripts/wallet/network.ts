import { Coin } from "@/scripts/wallet/coin";

export interface INetwork {
  netID: number;
  name: string;
  color: string;
  url: string;
  coins: Coin[];
}
