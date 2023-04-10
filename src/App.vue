<template>
  <div id="app">
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
                <p>所持品</p>
                <small>▲</small>
              </router-link>
            </td>
            <td>
              <router-link to="/alchemy">
                <img src="./assets/nav_icon/alchemy.png" class="nav-icon">
                <p>錬金術</p>
                <small>▲</small>
              </router-link>
            </td>
          </tr>
        </table>
      </div>
    </nav>
    <!-- <div class="reload-btn">
      <button class="btn btn-sm" @click="forceReload()">🔄</button>
    </div> -->
    <router-view id="router-view" />
  </div>
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

html{
  background-color: black;
}

#app {
  -webkit-font-smoothing: 'dot-style-10';
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-family:'dot-style-10';
  background-color: black;
}

.card{
  z-index: 0;
}

#router-view{
  margin-top: 50px;
  z-index: -1;
  background-color:none;
  min-height: 100vh;
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
  animation: typing1 0.3s steps(1, end) ;
/*animation: アニメーション名｜時間｜分割数｜ループ */
}

.typewriter2{
  overflow: hidden;
  white-space: nowrap;
  animation: typing2 0.3s steps(2, end) ;
}

.typewriter3{
  overflow: hidden;
  white-space: nowrap;
  animation: typing3 0.3s steps(3, end) ;
}

.typewriter4{
  overflow: hidden;
  white-space: nowrap;
  animation: typing4 0.3s steps(4, end) ;
}

.typewriter5{
  overflow: hidden;
  white-space: nowrap;
  animation: typing5 0.3s steps(5, end) ;
}

.typewriter6{
  overflow: hidden;
  white-space: nowrap;
  animation: typing6 0.3s steps(6, end) ;
}

.typewriter7{
  overflow: hidden;
  white-space: nowrap;
  animation: typing7 0.3s steps(7, end) ;
}

.typewriter8{
  overflow: hidden;
  white-space: nowrap;
  animation: typing8 0.3s steps(8, end) ;
}

.typewriter9{
  overflow: hidden;
  white-space: nowrap;
  animation: typing9 0.3s steps(9, end) ;
}

.typewriter10{
  overflow: hidden;
  white-space: nowrap;
  animation: typing10 0.3s steps(10, end) ;
}

.typewriter11{
  overflow: hidden;
  white-space: nowrap;
  animation: typing11 0.3s steps(11, end) ;
}

.typewriter12{
  overflow: hidden;
  white-space: nowrap;
  animation: typing12 0.3s steps(12, end) ;
}

.typewriter13{
  overflow: hidden;
  white-space: nowrap;
  animation: typing13 0.3s steps(13, end) ;
}

.typewriter14{
  overflow: hidden;
  white-space: nowrap;
  animation: typing14 0.3s steps(14, end) ;
}

.typewriter15{
  overflow: hidden;
  white-space: nowrap;
  animation: typing15 0.3s steps(15, end) ;
}

.typewriter16{
  overflow: hidden;
  white-space: nowrap;
  animation: typing16 0.3s steps(16, end) ;
}

.typewriter17{
  overflow: hidden;
  white-space: nowrap;
  animation: typing17 0.3s steps(17, end) ;
}

.typewriter18{
  overflow: hidden;
  white-space: nowrap;
  animation: typing18 0.3s steps(18, end) ;
}

.typewriter19{
  overflow: hidden;
  white-space: nowrap;
  animation: typing19 0.3s steps(19, end) ;
}

.typewriter20{
  overflow: hidden;
  white-space: nowrap;
  animation: typing20 0.3s steps(20, end) ;
}

.typewriter21{
  overflow: hidden;
  white-space: nowrap;
  animation: typing21 0.3s steps(21, end) ;
}

.typewriter22{
  overflow: hidden;
  white-space: nowrap;
  animation: typing22 0.3s steps(22, end) ;
}

.typewriter23{
  overflow: hidden;
  white-space: nowrap;
  animation: typing23 0.3s steps(23, end) ;
}

.typewriter24{
  overflow: hidden;
  white-space: nowrap;
  animation: typing24 0.3s steps(24, end) ;
}

.typewriter25{
  overflow: hidden;
  white-space: nowrap;
  animation: typing25 0.3s steps(25, end) ;
}

.typewriter26{
  overflow: hidden;
  white-space: nowrap;
  animation: typing26 0.3s steps(26, end) ;
}

.typewriter27{
  overflow: hidden;
  white-space: nowrap;
  animation: typing27 0.3s steps(27, end) ;
}

.typewriter28{
  overflow: hidden;
  white-space: nowrap;
  animation: typing28 0.3s steps(28, end) ;
}

.typewriter29{
  overflow: hidden;
  white-space: nowrap;
  animation: typing29 0.3s steps(29, end) ;
}

