<template>
  <div class="root">
    <back-btn></back-btn>
    <div style="margin-top: 44px;font-size: 1.1em;font-weight: bold">搜索结果</div>
    <div class="item" v-for="item in rows" @click="foodInfo(item)">
      <img :src="item.img">
      <div style="display: flex;justify-content: space-between;flex: 1;margin-left: 3em">
        <div style="font-weight: bold">{{item.food_name}}</div>
        <div style="color: gray">{{item.food_group}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import BackBtn from "@/components/BackBtn";
import request from "../../../request";
export default {
  name: "SearchResult",
  components: {BackBtn},
  props: {},
  data() {
    return {
      rows:null
    }
  },
  methods: {
    foodInfo(food,index) {
      food['color']=((index%2+this.curIndex%2)%2===0?'linear-gradient(to top, #dba589, rgb(255, 202, 168))':'linear-gradient(to top,#a5e4e9,#e1f5fe)')
      this.$setJSON('food',food)
      this.$router.push('/foodInfo')
    },
  },
  created() {
    let value = localStorage.getItem('search');
    request.post('/public/search',{
      value:value
    }).then(res=>{
      this.rows=res.rows
    })
  }
}
</script>

<style scoped>
.root{
  padding: 2em;
}
.item{
  align-items: center;
  display: flex;
  margin: 1.5em 0;
}
.item img{
  border-radius: 12px;
  width: 100px;
  object-fit: cover;
  height: 70px;
}
</style>
