<template>
  <div class="home">
    <!-- todoリスト -->
    <div class="todo-list" v-if="now_view == 'main'">
      <div class="search-box">
        <div class="input-btn">
          <input type="radio" value="" v-model="radio_btn"><label>ぜんぶ</label>
        </div>
        <div class="input-btn">
          <input type="radio" value="daily" v-model="radio_btn"><label>デイリー</label>
        </div>
        <div class="input-btn">
          <input type="radio" value="weekly" v-model="radio_btn"><label>ウィークリー</label>
        </div>
        <div class="input-btn">
          <input type="radio" value="event" v-model="radio_btn"><label>イベント</label>
        </div>
      </div>
      <table class="table">
        <tbody>
          <tr v-for="todo in todo_list" :key="todo.id" class="task-box">
            <!-- <td class="type-icon-place"><img :src="require('../assets/'+todo.type+'.png')"></td> -->
            <td>
              <p class="nes-balloon type">{{ todo.type }}</p>
            </td>
            <td>
              <p :class="'typewriter'+String(todo.name.length)">{{ todo.name }}</p>
            </td>
            <td class="todo-name-td">
              <button class="nes-btn typewriter-btn" @click="getAchieve(todo.point)"></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 獲得画面 -->
    <div class="get-view" v-else-if="now_view == 'get_view'">
      獲得
      <button class="btn btn-outline-dark" @click="backHome()">戻る</button>
    </div>

    <!-- ロード画面 -->
    <div class="loading" v-else-if="now_view == 'loading'">
      loading now ...
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

    let todo_list = ref([])
    let origin_list = ref([])

    let radio_btn = ref('')

    // データ取得
    const getFbData=async(table_name, where_search)=>{
      let {
        data: name,
        error,
        status,
      } = await supabase.from(table_name).select(where_search);

      console.log(name);
      console.log(error);
      console.log(status);
    }

    const addFbData=async()=>{
      await supabase
        .from('got_item_list')
        .insert([{item_data:'{name:"item"}'}]);
    }

    // supabaseの指定IDを削除
    const deleteFbData=async()=>{
      await supabase
        .from('got_item_list')
        .delete()
        .eq('id', 2)
    }

    const getTodoList=async()=>{
      todo_list.value = []
      let data_list = await axios.get('https://sheets.googleapis.com/v4/spreadsheets/1GRckIW0juHtiFHNSok8es6oW_miOV_9TNdiw7gLWnwc/values/達成目標項目!A2:H1000?key=AIzaSyBYGo-htizvE31sI-GGUkMRsK0nZ7i5Wmw')
      for(let i=0; i<data_list.data.values.length; i++){
        todo_list.value.push(
          {
            type: data_list.data.values[i][0],
            rank: data_list.data.values[i][1],
            point: data_list.data.values[i][2],
            name: data_list.data.values[i][3],
            explain: data_list.data.values[i][4],
          }
        )
      }
      console.log("todo_list:", todo_list.value)
      origin_list.value = todo_list.value
      now_view.value = 'main'
    }

    const sortList=()=>{

    }

    const getAchieve=async(i)=>{
      let choose = confirm('項目を達成しましたか？')
      if(choose == true){
        let now_all_point = localStorage.getItem('now_point')
        now_all_point = Number(now_all_point) + Number(i)
        localStorage.setItem('now_point', String(now_all_point));

        await supabase
          .from('app_setting')
          .delete()
          .eq('type', 'hold_point')

        await supabase
          .from('app_setting')
          .insert(
            {
              type:"hold_point",
              contents:Number(now_all_point)
            }
          );
        
        alert(i+'ポイント獲得しました!')
        console.log('現在のポイント合計:', localStorage.getItem('now_point'))
      }
    }

    const backHome=()=>{
      now_view.value = 'main'
    }

    onMounted(async()=>{
      getTodoList()
      let {
        data: data,
      } = await supabase.from('app_setting').select('id,type,contents');
      
      if(data[0].type == 'hold_point'){
        console.log('point:',data[0].contents)
        localStorage.setItem('now_point',data[0].contents)
      }else{
        console.log('point:',data[1].contents)
        localStorage.setItem('now_point',data[1].contents)
      }
    })
    return{
      now_view,
      todo_list,
      origin_list,
      radio_btn,
      getTodoList,
      getAchieve,
      backHome,
      getFbData,
      addFbData,
      deleteFbData,
      sortList
    }
  }
}
</script>

<style lang="scss">
.gacha-img{
  width: 30
}

.type-icon-place img{
  width:50px;
}

.todo-name-td{
  text-align: left;
}

.todo-name-td p{
  text-align: center;
}


table .nes-balloon{
  padding:0;
}

.todo-list{
  .type{
    color: black;
  }
  p{
    color: white;
  }
}

.input-btn{
  display: inline-block;
  padding-left:5px;
  label{
    color: white;
  }
}

.search-box{
  // border-top:dashed 5px white;
  // border-bottom:dashed 5px white;
  margin-bottom: 10px;
}

.todo-list{
  padding-bottom: 100px;
}
</style>
