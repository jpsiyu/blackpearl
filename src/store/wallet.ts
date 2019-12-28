import { BIP32Node } from "@/scripts/wallet/bip32Node";
import { Coin } from "@/scripts/wallet/coin";
import { INetwork } from "@/scripts/wallet/network";

class WalletState {
  public accounts: BIP32Node[] = [];
  public currentAcc: BIP32Node | null = null;
  public coins: Coin[] = [];
  public currentCoin: Coin | null = null;
  public networks: INetwork[] = [];
  public currentNet: INetwork | null = null;
}

export default {
  namespaced: true,
  state: new WalletState(),
  mutations: {
    setAccounts: (state: WalletState, payload: BIP32Node[]) => {
      state.accounts = payload;
    },
    setCurrentAcc: (state: WalletState, payload: BIP32Node) => {
      state.currentAcc = payload;
    },
    setCoins: (state: WalletState, payload: Coin[]) => {
      state.coins = payload;
    },
    setCurrentCoin: (state: WalletState, payload: Coin) => {
      state.currentCoin = payload;
    },
    setNetworks: (state: WalletState, payload: INetwork[]) => {
      state.networks = payload;
    },
    setCurrentNet: (state: WalletState, payload: INetwork) => {
      state.currentNet = payload;
    }
  },
  actions: {}
};
