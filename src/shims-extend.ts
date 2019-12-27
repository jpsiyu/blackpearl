import { DB } from '@/scripts/db/db';
import { SHH } from '@/scripts/shh/shh';
import { AxiosInstance } from 'axios';
import { App } from '@/scripts/app/app'

declare module 'vue/types/vue' {
  interface Vue {
    $app: App;
    $db: DB;
    $shh: SHH;
    $axios: AxiosInstance;
  }
}
