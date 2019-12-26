import { DB } from '@/scripts/db/db';
import { SHH } from '@/scripts/shh/shh';
import { AxiosInstance } from 'axios';

declare module 'vue/types/vue' {
  interface Vue {
    $db: DB;
    $shh: SHH;
    $axios: AxiosInstance;
  }
}
