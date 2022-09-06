<template>
  <div class="search">
    <svg t="1662432819279" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="19143" width="32" height="32"><path d="M756.565333 697.258667c2.133333 1.493333 4.224 3.157333 6.101334 5.12l241.664 241.621333c16.256 16.256 16.512 43.52-0.128 60.16a42.453333 42.453333 0 0 1-60.202667 0.170667l-241.664-241.664a41.429333 41.429333 0 0 1-5.034667-6.101334A424.917333 424.917333 0 0 1 426.666667 853.333333C191.018667 853.333333 0 662.314667 0 426.666667S191.018667 0 426.666667 0s426.666667 191.018667 426.666666 426.666667c0 102.698667-36.266667 196.949333-96.768 270.592zM426.666667 768a341.333333 341.333333 0 1 0 0-682.666667 341.333333 341.333333 0 0 0 0 682.666667z" fill="#ffffff" p-id="19144"></path></svg>
    <input type="text" @keyup.enter="search()" ref="search" :placeholder="placeholder">
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {
    placeholder:''
  },
  data() {
    return {}
  },
  methods: {
    search(){
      this.$nextTick(()=>{
        this.$emit('search',this.$refs.search.value)
      })
    }
  },
  created() {

  }
}
</script>

<style scoped>
.search{
  padding: 1em 0;
  margin: 0.5em 1em;
  box-sizing: border-box;
  border-radius: 99px;
  position: relative;
}
.search>svg{
  width: 22px;
  z-index: 2;
  left: 1em;
  top: calc(1em + 11px);
  height: 22px;
  position: absolute;
}
.search>input{
  width: 100%;
  color: white;
  background-color: #566175;
  padding-left: calc(2em + 25px);
  padding-right: 1em;
}
.search>input::placeholder{
  color: #818c9e;
}
</style>
