import * as API from "./index";

// 保存ppt信息
export const savePPT = params => {
  return API.POST("api/sys_user/savePpt", params);
};