import Vue from 'vue';
import { DB } from '@/scripts/db/db';
import { SHH } from '@/scripts/shh/shh';

declare module 'vue/types/vue' {
  interface Vue {
    $db: DB;
    $shh: SHH;
    $axios: any;
  }
}
