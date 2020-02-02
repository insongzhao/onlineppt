/**
 * Created by xiuxiu on 2020/1/16
 * description: axios请求全局配置
 **/
import qs from "qs";
import axios from "axios";
import config from "./config";

// 基地址
// config.baseURL = "http://www.insozhao.cn/";
config.baseURL = "http://47.101.146.230/";
// config.headers.token = loginInfo.token;

const service = axios.create(config);

// 请求拦截
service.interceptors.request.use(
  config => {
    if (config.method === "post") {
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 通用方法
export const POST = (url, params) => {
  return service({
    method: "post",
    url,
    data: params,
    timeout: 8000
  });
};

export const GET = (url, params) => {
  return service({
    method: "get",
    url,
    params,
    timeout: 8000
  });
};

export const DELETE = (url, params) => {
  return service({
    method: "delete",
    url,
    params
  });
};
