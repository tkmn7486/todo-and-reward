<template>
  <nav>
    <router-link to="/">タスク</router-link> |
    <router-link to="/gacha">ガチャ</router-link> |
    <router-link to="/item_list">所持品</router-link>
    <p>所持：{{ now_point }} 🪙</p>
  </nav>
  <router-view/>
</template>

<script>
import {ref, onMounted} from 'vue'
export default {
  name:"app",
  setup(){
    let now_point = ref(0)

    const getNowPoint=()=>{
      now_point.value = localStorage.getItem('now_point')
    }

    onMounted(()=>{
      let point = localStorage.getItem('now_point')
      if(point == null){
        now_point.value = 0
        localStorage.setItem('now_point', 0)
      }else{
        getNowPoint()
        setInterval(getNowPoint,2000)
      }
    })
    return{
      now_point,
      getNowPoint
    }
  }
}

</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
