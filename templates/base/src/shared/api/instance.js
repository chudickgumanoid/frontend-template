import router from "@/app/providers/router";
import { useLocalStorage } from "@vueuse/core";
import axios from "axios";
import { getError, getErrorFromApiJsonOnlyObject } from "../utils/errors";
import { refreshAccessToken } from "./refresh";

const baseURL = VITE_BASE_API_URL;

const instance = axios.create({ baseURL });

instance.interceptors.request.use(
  (config) => {
    window.loadingBar = { __type: "start" };

    return config;
  },
  (error) => {
    window.loadingBar = { __type: "error" };

    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    window.loadingBar = { __type: "finish" };

    if (response.config.isMsgSuccess) {
      window.notification = {
        __type: "success",
        duration: 3000,
        title: response.data.message || "Успешная операция",
      };
    }

    return response;
  },
  async (error) => {
    console.error("API Error:", error);

    const originalRequest = error.config;

    error.msgError = getError(error);
    error.msgObject = getErrorFromApiJsonOnlyObject(error);

    if (error.response?.status >= 400 && error.config?.isMsgError) {
      window.notification = {
        __type: "error",
        duration: 5000,
        title: error.msgError || error.config.msgError || "Неизвестная ошибка",
        description: error.response?.data?.errors?.err,
      };
    }

    if (error.response?.status === 404 && error.config?.isNotFound) {
      router.replace({ name: "404" });
    }

    if (error.response?.status >= 422) {
      window.notification = {
        __type: "warning",
        duration: 5000,
        title: error.msgError || error.config.msgError || "Неизвестная ошибка",
        description: error.response?.data?.errors?.err,
      };
    }

    if (error.response?.status === 500) {
      window.notification = {
        __type: "error",
        duration: 8000,
        title: "Ошибка сервера",
      };
    }

    window.loadingBar = { __type: "finish" };

    return Promise.reject(error);
  }
);

export default instance;
