<template>
  <div id="app">
    <!-- ガチャ一覧 -->
    <div class="gacha-home" v-if="now_view == 'main'">
        <div class="point-view">
            <img src="../assets/coin.png" class="point-img">
            <label><h5>{{ now_point }}</h5></label>
        </div>
        <div class="carousel-view nes-balloon">
        <carousel :items-to-show="1">
          <slide v-for="g, index in gacha_setting" :key="g.id">
            <div class="gacha-card">
                <div class="gacha-name">
                    <h3 :class="'typewriter'+String(g.gacha_name.length)">{{ g.gacha_name }}</h3>
                </div>
                <div class="gacha-img-place">
                    <img class="gacha-img" :src="g.gacha_img">
                </div>
                <div class="btn-toolbar gacha-play-btn-place">
                    <div class="btn-g">
                        <button class="nes-btn gacha-play-btn" @click="playGacha(index,1)">
                            <img class="gacha-btn-key" src="../assets/coin.png">
                            {{g.spend_coins}}枚
                        </button>
                        <button class="nes-btn gacha-play-btn" @click="playGacha(index,1)">
                            <img class="gacha-btn-key" src="../assets/gacha_img/premium_key.png">
                            1個
                        </button>
                    </div>
                </div>
            </div>
          </slide>

          <template #addons>
            <navigation />
            <pagination />
          </template>
        </carousel>
        </div>
    </div>

    <!-- ガチャ演出画面 -->
    <div id="gacha_perform" class="gacha-perform" v-else-if="now_view == 'perform'">
      <!-- <video autoplay muted playsinline preload="auto" id="gacha_video" src="../assets/gacha_performance.mp4"></video> -->
      <video :class="now_video_view" muted playsinline preload="auto" id="gacha_video" @ended="videoEnded">
        <source :src="require('../assets/movie/'+movie_name+'.mp4')" type='video/mp4'>
      </video>
    </div>

    <!-- ガチャ結果 -->
    <div class="gacha-result" v-else-if="now_view == 'result'">
      <h3 class="get-prize-p-title">🎁 獲得 🎁</h3>
      <div class="get-prize">
        <div class="nes-balloon get-item-img-place">
            <img :src="require('../assets/item/'+prize_img)" class="get-item-img">
        </div>
        <p>【{{ prize_name }}】</p>
      </div>
      <br>
      <button class="nes-btn" @click="now_view = 'main'">戻る</button>
    </div> 

    <div class="loading-view" v-else-if="now_view == 'loading'">
        loading now ...
        <video src="../assets/movie/r.mp4" class="gacha-video-inv" preload="auto" muted></video>
        <video src="../assets/movie/sr.mp4" class="gacha-video-inv" preload="auto" muted></video>
        <video src="../assets/movie/ssr.mp4" class="gacha-video-inv" preload="auto" muted></video>
    </div>
    
    <!-- エラー -->
    <div class="error" v-else>
        <p>error</p>
    </div>
  </div>
</template>

<script>
import {ref,onMounted} from 'vue'
import axios from 'axios'
import {supabase} from '../supabase'
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel';

