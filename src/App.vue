<template>
  <div >
    <router-view/>
  </div>
</template>

<style>
body{
  margin: 0;
  padding: 0;
  word-wrap: break-word;
  box-sizing: border-box;
  --themeColor: #3a465e;
}

input{
  border-radius: 99px;
  border: none;
  background: #f9f9fb;
  padding: 0 1em;
  box-sizing: border-box;
  /*line-height: 44px;*/
  height: 44px;
}
input:focus, textarea:focus {
  outline: none;
}
.btn{
  border-radius: 99px;
  background: var(--themeColor);
  color: white;
  text-align: center;
  width: 100%;
  line-height: 44px;
  height: 44px;
}
</style>
