<template>
  <div class="root">
    <div style="font-size: 2em;margin-bottom: 1em">家常菜谱</div>
    <div style="color: red;">{{ tip }}</div>
    <input v-model="username" placeholder="请输入用户名" type="text">
    <input v-model="password" placeholder="请输入密码" type="password">
    <input v-model="p2" placeholder="确认密码" type="password">
    <div class="btn" @click="submit">注册</div>
    <div class="btn register-btn" @click="$router.replace('/login')">已有账号，立即登录</div>

  </div>

</template>

<script>

import request from "../../../request";

export default {
  name: "Regitser",
  props: {},
  components: {},
  data() {
    return {
      tip: '',
      showDialog: true,
      username: '',
      password: '',
      p2:''
    }
  },
  methods: {
    submit(){
      if (this.password !== this.p2) {
        this.tip='两次密码输入不一致'
        return;
      }
      if (this.password===''||this.username===''||this.p2===''){
        this.tip='请输入完整信息'
        return
      }
      request.post('/public/register',
          {
            username:this.username,
            password:this.password
          }).then(res=>{
          if (res.code===200){
            this.tip='注册成功'
          }else{
            this.tip='用户名已存在'
          }
      })
    }
  },
  created() {

  }
}
</script>

<style scoped>
.root {
  margin-top: 20vh;
  background: #ffffff;
  padding: 2em;
  /*height: 60vh;*/
  justify-content: space-evenly;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

.root > * {
  margin-bottom: 1em;
}

.register-btn {
  border: 1px solid var(--themeColor);
  color: black;
  background: white;
}

</style>
