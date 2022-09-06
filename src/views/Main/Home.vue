<template>
  <div class="root">
    <div style="color: #66718f;margin-left: 2em;padding-top: 1em;margin-bottom: -0.5em">家常菜谱</div>
    <Search @search="search" style="margin: 1em 2em" placeholder="搜索食材 菜肴"></Search>
    <div style="color: #afb9c2;margin:0;font-size: 1.2em;padding-left: 2em;padding-bottom: 1em">分类</div>
    <tab-layout class="tab-layout">
      <div class="classification-item" style="padding: 0"></div>
      <div v-for="(item,index) in classifications" @click="changeTab(index)"
           :style="'background:'+(index===curIndex?'#ecca8c':'#e2eaed')"
           class="classification-item">
        <div>
          <div style="font-weight: bold;margin-bottom: 4px;margin-top: 1em">{{ item.food_group }}</div>
          <div style="font-size: 12px;">{{ item.count }}&nbsp;species</div>
        </div>
        <img :src="classificationImgs[index]">
      </div>
    </tab-layout>
    <div class="main">
      <div style="margin: 1em 0 1em 2em;color: #404040;font-size: 1.2em;font-weight: bold">食材</div>
      <div class="food-list">
        <div class="food" v-for="(food,index) in foods" @click="foodInfo(food,index)"
             :style="'background:'+((index%2+curIndex%2)%2===0?'linear-gradient(to top, #dba589, rgb(255, 202, 168))':'linear-gradient(to top,#a5e4e9,#e1f5fe)')">
          <div class="food-name">{{ food.food_name }}</div>
          <img :src="food.img">
          <div class="other" style="margin: 1em 0">
            <div>适宜</div>
            <div>{{ food.suitable.name }}</div>
          </div>
          <div class="other">
            <div>禁忌</div>
            <div>{{ food.taboo.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Search from "@/components/Search";
import request from "../../../request";
import TabLayout from "@/components/TabLayout";

export default {
  name: "Home",
  components: {TabLayout, Search},
  props: {},
  data() {
    return {
      classifications: null,
      foods: null,
      curIndex: 0,
      classificationImgs: [require('../../assets/bean.png'),
        require('../../assets/potato.png'),
        require('../../assets/pork.png'),
        require('../../assets/vegetable.png')]
    }
  },
  methods: {
    search(v){
      localStorage.setItem('search',v)
      this.$router.push('/search')
    },
    foodInfo(food,index) {
      food['color']=((index%2+this.curIndex%2)%2===0?'linear-gradient(to top, #dba589, rgb(255, 202, 168))':'linear-gradient(to top,#a5e4e9,#e1f5fe)')
      this.$setJSON('food',food)
      this.$router.push('/foodInfo')
    },
    changeTab(index) {
      if (index === this.curIndex) {
        return
      }
      this.curIndex = index
      this.getFoodByClassification()
    },
    getClassification() {
      request.get('/public/getClassification').then(res => {
        this.classifications = res.rows
        this.getFoodByClassification()
      })
    },
    getFoodByClassification() {

      request.post('/public/getFoodByClassification', {
        food_group: this.classifications[this.curIndex].food_group
      }).then(res => {
        this.foods = res.rows
      })
    }
  },
  created() {
    this.getClassification()
  }
}
</script>

<style scoped>
.main {
  flex: 1;
  margin-bottom: -1px;
  background-color: white;
  margin-top: 1em;
  border-top-right-radius: 50px;
}

.other {
  display: flex;
}

.other > div:first-child {
  color: #2e3e53;
  margin-right: 4px;
}

.other > div:last-child {
  color: #606c82;
}

.root {
  background-color: #3a465e;
  display: flex;
  flex-direction: column;
}

.food-name {
  font-size: 1.2em;
  font-weight: bold;
  color: #2e3e53;
  margin-bottom: 4px;
}

.food img {
  object-fit: cover;
  border-radius: 999px;
  overflow: hidden;
  width: 230px;
  height: 230px;
  margin-left: 1.8em;
}

.food {
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  padding: 2em;
  box-sizing: border-box;
  margin: 0 0 1em 2em;
  width: calc(2em + 250px);
  border-radius: 3px 40px 40px 40px;
  white-space: nowrap;
  display: inline-block;
}


.classification-item {
  border-radius: 12px;
  margin: 0 0 1em 1em;
  white-space: nowrap;
  display: inline-block;
}

.food-list {
  white-space: nowrap;
  overflow-x: scroll;
  overflow-y: hidden;
}

.food-list::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
}

.classification-item {
  display: flex;
  border-radius: 12px;
  box-sizing: border-box;
  color: #696c71;
  padding: 1em;
}

.tab-layout img {
  width: 3em;
  height: 3em;
  margin-left: 1em;
  background-color: #f7e8d8;
  border-radius: 99px;
}
</style>
