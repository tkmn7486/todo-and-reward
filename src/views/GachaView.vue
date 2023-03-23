<template>
  <div id="app">
    <!-- ガチャ一覧 -->
    <div class="gacha-home" v-if="now_view == 'main'">
        <p>コイン数：{{ now_point }}</p>
        <div class="gacha-card">
            <h3>{{ gacha_setting[0].gacha_name }}</h3>
            <div class="gacha-img-place">
                <img src="../assets/gacha.png">
            </div>
            <div class="btn-toolbar gacha-play-btn-place">
                <div class="btn-group">
                    <button class="btn btn-outline-dark gacha-play-btn" @click="playGacha('premium',1)">1回 {{ gacha_setting[0].spend_coins }}コイン</button>
                    <button class="btn btn-outline-dark gacha-play-btn" @click="playGacha('premium',6)">6回 {{ gacha_setting[0].spend_coins*5 }}コイン</button>
                </div>
            </div>
        </div>
        <br>
        <br>
        <div class="gacha-card">
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
      <video :class="now_video_view" muted playsinline preload="auto" id="gacha_video" @ended="videoEnded">
        <source :src="require('../assets/movie/'+movie_name+'.mp4')" type='video/mp4'>
      </video>
      <!-- <img :src="gp_perform" class="gacha-img"> -->
    </div>

    <!-- ガチャ結果 -->
    <div class="gacha-result" v-else-if="now_view == 'result'">
      <h3 class="get-prize-p-title">🎁 獲得 🎁</h3>
      <div class="card get-prize">
        <img :src="require('../assets/'+prize_img)" class="get-item-img">
        <p>{{ prize_name }}</p>
      </div>
      <button class="btn btn-outline-dark" @click="now_view = 'main'">戻る</button>
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

    let prize_name=ref('')
    let prize_movie_type=ref('')
    let prize_img=ref('')

    // 現在のコイン数
    let now_point = ref(0)

    const getGachaData=async()=>{
        let comp_data1 = []
        gacha_setting.value = []

        gacha_data.value = []

        let data1 = await axios.get('https://sheets.googleapis.com/v4/spreadsheets/1GRckIW0juHtiFHNSok8es6oW_miOV_9TNdiw7gLWnwc/values/premium!A1:E100?key=AIzaSyBYGo-htizvE31sI-GGUkMRsK0nZ7i5Wmw')
        comp_data1 = [{r:[],sr:[],ssr:[]}]
        gacha_setting.value.push(
            {
                gacha_id:"premium",
                gacha_name:data1.data.values[0][3],
                spend_coins: Number(data1.data.values[0][1])
            }
        )
        console.log('ガチャの設定：', gacha_setting.value[0])
        for(let i=2; i<data1.data.values.length;i++){
            if(data1.data.values[i][4]=='ssr'){
                // SSRレアリティの配列へ追加
                comp_data1[0].ssr.push(
                    {
                        name: data1.data.values[i][0],
                        img: data1.data.values[i][1],
                        explain: data1.data.values[i][2],
                        movie_type: data1.data.values[i][4]
                    }
                )
            }else if(data1.data.values[i][4]=='sr'){
                // SRレアリティの配列へ追加
                comp_data1[0].sr.push(
                    {
                        name: data1.data.values[i][0],
                        img: data1.data.values[i][1],
                        explain: data1.data.values[i][2],
                        movie_type: data1.data.values[i][4]
                    }
                )
            }else{
                // Rレアリティの配列へ追加
                comp_data1[0].r.push(
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

        console.log('ガチャのデータ：',gacha_data.value)

        now_view.value = 'main'
    }

    const playGacha=async(gacha_type,times)=>{
        let choice = confirm(times+'回引きますか？')
        if(choice == true){
            if(Number(now_point.value) < gacha_setting.value[0].spend_coins){
                console.log(now_point.value)
                console.log(gacha_setting.value[0].spend_coins)
                alert('コインが足りません')
            }else{
                now_point.value = Number(now_point.value)-Number(gacha_setting.value[0].spend_coins)
                await supabase.from('app_setting').delete().eq('type', 'hold_point')
                await supabase.from('app_setting').insert({type:"hold_point",contents:now_point.value});
                localStorage.setItem('now_point',now_point.value)
                prize_name.value = ''
                prize_movie_type.value = ''
                prize_img.value = ''
                if(gacha_type == 'premium'){
                    console.log('premiumのガチャを実行')
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

                    console.log('配列中身：',gacha_data.value[0].sr)

                    // let json_file = localStorage.getItem('my_items')
                    // let item_list = JSON.parse(json_file)
                    // console.log("アイテムリストの１つ目",item_list[0])
                    if(prize_movie_type.value == 'ssr'){
                        let random = Math.floor(Math.random() * Number(gacha_data.value[0].ssr.length));
                        console.log('SSRの'+random+'番を選択')
                        get_prize.value = gacha_data.value[0].ssr[random]
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
                        prize_name.value = gacha_data.value[0].ssr[random].name
                        prize_img.value = gacha_data.value[0].ssr[random].img
                    }else if(prize_movie_type.value == 'sr'){
                        let random = Math.floor(Math.random() * Number(gacha_data.value[0].sr.length));
                        console.log('SRの'+random+'番を選択')
                        get_prize.value = gacha_data.value[0].sr[random]
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
                        prize_name.value = gacha_data.value[0].sr[random].name
                        prize_img.value = gacha_data.value[0].sr[random].img
                    }else{
                        let random = Math.floor(Math.random() * Number(gacha_data.value[0].r.length));
                        console.log('Rの'+random+'番を選択')
                        get_prize.value = gacha_data.value[0].r[random]
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
                        prize_name.value = gacha_data.value[0].r[random].name
                        prize_img.value = gacha_data.value[0].r[random].img
                    }
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
        // while(document.getElementById('gacha_video')==null){
        //     console.log('動画読み込み待機中...')
        // }
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
      now_view,
      gp_perform,
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

.btn-group{
    margin:0 auto;
}

.get-prize{
    max-width: 80%;
    margin: 0 auto;
    max-height: 60%;
}

.btn{
    z-index: 10;
}

.gacha-card{
    width: 80%;
    border:double 3px rgb(147, 147, 147);
    border-radius:10px;
}

.gacha-card img{
    width: 80%;
}

.gacha-card button{
    margin:0 auto;
}

</style>