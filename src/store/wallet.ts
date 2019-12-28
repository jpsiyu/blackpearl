import { BIP32Node } from "@/scripts/wallet/bip32Node";
import { Coin } from "@/scripts/wallet/coin";

class WalletState {
  public accounts: BIP32Node[] = [];
  public currentAcc: BIP32Node | null = null;
  public coins: Coin[] = [];
  public currentCoin: Coin | null = null;
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
    }
  },
  actions: {},
}