<template>
  <div>
    <div class="login-container">
      <!-- 导航栏 -->
      <van-nav-bar class="page-nav-bar" title="登录" />
      <!-- /导航栏 -->

      <!-- 登录表单 -->
      <van-form @submit="onSubmit">
        <van-field
          name="mobile"
          placeholder="请输入手机号"
          v-model="user.mobile"
          :rules="userFormRules.mobile"
        >
          <i slot="left-icon" class="toutiao toutiao-shouji"></i>
        </van-field>
        <van-field
          name="code"
          placeholder="请输入验证码"
          v-model="user.code"
          :rules="userFormRules.code"
          maxlength="6"
        >
          <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
          <template #button>
            <van-button
              native-type="button"
              class="send-sms-btn"
              round
              size="small"
              type="default"
              @click="onSendSms"
              >发送验证码</van-button
            >
          </template>
        </van-field>
        <div class="login-btn-wrap">
          <van-button class="login-btn" block type="info" native-type="submit">
            登录
          </van-button>
        </div>
      </van-form>
      <!-- /登录表单 -->
    </div>
  </div>
</template>

<script>
import { loginAPI, getSmsCodeAPI } from '../../api/index.js'
export default {
  data () {
    return {
      name: 'LoginIndex',
      user: {
        mobile: '',
        code: ''
      },
      userFormRules: {
        mobile: [
          {
            // 每种类型的错误都需要写一个配置对象
            // 这样碰到对应的错误类型才会响应对应的错误提示
            // required表示是否必填
            required: true,
            // 错误提示文案
            message: '手机号不能为空'
          },
          {
            required: true,
            pattern: /^1[3|5|7|8][0-9]{9}$/,
            message: '手机号格式不正确'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            required: true,
            pattern: /^\d{6}$/,
            message: '验证码格式不正确'
          }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      // 开始转圈圈
      // 引入vant全部组件后 会自动将 $toast 挂载到 VUE 实例上
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })
      try { // 请求成功时 通过
        const res = await loginAPI(this.user)
        console.log(res)
        this.$toast.success('登陆成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('登录失败，手机号或验证码错误')
      }
    },
    async onSendSms () {
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2. 验证通过，显示倒计时
      // 3. 请求发送验证码
      try {
        const res = await getSmsCodeAPI(this.mobile)
        console.log(res)
        this.$toast.success('已发送验证码到您的手机')
      } catch (err) {
        console.log(err)
        this.$toast.fail('验证码发送失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    position: relative;
    top: -5px;
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
