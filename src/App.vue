<template>
  <nav>
    <div class="nav-menu">
      <table class="nav-table">
        <tr>
          <td><router-link to="/"><img src="./assets/nav_icon/task.svg" class="nav-icon"></router-link></td>
          <td><router-link to="/gacha"><img src="./assets/nav_icon/gacha.svg" class="nav-icon"></router-link></td>
          <td><router-link to="/item_list"><img src="./assets/nav_icon/item.svg" class="nav-icon"></router-link></td>
        </tr>
      </table>
    </div>
    <p class="card hold-point-display">所持：{{ now_point }} 🪙</p>
  </nav>
  <div class="reload-btn">
    <button class="btn btn-sm" @click="forceReload()">🔄</button>
  </div>
  <router-view id="router-view" />
</template>

<script>
import {ref, onMounted} from 'vue'
import { useRouter } from 'vue-router'

export default {
  name:"app",
  setup(){
    const router = useRouter()

    let now_point = ref(0)

    const getNowPoint=()=>{
      now_point.value = localStorage.getItem('now_point')
    }

    const forceReload=()=>{
      router.go({path: router.currentRoute.path, force: true})
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
      getNowPoint,
      forceReload
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

#router-view{
  margin-top: 20px;
}

.reload-btn{
  position:fixed;
  top:5px;
  right: 5px;
}

nav {
  padding: 5px;
  background-color: black;
}

nav img {
  filter: invert(50%) sepia(0%) saturate(11%) hue-rotate(143deg) brightness(101%) contrast(93%);
}

nav a.router-link-exact-active {
  filter: invert(72%) sepia(26%) saturate(6428%) hue-rotate(1deg) brightness(105%) contrast(102%);
}

.nav-table{
  margin:0 auto;
}

.nav-table td{
  padding:0 20px;
}

.nav-icon{
  width: 40px;
}

.hold-point-display{
  background-color: white;
  margin-top: 10px;
}
</style>
