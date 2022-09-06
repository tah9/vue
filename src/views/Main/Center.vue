<template>
  <div class="root">
    <div style="height: 30vh" v-if="suitable===null"></div>
    <div style="font-weight: bold;font-size: 1.2em">饮食建议</div>
    <search style="margin: 1em 0" @search="search" placeholder="输入疾病"></search>
    <div class="disease-list">
      <div v-for="name in disease" @click="search(name)">
        {{name}}
      </div>
    </div>
    <div v-if="suitable!==null">
      <div style="font-weight: bold;font-size: 1.2em;margin: 1em 0;">多食</div>
      <div class="suitable-list">
        <div v-for="item in suitable" class="item" @click="foodInfo(item)">
          <img :src="item.img">
          <div>{{item.food_name}}</div>
        </div>
      </div>
      <div style="font-weight: bold;font-size: 1.2em;margin: 1em 0;">少食</div>
      <div class="taboo-list">
        <div v-for="item in taboo" class="item" @click="foodInfo(item)">
          <img :src="item.img">
          <div>{{item.food_name}}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Search from "@/components/Search";
import request from "../../../request";
export default {
  name: "Center",
  components: {Search},
  props: {},
  data() {
    return {
      suitable:null,
      taboo:null,
      disease:'三高 失眠 便秘 痛风'.split(' ')
    }
  },
  methods: {
    foodInfo(food,index) {
      food['color']=((index%2+this.curIndex%2)%2===0?'linear-gradient(to top, #dba589, rgb(255, 202, 168))':'linear-gradient(to top,#a5e4e9,#e1f5fe)')
      this.$setJSON('food',food)
      this.$router.push('/foodInfo')
    },
    search(v){
      if (v===''){
        return
      }
      request.post('/public/disease',{
        disease:v
      }).then(res=>{
        this.suitable=res.suitable
        this.taboo=res.taboo
      })
    }
  },
  created() {

  }
}
</script>

<style scoped>
.suitable-list,.taboo-list{
  display: flex;
  width: 100vw;
  margin-left: -2em;
  overflow: scroll;
}
.suitable-list::-webkit-scrollbar,.taboo-list::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
}
.item{
  margin: 6px 0 6px 2em;
}
.item img{
  border-radius: 12px;
  width: 100px;
  height: 100px;
  object-fit: cover;
}
.root{
  padding: 2em;
}
.disease-list{
  display: flex;
  margin-bottom: 2em;
}
.disease-list>div{
  border-radius: 99px;
  padding: 6px 1em;
  color: white;
  margin-right: 6px;
  background: rgba(86, 97, 117,0.5);
}
</style>
