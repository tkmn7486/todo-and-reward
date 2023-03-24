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
  </nav>
  <div class="reload-btn">
    <button class="btn btn-sm" @click="forceReload()">🔄</button>
  </div>
  <router-view id="router-view" />
</template>

<script>
import {ref} from 'vue'
import { useRouter } from 'vue-router'
import {supabase} from './supabase'

export default {
  name:"app",
  setup(){
    const router = useRouter()

    let now_point = ref(0)

    const forceReload=async()=>{
      let {
        data: point
      } = await supabase.from('app_setting').select("type,contents");

      if(point[0].type=='hold_point'){
        localStorage.setItem('now_point', Number(point[0].contents))
        localStorage.setItem('my_items', JSON.stringify(point[1].contents))
        console.log("ポイント：",point[0].contents)
        console.log("アイテムリスト：",point[1].contents)
      }else{
        localStorage.setItem('now_point', Number(point[1].contents))
        localStorage.setItem('my_items', JSON.stringify(point[0].contents))
        console.log("ポイント：",point[1].contents)
        console.log("アイテムリスト：",point[0].contents)
      }
      router.go({path: router.currentRoute.path, force: true})
    }
    return{
      now_point,
      forceReload
    }
  }
}

</script>

<style>
@font-face {
    font-family: 'dot-style-10';
    src: url('../src/assets/fonts/PixelMplus10-Regular.ttf') format('truetype');
}

#app {
  -webkit-font-smoothing: 'dot-style-10';
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family:'dot-style-10';
}

.card{
  z-index: 0;
}

#router-view{
  margin-top: 50px;
  z-index: -1;
  background-color:none;
}

.nav-menu{
  position: fixed;
  top:0;
  left:0;
  width: 100vw;
  background-color: black;
  z-index:100;
}

.reload-btn{
  position:fixed;
  top:5px;
  right: 5px;
}

nav {
  padding: 5px;
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
  margin-top: 10px;
}
</style>
