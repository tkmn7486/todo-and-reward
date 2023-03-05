<template>
  <div id="app">
    <!-- ガチャ一覧 -->
    <div class="gacha-home" v-if="now_view == 'main'">
        <div class="card gacha-card">
            <h3>{{ gacha_setting[0].gacha_name }}</h3>
            <img src="../assets/ticket_platinum.png">
            <div class="btn-toolbar gacha-play-btn-place">
                <div class="btn-group">
                    <button class="btn btn-outline-dark gacha-play-btn" @click="playGacha('gold',1)">1回 {{ gacha_setting[0].spend_coins }}コイン</button>
                    <button class="btn btn-outline-dark gacha-play-btn" @click="playGacha('gold',6)">6回 {{ gacha_setting[0].spend_coins*5 }}コイン</button>
                </div>
            </div>
        </div>
    </div>

    <!-- ガチャ演出画面 -->
    <div id="gacha_perform" class="gacha-perform" v-else-if="now_view == 'perform'">
      <!-- <video autoplay muted playsinline preload="auto" id="gacha_video" src="../assets/gacha_performance.mp4"></video> -->
      <video :class="now_video_view" muted playsinline preload="auto" id="gacha_video">
        <source :src="require('../assets/movie/'+movie_name+'.mp4')" type='video/mp4'>
      </video>
      <!-- <img :src="gp_perform" class="gacha-img"> -->
    </div>

    <!-- ガチャ結果 -->
    <div class="gacha-result" v-else-if="now_view == 'result'">
      <h3 class="get-prize-p-title">🎁 獲得 🎁</h3>
      <div class="card">
        <img :src="require('../assets/'+get_prize.img)" class="get-item-img">
        <p>{{ get_prize.name }}</p>
      </div>
      <button class="btn btn-outline-dark" @click="now_view = 'main'">戻る</button>
    </div> 

    <div class="loading-view" v-else-if="now_view == 'loading'">
        loading now ...
        <video src="../assets/movie/normal.mp4" class="gacha-video-inv" preload="auto" muted></video>
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
export default {
  name: 'HomeView',
  setup(){
    let now_view = ref('loading')
    let gp_perform = ref('../assets/gacha_performance.gif')
    let gacha_data = ref([])
    let get_prize = ref('')
    let gacha_setting = ref([])

    let video_status = ref('')
    let video_duration = ref('')
    let now_video_view = ref('gacha-video-inv')

    let movie_name = ref('')

    const getGachaData=async()=>{
        let comp_data1 = []
        let comp_data2 = []
        let comp_data3 = []
        gacha_setting.value = []

        gacha_data.value = []

        let data1 = await axios.get('https://sheets.googleapis.com/v4/spreadsheets/1GRckIW0juHtiFHNSok8es6oW_miOV_9TNdiw7gLWnwc/values/ガチャ景品(金)!A1:E100?key=AIzaSyBYGo-htizvE31sI-GGUkMRsK0nZ7i5Wmw')
        comp_data1.value = []
        gacha_setting.value.push(
            {
                gacha_id:"gold",
                gacha_name:data1.data.values[0][3],
                spend_coins:data1.data.values[0][1]
            }
        )
        for(let i=2; i<data1.data.values.length;i++){
            comp_data1.value.push(
                {
                    name: data1.data.values[i][0],
                    img: data1.data.values[i][1],
                    explain: data1.data.values[i][2],
                    prob: data1.data.values[i][3],
                    movie_type: data1.data.values[i][4]
                }
            )
        }
        console.log('data1完了')

        let data2 = await axios.get('https://sheets.googleapis.com/v4/spreadsheets/1GRckIW0juHtiFHNSok8es6oW_miOV_9TNdiw7gLWnwc/values/ガチャ景品(銀) !A2:E100?key=AIzaSyBYGo-htizvE31sI-GGUkMRsK0nZ7i5Wmw')
        comp_data2.value = []
        for(let i=1; i<data2.data.values.length;i++){
            comp_data2.value.push(
                {
                    name: data2.data.values[i][0],
                    img: data2.data.values[i][1],
                    explain: data2.data.values[i][2],
                    prob: data2.data.values[i][3],
                    movie_type: data2.data.values[i][4],
                }
            )
        }
        console.log('data2完了')

        let data3 = await axios.get('https://sheets.googleapis.com/v4/spreadsheets/1GRckIW0juHtiFHNSok8es6oW_miOV_9TNdiw7gLWnwc/values/ガチャ景品(銅)!A2:E100?key=AIzaSyBYGo-htizvE31sI-GGUkMRsK0nZ7i5Wmw')
        comp_data3.value = []
        for(let i=1; i<data3.data.values.length;i++){
            comp_data3.value.push(
                {
                    name: data3.data.values[i][0],
                    img: data3.data.values[i][1],
                    explain: data3.data.values[i][2],
                    prob: data3.data.values[i][3],
                    movie_type: data3.data.values[i][4]
                }
            )
        }
        console.log('data3完了')

        gacha_data.value.push(
            {
                gold: comp_data1,
                silver: comp_data2,
                bronze: comp_data3
            }
        )
        console.log('ガチャのデータ：',gacha_data.value[0].gold)

        now_view.value = 'main'
    }

    const playGacha=async(gacha_type,times)=>{
        let choice = confirm(times+'回引きますか？')
        if(choice == true){
            get_prize.value = []
            if(gacha_type == 'gold'){
                console.log('goldのガチャを実行')
                let random_value = Math.floor(Math.random() * 100);
                // random_value = 20
                console.log('乱数：', random_value)
                //レアリティの配列でループ
                console.log('景品数：', gacha_data.value[0].gold.value.length)
                for ( let i = 0; i < gacha_data.value[0].gold.value.length; i++ ) {
                    //乱数が現在値未満なら当たり
                    if ( random_value >= gacha_data.value[0].gold.value[i].prob ) {
                        console.log('あたり:',gacha_data.value[0].gold.value[i])
                        get_prize.value = gacha_data.value[0].gold.value[i]
                        break
                    }else{
                        continue
                    }
                }
            }
            console.log("動画タイプ：",get_prize.value)
            movie_name.value = get_prize.value.movie_type
            now_view.value = "perform"
            setTimeout(() => {
                getGachaVideo()
            }, 500);
        }
    }

    const getGachaVideo=async()=>{
        video_status.value = document.getElementById('gacha_video')
        console.log('video要素:', video_status.value)
        video_duration.value = video_status.value.duration
        console.log('動画の総時間:',video_duration.value)
        await gachaVideo()
    }

    const gachaVideo=()=>{
        now_video_view.value = 'gacha-video-active'
        video_status.value.play()

        console.log('待機時間（m秒）:', video_duration.value*1000)

        // 終了処理
        setTimeout(()=>{
            now_video_view.value = 'gacha-video-inv'
            now_view.value = 'result'
        }, video_duration.value*1000);
    }

    onMounted(()=>{
        getGachaData()
    })
    return{
      now_view,
      gp_perform,
      gacha_data,
      get_prize,
      gacha_setting,
      now_video_view,
      video_status,
      video_duration,
      movie_name,
      playGacha,
      getGachaData,
      getGachaVideo,
      gachaVideo
    }
  }
}
</script>

<style>
.gacha-img{
  width: 30
}

#gacha_video{
    width: 100%;
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

.gacha-card{
    width: 90%;
    margin:0 auto;
}

.gacha-play-btn-place{
    margin: 0 auto;
    padding: 10px 0;
}

</style>