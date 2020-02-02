<template>
  <div class="login-page">
    <div class="login-container">
      <div class="login-container_left">
        <!--<img src="" alt="leftImg">-->
      </div>
      <div class="login-container_right">
        <div class="login-form">
          <div class="login-form-header">
            <span class="noselect">登录</span>
          </div>
          <div class="login-form-content">
            <input
              class="user-account"
              v-model="telephone"
              :class="{ active: accountFocus == true }"
              type="text"
              placeholder="您的手机号"
              @click="inputUsername()"
            />
            <input
              class="user-password"
              v-model="password"
              :class="{ active: passwdFocus == true }"
              type="text"
              placeholder="您的密码"
              @click="inputPasswd()"
            />
            <div class="user-login">
              <span>{{ loginText }}</span>
            </div>
          </div>
          <div class="login-form-footer">
            <div class="user-register-text">
              没有账号？请
              <a class="user-register" @click="goToRegister"
                >&nbsp;&nbsp;注册</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { LoginWork } from "../../service/login";
export default {
  name: "login",
  data() {
    return {
      loginText: "登录",
      telephone: "",
      password: "",
      accountFocus: false,
      passwdFocus: false
    };
  },
  methods: {
    // 跳转到注册页面
    goToRegister() {
      this.$router.push({ name: "register" });
    },
    inputUsername() {
      this.accountFocus = true;
      this.passwdFocus = false;
    },
    inputPasswd() {
      this.accountFocus = false;
      this.passwdFocus = true;
    },
    // 用户登录
    submitWork() {
      let self = this;
      // 获取登录用户的 ip 地址
      let ip = localStorage.getItem("ip");
      let logintime = self.$validateUtil.getCurTime();

      self.loginText = "登录中...";

      if (self.telephone == "" || self.password == "") {
        self.tipBox("将信息填写完整才能登录哦！", "error");
        return;
      } else if (
        self.telephone.indexOf(" ") >= 0 ||
        self.password.indexOf(" ") >= 0
      ) {
        self.tipBox("信息不能是空格哦！", "error");
        return;
      } else {
        LoginWork({
          loginip: ip,
          logintime: logintime,
          password: ""
        })
          .then(res => {
            self.loginText = "登录";

            if (res.data.code === 3) {
              self.tipBox(res.data.message, "error");
            }

            // self.tipBox('登录成功！','success');
            // self.$router.push({name:'home'});
          })
          .catch(res => {
            window.console.log("fail", res);
            self.tipBox("登录失败，请检查用户名和密码！", "success");
          });
      }
    },
    // 提示框
    tipBox(text, type) {
      this.$message({
        message: text,
        type: type,
        customClass: "toast-box " + type + "-toast",
        duration: 2000,
        iconClass: "toast-box-icon " + type + "-toast-icon"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./style/index.scss";
</style>
<style lang="scss">
.toast-box {
  position: absolute;
  width: 350px;
  height: 50px;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
}

.toast-box-icon:before {
  position: absolute;
  margin-top: 17px;
  margin-left: 20px;
  width: 16px;
  height: 16px;

  display: inline-block;
  content: "";
}
.toast-box .el-message__content {
  line-height: 50px;
  font-size: 16px;
  text-align: center;
  /*color: #fff;*/
}
.success-toast {
  background-color: #7dc554;
}
.success-toast .el-message__content {
  color: #ffffff;
}

.success-toast-icon:before {
  /* background-image: url("../../static/images/login/toast-success.png"); */
}

.error-toast {
  background-color: #fef0f0;
}
.error-toast .el-message__content {
  color: #f56d6d;
}

.error-toast-icon:before {
  /* background-image: url("../../static/images/login/toast-error.png"); */
}
</style>