export default {
  name: 'HomeView',
  components:{
    Carousel,
    Slide,
    Pagination,
    Navigation,
  },
  setup(){
    let now_view = ref('loading')

    let gacha= ref(
        [
            {name:"premium",img:require("../assets/gacha_img/premium.png"),ss:"https://sheets.googleapis.com/v4/spreadsheets/1GRckIW0juHtiFHNSok8es6oW_miOV_9TNdiw7gLWnwc/values/premium!A1:E100?key=AIzaSyBYGo-htizvE31sI-GGUkMRsK0nZ7i5Wmw"},
            {name:"play",img:require("../assets/gacha_img/blue_silver.png"),ss:"https://sheets.googleapis.com/v4/spreadsheets/1GRckIW0juHtiFHNSok8es6oW_miOV_9TNdiw7gLWnwc/values/play!A1:E100?key=AIzaSyBYGo-htizvE31sI-GGUkMRsK0nZ7i5Wmw"},
            {name:"food",img:require("../assets/gacha_img/normal.png"),ss:"https://sheets.googleapis.com/v4/spreadsheets/1GRckIW0juHtiFHNSok8es6oW_miOV_9TNdiw7gLWnwc/values/food!A1:E100?key=AIzaSyBYGo-htizvE31sI-GGUkMRsK0nZ7i5Wmw"},
        ]
    )

    let gacha_data = ref([])
    let get_prize = ref('')
    let gacha_setting = ref([])

    let video_status = ref('')
    let video_duration = ref('')
    let now_video_view = ref('gacha-video-inv')

    let movie_name = ref('')

    let prize_name=ref('')
    let prize_movie_type=ref('')
    let prize_img=ref('')

    // 現在のコイン数
    let now_point = ref(0)

    // ガチャデータの取得
    const getGachaData=async()=>{
        let comp_data1 = []
        gacha_setting.value = []

        gacha_data.value = []

        for(let p=0; p<gacha.value.length; p++){
            comp_data1.push({r:[],sr:[],ssr:[]})
            let data1 = await axios.get(gacha.value[p].ss)
            gacha_setting.value.push(
                {
                    gacha_id: gacha.value[p].name,
                    gacha_name:data1.data.values[0][3],
                    gacha_img: gacha.value[p].img,
                    spend_coins: Number(data1.data.values[0][1])
                }
            )
            console.log('ガチャの設定：', gacha_setting.value[p])
            for(let i=2; i<data1.data.values.length;i++){
                if(data1.data.values[i][4]=='ssr'){
                    // SSRレアリティの配列へ追加
                    comp_data1[p].ssr.push(
                        {
                            name: data1.data.values[i][0],
                            img: data1.data.values[i][1],
                            explain: data1.data.values[i][2],
                            movie_type: data1.data.values[i][4]
                        }
                    )
                }else if(data1.data.values[i][4]=='sr'){
                    // SRレアリティの配列へ追加
                    comp_data1[p].sr.push(
                        {
                            name: data1.data.values[i][0],
                            img: data1.data.values[i][1],
                            explain: data1.data.values[i][2],
                            movie_type: data1.data.values[i][4]
                        }
                    )
                }else{
                    // Rレアリティの配列へ追加
                    comp_data1[p].r.push(
                        {
                            name: data1.data.values[i][0],
                            img: data1.data.values[i][1],
                            explain: data1.data.values[i][2],
                            movie_type: data1.data.values[i][4]
                        }
                    )
                }
            }
            console.log('data1完了')

            gacha_data.value = comp_data1
        }

        console.log('ガチャのデータ：',gacha_data.value)

        now_view.value = 'main'
    }

    const playGacha=async(gacha_type,times)=>{
        let choice = confirm(times+'回引きますか？')
        if(choice == true){
            if(Number(now_point.value) < gacha_setting.value[gacha_type].spend_coins){
                console.log(now_point.value)
                console.log(gacha_setting.value[0].spend_coins)
                alert('コインが足りません')
            }else{
                now_point.value = Number(now_point.value)-Number(gacha_setting.value[gacha_type].spend_coins)
                await supabase.from('app_setting').delete().eq('type', 'hold_point')
                await supabase.from('app_setting').insert({type:"hold_point",contents:now_point.value});
                localStorage.setItem('now_point',now_point.value)
                prize_name.value = ''
                prize_movie_type.value = ''
                prize_img.value = ''

                console.log('ガチャを実行:',gacha.value[gacha_type].name)
                let random_value = Math.floor(Math.random() * 100);
                console.log('レアリティ乱数：', random_value)

                // レアリティ決定
                if(random_value >=95){
                    // SSRクラス
                    prize_movie_type.value = 'ssr'
                }else if(random_value >=75){
                    // SRクラス
                    prize_movie_type.value = 'sr'
                }else{
                    // Rクラス
                    prize_movie_type.value = 'r'
                }

                console.log('レアリティ確定:',prize_movie_type.value)

                console.log('配列中身：',gacha_data.value[gacha_type].sr)

                // let json_file = localStorage.getItem('my_items')
                // let item_list = JSON.parse(json_file)
                // console.log("アイテムリストの１つ目",item_list[0])
                if(prize_movie_type.value == 'ssr'){
                    let random = Math.floor(Math.random() * Number(gacha_data.value[gacha_type].ssr.length));
                    console.log('SSRの'+random+'番を選択')
                    get_prize.value = gacha_data.value[gacha_type].ssr[random]
                    console.log('獲得アイテム：', get_prize.value)
                    if(localStorage.getItem('my_items') != null){
                        // console.log(item_list)
                        console.log("獲得品：",get_prize.value)
                        // await item_list.push(get_prize.value)
                        // localStorage.setItem('my_items',JSON.stringify(item_list))
                        await supabase.from('got_items').insert(
                            {
                                item_name: get_prize.value.name,
                                img: get_prize.value.img,
                                explain: get_prize.value.explain,
                                rare: get_prize.value.movie_type
                            }
                        );
                    }else{
                        // localStorage.setItem('my_items',JSON.stringify([get_prize.value]))
                        await supabase.from('got_items').insert(
                            {
                                item_name: get_prize.value.name,
                                img: get_prize.value.img,
                                explain: get_prize.value.explain,
                                rare: get_prize.value.movie_type
                            }
                        );
                    }
                    prize_name.value = gacha_data.value[gacha_type].ssr[random].name
                    prize_img.value = gacha_data.value[gacha_type].ssr[random].img
                }else if(prize_movie_type.value == 'sr'){
                    let random = Math.floor(Math.random() * Number(gacha_data.value[0].sr.length));
                    console.log('SRの'+random+'番を選択')
                    get_prize.value = gacha_data.value[gacha_type].sr[random]
                    console.log('獲得アイテム：', get_prize.value)
                    if(localStorage.getItem('my_items') != null){
                        console.log("獲得品：",get_prize.value)
                        // console.log(item_list)
                        // await item_list.push(get_prize.value)
                        // localStorage.setItem('my_items',JSON.stringify(item_list))
                        await supabase.from('got_items').insert(
                            {
                                item_name: get_prize.value.name,
                                img: get_prize.value.img,
                                explain: get_prize.value.explain,
                                rare: get_prize.value.movie_type
                            }
                        );
                    }else{
                        localStorage.setItem('my_items',JSON.stringify([get_prize.value]))
                        await supabase.from('got_items').insert(
                            {
                                item_name: get_prize.value.name,
                                img: get_prize.value.img,
                                explain: get_prize.value.explain,
                                rare: get_prize.value.movie_type
                            }
                        );
                    }
                    prize_name.value = gacha_data.value[gacha_type].sr[random].name
                    prize_img.value = gacha_data.value[gacha_type].sr[random].img
                }else{
                    let random = Math.floor(Math.random() * Number(gacha_data.value[gacha_type].r.length));
                    console.log('Rの'+random+'番を選択')
                    get_prize.value = gacha_data.value[gacha_type].r[random]
                    console.log('獲得アイテム：', get_prize.value)
                    if(localStorage.getItem('my_items') != null){
                        console.log("獲得品：",get_prize.value)
                        // console.log(item_list)
                        // await item_list.push(get_prize.value)
                        // localStorage.setItem('my_items',JSON.stringify(item_list))
                        await supabase.from('got_items').insert(
                            {
                                item_name: get_prize.value.name,
                                img: get_prize.value.img,
                                explain: get_prize.value.explain,
                                rare: get_prize.value.movie_type
                            }
                        );
                    }else{
                        localStorage.setItem('my_items',JSON.stringify([get_prize.value]))
                        await supabase.from('got_items').insert(
                            {
                                item_name: get_prize.value.name,
                                img: get_prize.value.img,
                                explain: get_prize.value.explain,
                                rare: get_prize.value.movie_type
                            }
                        );
                    }
                    prize_name.value = gacha_data.value[gacha_type].r[random].name
                    prize_img.value = gacha_data.value[gacha_type].r[random].img
                }
                console.log("動画タイプ：",prize_movie_type.value)
                movie_name.value = prize_movie_type.value
                now_view.value = "perform"
                setTimeout(() => {
                    getGachaVideo()
                }, 500);
            }
        }
    }

    const getGachaVideo=async()=>{
        while(document.getElementById('gacha_video')==null){
            console.log('動画読み込み待機中...')
        }
        video_status.value = document.getElementById('gacha_video')
        console.log('video要素:', video_status.value)
        video_duration.value = video_status.value.duration
        console.log('動画の総時間:',video_duration.value)
        await gachaVideo()
    }

    const gachaVideo=()=>{
        now_video_view.value = 'gacha-video-active'
        video_status.value.play()
    }

    const videoEnded=()=>{
        now_video_view.value = 'gacha-video-inv'
        now_view.value = 'result'
    }

    onMounted(()=>{
        getGachaData()

        now_point.value = Number(localStorage.getItem('now_point'))
    })
    return{
      gacha,
      now_view,
      gacha_data,
      get_prize,
      gacha_setting,
      now_video_view,
      video_status,
      video_duration,
      movie_name,
      prize_name,
      prize_movie_type,
      prize_img,
      now_point,
      playGacha,
      getGachaData,
      getGachaVideo,
      gachaVideo,
      videoEnded
    }
  }
}
</script>

