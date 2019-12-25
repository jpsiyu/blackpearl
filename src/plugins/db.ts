import Vue from 'vue';
import low from 'lowdb';
import LocalStorage from 'lowdb/adapters/LocalStorage';

const adapter = new LocalStorage('db');
const db = low(adapter);

const plugin = {
  install() {
    Object.defineProperties(Vue.prototype, {
      $db: { get() { return db; } },
    });
  },
};

Vue.use(plugin);

export default db;