.typewriter30{
  overflow: visible;
  white-space: normal;
  animation: typing30 0.3s steps(30, end);
}

.typewriter31{
  overflow: hidden;
  white-space: nowrap;
  animation: typing31 0.3s steps(31, end);
}
.typewriter32{
  overflow: hidden;
  white-space: nowrap;
  animation: typing32 0.3s steps(32, end) ;
}
.typewriter33{
  overflow: hidden;
  white-space: nowrap;
  animation: typing33 0.3s steps(33, end) ;
}
.typewriter34{
  overflow: hidden;
  white-space: nowrap;
  animation: typing34 0.3s steps(34, end) ;
}
.typewriter35{
  overflow: hidden;
  white-space: nowrap;
  animation: typing35 0.3s steps(35, end) ;
}
.typewriter36{
  overflow: hidden;
  white-space: nowrap;
  animation: typing36 0.3s steps(36, end) ;
}
.typewriter37{
  overflow: hidden;
  white-space: nowrap;
  animation: typing37 0.3s steps(37, end) ;
}
.typewriter38{
  overflow: hidden;
  white-space: nowrap;
  animation: typing38 0.3s steps(38, end) ;
}
.typewriter39{
  overflow: hidden;
  white-space: nowrap;
  animation: typing39 0.3s steps(39, end) ;
}
.typewriter40{
  overflow: hidden;
  white-space: nowrap;
  animation: typing40 0.3s steps(40, end) ;
}
.typewriter41{
  overflow: hidden;
  white-space: nowrap;
  animation: typing41 0.3s steps(41, end) ;
}
.typewriter42{
  overflow: hidden;
  white-space: nowrap;
  animation: typing42 0.3s steps(42, end) ;
}
.typewriter43{
  overflow: hidden;
  white-space: nowrap;
  animation: typing43 0.3s steps(43, end) ;
}
.typewriter44{
  overflow: hidden;
  white-space: nowrap;
  animation: typing44 0.3s steps(44, end) ;
}
.typewriter45{
  overflow: hidden;
  white-space: nowrap;
  animation: typing45 0.3s steps(45, end) ;
}
.typewriter46{
  overflow: hidden;
  white-space: nowrap;
  animation: typing46 0.3s steps(46, end) ;
}
.typewriter47{
  overflow: hidden;
  white-space: nowrap;
  animation: typing47 0.3s steps(47, end) ;
}
.typewriter48{
  overflow: hidden;
  white-space: nowrap;
  animation: typing48 0.3s steps(48, end) ;
}
.typewriter49{
  overflow: hidden;
  white-space: nowrap;
  animation: typing49 0.3s steps(49, end) ;
}
.typewriter50{
  overflow: hidden;
  white-space: nowrap;
  animation: typing50 0.3s steps(50, end) ;
}

.typewriter-btn{
  overflow: hidden;
  white-space: nowrap;
  animation: typingBtn 0.3s steps(3, end) ;
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

@keyframes typing31{
  0% { width: 0%; }
  100% { width: 31em; }
}
@keyframes typing32{
  0% { width: 0%; }
  100% { width: 32em; }
}
@keyframes typing33{
  0% { width: 0%; }
  100% { width: 33em; }
}
@keyframes typing34{
  0% { width: 0%; }
  100% { width: 34em; }
}
@keyframes typing35{
  0% { width: 0%; }
  100% { width: 35em; }
}
@keyframes typing36{
  0% { width: 0%; }
  100% { width: 36em; }
}
@keyframes typing37{
  0% { width: 0%; }
  100% { width: 37em; }
}
@keyframes typing38{
  0% { width: 0%; }
  100% { width: 38em; }
}
@keyframes typing39{
  0% { width: 0%; }
  100% { width: 39em; }
}
@keyframes typing40{
  0% { width: 0%; }
  100% { width: 40em; }
}
@keyframes typing41{
  0% { width: 0%; }
  100% { width: 41em; }
}
@keyframes typing42{
  0% { width: 0%; }
  100% { width: 42em; }
}
@keyframes typing43{
  0% { width: 0%; }
  100% { width: 43em; }
}
@keyframes typing44{
  0% { width: 0%; }
  100% { width: 44em; }
}
@keyframes typing45{
  0% { width: 0%; }
  100% { width: 45em; }
}
@keyframes typing46{
  0% { width: 0%; }
  100% { width: 46em; }
}
@keyframes typing47{
  0% { width: 0%; }
  100% { width: 47em; }
}
@keyframes typing48{
  0% { width: 0%; }
  100% { width: 48em; }
}
@keyframes typing49{
  0% { width: 0%; }
  100% { width: 49em; }
}
@keyframes typing50{
  0% { width: 0%; }
  100% { width: 50em; }
}


@keyframes typingBtn{
  0% { width: 0%; }
  100% { width: 4em; }
}
</style>
