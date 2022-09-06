<template>
  <div class="root">
    <div style="font-size: 2em;margin-bottom: 1em">家常菜谱</div>
    <div style="color: red;">{{ tip }}</div>
    <input v-model="username" placeholder="请输入用户名" type="text">
    <input v-model="password" placeholder="请输入密码" type="password">
    <div class="btn" @click="submit">登录</div>
    <div class="btn register-btn" @click="$router.replace('/register')">没有账号，立即注册</div>
  </div>
</template>

<script>
import request from "../../../request";

export default {
  name: "Login",
  props: {},
  data() {
    return {
      username: '小福贵',
      password: '123456789',
      tip:''
    }
  },
  methods: {
    submit(){
      if (this.password===''||this.username===''){
        this.tip='请输入完整信息'
        return
      }
      request.post('/public/login',
          {
            username:this.username,
            password:this.password
          }).then(res=>{
        if (res.code===200){
          this.$setJSON('user',res.user)
          this.$router.replace('/main/home')
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
  justify-content: space-evenly;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}
.root>*{
  margin-bottom: 1em;
}
.register-btn{
  border: 1px solid var(--themeColor);
  color: black;
  background: white;
}

</style>
