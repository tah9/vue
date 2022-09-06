<template>
  <div :style="'background:'+food.color">
    <back-btn></back-btn>
    <div class="food">
      <div style="display: flex;justify-content: space-between;">
        <div style="display: flex;flex-direction: column;">
          <p class="food-name">{{ food.food_name }}</p>
          <p>{{ food.food_group }}类</p>
        </div>
        <img :src="food.img">

      </div>
      <div style="display: flex;margin-top: 1em">
        <div class="des">宜</div>
        <div class="no" v-if="food.suitable.name===undefined">无</div>
        <div class="tag" v-else>{{ food.suitable.name }}</div>
        <!--        <div style="color: white;margin-right: 1em" v-for="tag in food.suitable.tags">{{ tag }}</div>-->
      </div>
      <div style="display: flex;margin-top: 1em;align-items: center">
        <div class="des">忌</div>
        <div class="no" v-if="food.taboo.name===undefined">无</div>
        <div class="tag" v-else>{{ food.taboo.name }}</div>
        <!--        <div style="color: white;margin-right: 1em" v-for="tag in food.taboo.tags">{{ tag }}</div>-->
      </div>
    </div>
    <div class="main">
      <div style="padding: 1em 0 1em 2em;color: #404040;font-size: 1.2em;font-weight: bold">菜肴</div>
      <div v-for="dish in dishes" class="dish" @click="dishInfo(dish)">
        <img :src="dish.img">
        <div style="display: flex;flex-direction: column;margin-left: 2em">
          <div style="font-size: 1.1em;font-weight: bold">{{ dish.dish_name}}</div>
          <div style="margin-top: 4px">{{ dish.dish_group}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BackBtn from "@/components/BackBtn";
import request from "../../../request";

export default {
  name: "FoodInfo",
  components: {BackBtn},
  props: {},
  data() {
    return {
      food: null,
      dishes: null
    }
  },
  methods: {
    dishInfo(dish){
      dish['color']=this.food.color
      this.$setJSON('dish',dish)
      this.$router.push('/dishInfo')
    }
  },
  created() {
    this.food = this.$getJSON('food')
    request.post('/public/getDishesByFood', {
      food_name: this.food.food_name
    }).then(res => {
      this.dishes = res.rows
    })
  }
}
</script>

<style scoped>
.main {
  flex: 1;
  margin-bottom: -1px;
  background-color: white;
  border-top-right-radius: 50px;
}
.dish{
  display: flex;
  align-items: center;
  padding: 1em 1em 1em 2em;
}
.dish img{
  width: 100px;
  height: 100px;
  overflow: hidden;
  object-fit: cover;
  border-radius: 999px;
}
.food-name {
  font-size: 1.2em;
  font-weight: bold;
  color: #2e3e53;
  width: 5em;
  margin-top: 2em;
  word-wrap: break-word;
  margin-bottom: 4px;
}

.food img {
  object-fit: cover;
  border-radius: 999px;
  overflow: hidden;
  width: 230px;
  height: 230px;
}

.food {
  padding: 2em;
  box-sizing: border-box;
  width: 100%;
}

.other {
  word-wrap: break-word;
  display: flex;
}

.des {
  color: #2e3e53;
  margin-right: 1em;
}

.tag, .no {
  background: rgba(0, 0, 0, .4);
  border-radius: 99px;
  padding: 4px;
  color: white;
  margin-right: 5px;
}
</style>
