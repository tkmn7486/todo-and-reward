<template>
  <nav>
    <div class="nav-menu">
      <table class="nav-table">
        <tr>
          <td>
            <router-link to="/">
              <img src="./assets/nav_icon/task.png" class="nav-icon">
              <p>タスク</p>
              <small>▲</small>
            </router-link>
          </td>
          <td>
            <router-link to="/gacha">
              <img src="./assets/nav_icon/gacha.png" class="nav-icon">
              <p>宝箱</p>
              <small>▲</small>
            </router-link>
          </td>
          <td>
            <router-link to="/item_list">
              <img src="./assets/nav_icon/item.png" class="nav-icon">
              <p>もちもの</p>
              <small>▲</small>
            </router-link>
          </td>
        </tr>
      </table>
    </div>
  </nav>
  <div class="reload-btn">
    <button class="btn btn-sm" @click="forceReload()">🔄</button>
  </div>
  <router-view id="router-view" />
  <p class=""></p>
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

<style lang="scss">
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
  bottom:0;
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

nav a{
  text-decoration: none;
  color: white;
  small{
    color: black;
  }
  p{
    margin:0;
  }
}

nav a.router-link-exact-active {
    filter: invert(-50%) sepia(0%) saturate(-11%) hue-rotate(-143deg) brightness(101%) contrast(-93%);
    color: white;
    text-decoration: none;
    small{
      color: white;
    }
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

.typewriter1{
  overflow: hidden; /*はみ出た要素を非表示に*/
  white-space: nowrap; /*1行に*/
  animation: typing1 0.3s steps(1, end) forwards;
/*animation: アニメーション名｜時間｜分割数｜ループ */
}

.typewriter2{
  overflow: hidden;
  white-space: nowrap;
  animation: typing2 0.3s steps(2, end) forwards;
}

.typewriter3{
  overflow: hidden;
  white-space: nowrap;
  animation: typing3 0.3s steps(3, end) forwards;
}

.typewriter4{
  overflow: hidden;
  white-space: nowrap;
  animation: typing4 0.3s steps(4, end) forwards;
}

.typewriter5{
  overflow: hidden;
  white-space: nowrap;
  animation: typing5 0.3s steps(5, end) forwards;
}

.typewriter6{
  overflow: hidden;
  white-space: nowrap;
  animation: typing6 0.3s steps(6, end) forwards;
}

.typewriter7{
  overflow: hidden;
  white-space: nowrap;
  animation: typing7 0.3s steps(7, end) forwards;
}

.typewriter8{
  overflow: hidden;
  white-space: nowrap;
  animation: typing8 0.3s steps(8, end) forwards;
}

.typewriter9{
  overflow: hidden;
  white-space: nowrap;
  animation: typing9 0.3s steps(9, end) forwards;
}

.typewriter10{
  overflow: hidden;
  white-space: nowrap;
  animation: typing10 0.3s steps(10, end) forwards;
}

.typewriter11{
  overflow: hidden;
  white-space: nowrap;
  animation: typing11 0.3s steps(11, end) forwards;
}

.typewriter12{
  overflow: hidden;
  white-space: nowrap;
  animation: typing12 0.3s steps(12, end) forwards;
}

.typewriter13{
  overflow: hidden;
  white-space: nowrap;
  animation: typing13 0.3s steps(13, end) forwards;
}

.typewriter14{
  overflow: hidden;
  white-space: nowrap;
  animation: typing14 0.3s steps(14, end) forwards;
}

.typewriter15{
  overflow: hidden;
  white-space: nowrap;
  animation: typing15 0.3s steps(15, end) forwards;
}

.typewriter16{
  overflow: hidden;
  white-space: nowrap;
  animation: typing16 0.3s steps(16, end) forwards;
}

.typewriter17{
  overflow: hidden;
  white-space: nowrap;
  animation: typing17 0.3s steps(17, end) forwards;
}

.typewriter18{
  overflow: hidden;
  white-space: nowrap;
  animation: typing18 0.3s steps(18, end) forwards;
}

.typewriter19{
  overflow: hidden;
  white-space: nowrap;
  animation: typing19 0.3s steps(19, end) forwards;
}

.typewriter20{
  overflow: hidden;
  white-space: nowrap;
  animation: typing20 0.3s steps(20, end) forwards;
}

.typewriter21{
  overflow: hidden;
  white-space: nowrap;
  animation: typing21 0.3s steps(21, end) forwards;
}

.typewriter22{
  overflow: hidden;
  white-space: nowrap;
  animation: typing22 0.3s steps(22, end) forwards;
}

.typewriter23{
  overflow: hidden;
  white-space: nowrap;
  animation: typing23 0.3s steps(23, end) forwards;
}

.typewriter24{
  overflow: hidden;
  white-space: nowrap;
  animation: typing24 0.3s steps(24, end) forwards;
}

.typewriter25{
  overflow: hidden;
  white-space: nowrap;
  animation: typing25 0.3s steps(25, end) forwards;
}

.typewriter26{
  overflow: hidden;
  white-space: nowrap;
  animation: typing26 0.3s steps(26, end) forwards;
}

.typewriter27{
  overflow: hidden;
  white-space: nowrap;
  animation: typing27 0.3s steps(27, end) forwards;
}

.typewriter28{
  overflow: hidden;
  white-space: nowrap;
  animation: typing28 0.3s steps(28, end) forwards;
}

.typewriter29{
  overflow: hidden;
  white-space: nowrap;
  animation: typing29 0.3s steps(29, end) forwards;
}

.typewriter30{
  overflow: hidden;
  white-space: nowrap;
  animation: typing30 0.3s steps(30, end) forwards;
}

.typewriter-btn{
  overflow: hidden;
  white-space: nowrap;
  animation: typingBtn 0.3s steps(3, end) forwards;
}

@keyframes typing1{
  0% { width: 0%; }
  100% { width: 1em; }
}

@keyframes typing2{
  0% { width: 0%; }
  100% { width: 2em; }
}

@keyframes typing3{
  0% { width: 0%; }
  100% { width: 3em; }
}

@keyframes typing4{
  0% { width: 0%; }
  100% { width: 4em; }
}

@keyframes typing5{
  0% { width: 0%; }
  100% { width: 5em; }
}

@keyframes typing6{
  0% { width: 0%; }
  100% { width: 6em; }
}

@keyframes typing7{
  0% { width: 0%; }
  100% { width: 7em; }
}

@keyframes typing8{
  0% { width: 0%; }
  100% { width: 8em; }
}

@keyframes typing9{
  0% { width: 0%; }
  100% { width: 9em; }
}

@keyframes typing10{
  0% { width: 0%; }
  100% { width: 10em; }
}

@keyframes typing11{
  0% { width: 0%; }
  100% { width: 11em; }
}

@keyframes typing12{
  0% { width: 0%; }
  100% { width: 12em; }
}

@keyframes typing13{
  0% { width: 0%; }
  100% { width: 13em; }
}

@keyframes typing14{
  0% { width: 0%; }
  100% { width: 14em; }
}

@keyframes typing15{
  0% { width: 0%; }
  100% { width: 15em; }
}

@keyframes typing16{
  0% { width: 0%; }
  100% { width: 16em; }
}

@keyframes typing17{
  0% { width: 0%; }
  100% { width: 17em; }
}

@keyframes typing18{
  0% { width: 0%; }
  100% { width: 18em; }
}

@keyframes typing19{
  0% { width: 0%; }
  100% { width: 19em; }
}

@keyframes typing20{
  0% { width: 0%; }
  100% { width: 20em; }
}

@keyframes typing21{
  0% { width: 0%; }
  100% { width: 21em; }
}

@keyframes typing22{
  0% { width: 0%; }
  100% { width: 22em; }
}

@keyframes typing23{
  0% { width: 0%; }
  100% { width: 23em; }
}

@keyframes typing24{
  0% { width: 0%; }
  100% { width: 24em; }
}

@keyframes typing25{
  0% { width: 0%; }
  100% { width: 25em; }
}

@keyframes typing26{
  0% { width: 0%; }
  100% { width: 26em; }
}

@keyframes typing27{
  0% { width: 0%; }
  100% { width: 27em; }
}

@keyframes typing28{
  0% { width: 0%; }
  100% { width: 28em; }
}

@keyframes typing29{
  0% { width: 0%; }
  100% { width: 29em; }
}

@keyframes typing30{
  0% { width: 0%; }
  100% { width: 30em; }
}

@keyframes typingBtn{
  0% { width: 0%; }
  100% { width: 4em; }
}
</style>
