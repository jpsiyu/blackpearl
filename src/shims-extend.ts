import Vue from 'vue';
import { DB } from '@/scripts/db/db';

declare module 'vue/types/vue' {
  interface Vue {
    $db: DB;
  }
}
