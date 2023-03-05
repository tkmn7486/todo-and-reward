<template>
  <div class="home">
    <!-- todoリスト -->
    <div class="todo-list card" v-if="now_view == 'main'">
      <table class="table">
        <tbody>
          <tr v-for="todo in todo_list" :key="todo.id">
            <td class="type-icon-place"><img :src="require('../assets/'+todo.type+'.png')"></td>
            <td>{{ todo.name }}</td>
            <td>
              <button class="btn btn-outline-dark" @click="getAchieve(todo.point)">獲得</button>
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
export default {
  name: 'HomeView',
  setup(){
    let now_view = ref('loading')

    let todo_list = ref([])

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
      now_view.value = 'main'
    }

    const getAchieve=(item)=>{
      let choose = confirm('項目を達成しましたか？')
      if(choose == true){
        let now_all_point = localStorage.getItem('now_point')
        now_all_point = Number(now_all_point) + Number(item)
        localStorage.setItem('now_point', String(now_all_point));
        alert(item+'ポイント獲得しました!')
        console.log('現在のポイント合計:', localStorage.getItem('now_point'))
      }
    }

    const backHome=()=>{
      now_view.value = 'main'
    }

    onMounted(()=>{
      getTodoList()
    })
    return{
      now_view,
      todo_list,
      getTodoList,
      getAchieve,
      backHome,
    }
  }
}
</script>

<style>
.gacha-img{
  width: 30
}

.type-icon-place img{
  width:50px;
}

</style>
