<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.cursor-pointer{
  cursor: pointer;
}

.router-link-exact-active{
  color: rgba(0,0,0,.9) !important;
}

a{
  color: rgba(0,0,0,.9) !important;
}

td {
  text-align: left;
}

.bg-white50{
  background: rgba(255,255,255,0.7) !important;
}

.bg-light-red{
  background: #ffc4c4;
}

.bg-light-light{
  background: #e1e5ea;
}

.invalid{
  color: #FF4136;
}

.error-text{
  color: #FF4136;
}

.input-div{
  min-width: 304px;
}

@media (max-width: 420px) {
  .hide-sm{
    display: none;
  }
}

.text-shadow{
  /* text-shadow:3px 2px 1px #212121; */
}

.button-gradient{
  background: linear-gradient(146deg, rgba(143,255,165,1) 1%, rgba(14,92,173,1) 100%);
  opacity: 0.8;
  transition: all 0.3s;
}

.button-green{
  background: #6fc2ab;
}

.button-gradient:hover{
  opacity: 1;
}

.border-radius10{
  border-radius: 10px !important;
}

.opacity{
  opacity: 0.9;
}
</style>

<script>

export default {
  data(){
    return{
      
    }
  }
}
</script>
