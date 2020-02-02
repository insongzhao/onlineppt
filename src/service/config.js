import http from "http";
import https from "https";

export default {
  // 自定义的请求头
  headers: {
    post: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
    },
    "X-Requested-Width": "XMLHttpRequest"
  },
  // 超时设置
  timeout: 30000,
  // 跨域是否带token
  withCredentials: true,
  responseType: "json",
  httpAgent: new http.Agent({
    keepAlive: true
  }),
  httpsAgent: new https.Agent({
    keepAlive: true
  })
};
