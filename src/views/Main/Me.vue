<template>
  <div class="root">
    <div style="margin-top: 44px;font-size: 2em;font-weight: bold;margin-left: 2em">我的</div>
    <div class="center-text" style="line-height: 25vh;color: #3a465e">家常菜谱</div>
    <div class="center-text" style="font-size: 1.8em;font-weight: normal;">当前账号</div>
    <div class="center-text" style="color: #3a465e">@{{username}}</div>
  </div>
</template>

<script>
export default {
  name: "Me",
  props: {},
  data() {
    return {
      username:''
    }
  },
  methods: {},
  created() {
    this.username=this.$getJSON('user').username
  }
}
</script>

<style scoped>
.root{
  background: #f8f8f8 ;
  padding-top: 20vh;
  width: 100vw;
  height: 100vh;
  background-image: url("../../assets/vege.jpg");
  background-repeat: no-repeat;
  background-size: contain;
}
.center-text{
  font-size: 2em;
  margin-left: calc(50% - 2em);
  font-weight: bold;
}
</style>
