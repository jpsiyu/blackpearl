import Vue from 'vue';
import axios from 'axios';

const config = {
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const axiosInstance = axios.create(config);

axiosInstance.interceptors.request.use(
  (reqConfig: any) => {
    return reqConfig;
  },
  (error: Error) => {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (error: Error) => {
    return error;
  },
);

const plugin = {
  install() {
    Object.defineProperties(Vue.prototype, {
      $axios: { get() { return axiosInstance; } },
    });
  },
};

Vue.use(plugin);

export default plugin;
export { axiosInstance };
