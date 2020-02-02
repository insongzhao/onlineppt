<!--注册页面 -->
<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-container_left">
        <!--<img src="" alt="leftImg">-->
      </div>
      <div class="register-container_right">
        <div class="register-form">
          <div class="register-form-header">
            <span>注册</span>
          </div>
          <div class="register-form-content">
            <div class="phone-filed">
              <span>+86</span>
              <input
                type="text"
                class="phone-input"
                v-model="registerInfo.telephone"
                :class="{ active: phoneFocus == true }"
                @click="getFocus(1)"
                placeholder="请输入您的手机号"
              />
            </div>
            <div class="code-filed">
              <input
                type="text"
                class="code-input"
                v-model="registerInfo.verifycode"
                :class="{ active: codeFocus == true }"
                placeholder="验证码"
                @click="getFocus(2)"
              />
              <button class="code-btn" @click="getCode()">
                获取短信验证码
              </button>
            </div>
            <input
              type="text"
              class="inputPasswd"
              v-model="registerInfo.password"
              placeholder="密码"
              :class="{ active: passwdFocus == true }"
              @click="getFocus(3)"
            />
            <input
              type="text"
              class="inputName"
              v-model="registerInfo.nickname"
              placeholder="昵称"
              :class="{ active: nameFocus == true }"
              @click="getFocus(4)"
            />
            <div class="useer-register">
              <div class="register-btn" @click="registerWork">注册</div>
            </div>
          </div>
          <div class="register-form-footer">
            <div class="user-register-text">
              没有账号？请
              <a class="user-register" @click.prevent="goToLogin"
                >&nbsp;&nbsp;登录</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SendVerCode, RegisterWork } from "../../service/login";
export default {
  name: "register",
  data() {
    return {
      // 用户注册信息
      registerInfo: {
        telephone: "",
        nickname: "",
        password: "",
        verifycode: ""
      },
      phoneFocus: false,
      nameFocus: false,
      codeFocus: false,
      passwdFocus: false
    };
  },
  methods: {
    getFocus(id) {
      this.phoneFocus = false;
      this.codeFocus = false;
      this.passwdFocus = false;
      this.nameFocus = false;
      switch (id) {
        case 1: {
          this.phoneFocus = true;
          break;
        }
        case 2: {
          this.codeFocus = true;
          break;
        }
        case 3: {
          this.passwdFocus = true;
          break;
        }
        case 4: {
          this.nameFocus = true;
          break;
        }
      }
    },
    goToLogin() {
      this.$router.push({ name: "login" });
    },

    // 获取短信验证码
    getCode() {
      let self = this;
      let telephone = self.registerInfo.telephone;
      SendVerCode({
        telephone: telephone
      })
        .then(res => {
          window.console.log("success!", res);
        })
        .catch(res => {
          window.console.log("获取验证码失败！", res);
        });
    },

    // 注册
    registerWork() {
      let self = this;
      let ip = localStorage.getItem("ip");
      let nickname = self.registerInfo.nickname;
      let password = self.registerInfo.password;
      let vertifycode = self.registerInfo.verifycode;
      let telephone = self.registerInfo.telephone;
      let registertime = self.$validateUtil.getCurTime();
      let timestamp = self.$validateUtil.timeStamp();

      if (
        nickname == "" ||
        vertifycode == "" ||
        telephone == "" ||
        password == ""
      ) {
        self.tipBox("将信息填写完整才能注册哦！", "error");
        return;
      } else if (
        nickname.indexOf(" ") >= 0 ||
        vertifycode.indexOf(" ") >= 0 ||
        telephone.indexOf(" ") >= 0 ||
        password.indexOf(" ") >= 0
      ) {
        self.tipBox("信息不能全是空格哦！", "error");
        return;
      } else {
        RegisterWork({
          registerIp: ip,
          registerTime: registertime,
          telephone: telephone,
          uesername: nickname,
          password: password,
          verificode: vertifycode,
          userid: timestamp
        })
          .then(res => {
            window.console.log("success!", res);
            self.tipBox("注册成功！", "success");
          })
          .catch(res => {
            window.console.log("error", res);
            self.tipBox("注册失败！", "success");
          });
      }
    }
  }
};
</script>
<style lang="scss" scope>
@import "./style/index.scss";
</style>
