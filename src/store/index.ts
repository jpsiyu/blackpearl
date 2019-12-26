import Vue from 'vue';
import Vuex from 'vuex';
import { Group } from "@/scripts/contact/group";
import { Private } from "@/scripts/contact/private";
import { Message } from "@/scripts/message/message";
import { User } from "@/scripts/chat/user";

Vue.use(Vuex);

class State {
  public user: User | null = null;
  public chatting: Group | Private | null = null;
  public groups: Group[] = [];
  public privates: Private[] = [];
  public chatLogs: Map<string, Message[]> = new Map<string, Message[]>();
}

export default new Vuex.Store({
  state: new State(),
  mutations: {
    setUser: (state: State, payload: User) => {
      state.user = payload;
    },
    setGroups: (state: State, payload: Group[]) => {
      state.groups = payload;
    },
    setPrivates: (state: State, payload: Private[]) => {
      state.privates = payload;
    },
    addGroup: (state: State, payload: Group) => {
      state.groups.push(payload);
    },
    addPrivate: (state: State, payload: Private) => {
      const targe = state.privates.find((priv: Private) => {
        return priv.pubKey === payload.pubKey;
      })
      if (targe) {
        return
      }
      state.privates.push(payload);
    },
    setChatting: (state: State, payload: Group | Private) => {
      state.chatting = payload;
    },
    pushMessage: (state: State, payload: Message) => {
      let logs = state.chatLogs.get(payload.chatID)
      logs ? logs.push(payload) : logs = [payload]
      state.chatLogs.set(payload.chatID, logs)

      const newMap = new Map<string, Message[]>()
      for (let [key, value] of state.chatLogs) {
        newMap.set(key, value)
      }
      state.chatLogs = newMap;
    }
  },
  actions: {
  },
  modules: {
  },
});
