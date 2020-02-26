/**
 * Created by xiuxiu on 2019/12/17
 * description: 登录页面接口
 **/
import * as API from "./index";

// 用户登录接口
export const LoginWork = params => {
  return API.GET("api/sys_user/login", params);
};

// 用户注册接口
export const RegisterWork = params => {
  return API.POST("online-work/api/user/register", params);
};

// 发送验证码通知
export const SendVerCode = params => {
  return API.GET("online-work/api/common/getVerCode", params);
};