<style lang="scss">
.gacha-img{
    width: 300px;
}

.gacha-img-place{
    width: 80%;
    margin: 0 auto;
}

.gacha-img-place img{
    width: 80%;
}

.loading-view{
    color: white;
}

#gacha_video{
    width: 100%;
    position:fixed;
    top:0;
    left:0;
    max-width: 100vw;
    height: 100vh;
}

.gacha-video-inv{
    opacity: 0;
}

.gacha-video-active{
    opacity: 100;
}

.get-prize-p-title{
    font-weight: bold;
}

.gacha-play-btn-place{
    margin: 0 auto;
    padding: 10px 10px;
}

.gacha-play-btn{
    margin: 10px;
    
}

.get-prize{
    max-width: 80%;
    margin: 0 auto;
    max-height: 60%;
}

.get-item-img{
    width: 80%;
    min-width: 200px;
    filter: drop-shadow(0px 0px 3px #fdfdfd);
}

.btn{
    z-index: 10;
}

.gacha-card{
    width: 80%;
}

.gacha-card button{
    margin:0 auto;
}
.get-item-img-place{
    background-color: rgb(255, 255, 255);
    // filter:drop-shadow(0px 0px 1px #fdfdfd);
}

.gacha-name{
    margin: 0 auto;
}

.gacha-name h3{
    margin: 0 auto;
}

.point-img{
    display: inline-block;
    width: 40px;
}

.point-view{
    label{
      vertical-align: -3px;
    }
    h5{
        color: white;
    }
}

.btn-g{
    margin: 0 auto;
}

.btn-g button{
    display: inline-block;
}

.carousel-view{
    min-width: 350px;
    max-width: 80%;
    padding: 10px;
}

.gacha-perform{
    position: fixed;
    top:0;
    left:0;
    width: 100vw;
    height: 100vh;
    background-color: rgb(0, 0, 0);
    z-index:100;
}

.gacha-btn-key{
    width: 30px;
    margin: 5px;
}

.gacha-result{
    h3{
        color: white;
    }
    p{
        color: white;
    }
}
</style>