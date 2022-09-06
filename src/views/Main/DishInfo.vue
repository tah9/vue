<template>
  <div :style="'background:'+dish.color">
    <back-btn></back-btn>
    <div class="dish">
      <div style="display: flex;justify-content: space-between;">
        <div style="display: flex;flex-direction: column;">
          <p class="dish-name">{{ dish.dish_name }}</p>
          <p>{{ dish.dish_group }}</p>
        </div>
        <img :src="dish.img">

      </div>
    </div>
    <div class="main">
      <tab-layout class="tab-layout" @changeTab="(cur)=>{this.curIndex=cur}">
        <div :class="curIndex===0?'curTab':'notTab'">原料</div>
        <div :class="curIndex===1?'curTab':'notTab'">制作方法</div>
      </tab-layout>
      <div class="materials" v-if="curIndex===0">
        <div class="tip">主料</div>
        <div v-for="item in dish.materials.major_material_info">
          <div>{{ item }}</div>
        </div>
        <div class="tip">辅料</div>
        <div v-for="item in dish.materials.seasoning_info">
          <div>{{ item }}</div>
        </div>
        <div class="tip">调料</div>
        <div v-for="item in dish.materials.supplementary_material_info">
          <div>{{ item }}</div>
        </div>
      </div>
      <div class="production_method" v-else>
        <div v-for="item in dish.production_method">
          <div>{{ item }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackBtn from "@/components/BackBtn";
import request from "../../../request";
import TabLayout from "@/components/TabLayout";

export default {
  name: "dishInfo",
  components: {TabLayout, BackBtn},
  props: {},
  data() {
    return {
      dish: null,
      dishes: null,
      curIndex: 0
    }
  },
  methods: {
    dishInfo(dish) {
      this.$setJSON('dish', dish)
      this.$router.push('/dishInfo')
    }
  },
  created() {
    this.dish = this.$getJSON('dish')
    console.log(this.dish)
  }
}
</script>

<style scoped>
.production_method {
  padding: 1em 2em 1em 2em;
  font-size: 1.1em;
}

.production_method > div {
  margin-bottom: 8px;
}

.main {
  flex: 1;
  margin-bottom: -1px;
  background-color: white;
  border-top-right-radius: 50px;
}

.materials {
  box-sizing: border-box;
  padding: 2em;
  font-size: 1.1em;
}

.tip {
  font-weight: bold;
  margin-bottom: 0.5em;
  margin-top: 1em;
}

.curTab {
  font-size: 1.2em;
  font-weight: bold;
  position: relative;
}

.notTab {
  font-size: 1.1em;
}

.curTab::before {
  position: absolute;
  left: 0;
  top: 42px;
  content: '';
  width: 2em;
  height: 4px;
  background: #e4ae90;
}

.dish {
  display: flex;
  align-items: center;
  padding: 1em 1em 1em 2em;
}

.tab-layout {
  padding: 1em 0 1em 2em;
  color: #404040;
  display: flex;
  align-items: center;
}

.tab-layout > div {
  line-height: 44px;
  height: 44px;
  width: 6em;
}

.dish img {
  width: 100px;
  height: 100px;
  overflow: hidden;
  object-fit: cover;
  border-radius: 999px;
}

.dish-name {
  font-size: 1.2em;
  font-weight: bold;
  color: #2e3e53;
  width: 5em;
  margin-top: 2em;
  word-wrap: break-word;
  margin-bottom: 4px;
}

.dish img {
  object-fit: cover;
  border-radius: 999px;
  overflow: hidden;
  width: 230px;
  height: 230px;
}

.dish {
  padding: 2em;
  box-sizing: border-box;
  width: 100%;
}


</style>
