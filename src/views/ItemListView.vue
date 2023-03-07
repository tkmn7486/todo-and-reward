<template>
  <div class="item_list">
    <!-- 現在の所持品 -->
    <div class="now-in-possession card sub-card" v-if="now_view == 'hold_items'">
      <h4>-- 所持品 --</h4>
      <table class="table">
        <thead>
          <tr>
            <th class="table-icon-place"></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item,index in item_list" :key="item.id">
            <td>
              <div class="table-item-icon-frame">
                <img :src= "require('../assets/'+item.img)" class="table-item-icon">
              </div>
            </td>
            <td @click="openItemDetail(item,index)">{{ item.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 全アイテム一覧 -->
    <div class="all-item-list" v-else-if="now_view == 'all_items'">

    </div>

    <!-- アイテム詳細 -->
    <div class="item-detail" v-else-if="now_view == 'detail'">
      <div class="card sub-card">
        <img :src="require('../assets/'+selected_item[0].img)" class="card-img-top">
        <div class="card-body">
          <h5 class="card-title">{{ selected_item[0].name }}</h5>
          <p class="card-text">{{ selected_item[0].explain }}</p>
          <br>
          <button class="btn btn-outline-dark">使用する</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {ref,onMounted} from 'vue'
import {supabase} from '../supabase'
export default {
  name: 'HomeView',
  setup(){
    let now_view = ref('hold_items')
    let item_list = ref([])

    let selected_item = ref([])

    const openItemDetail=(item,index)=>{
      console.log('item:',item)
      console.log('index:',index)
      selected_item.value = []
      selected_item.value.push(
        {
          index:index,
          name:item.name,
          img: item.img,
          explain:item.explain
        }
      )
      now_view.value = 'detail'
    }

    onMounted(async()=>{
      let {
        data: item
      } = await supabase.from('app_setting').select('type,contents');

      console.log('取得データ：', item[0])

      if(item[0].type == 'got_item_list'){
        item_list.value = JSON.parse(item[0].contents)
        console.log('got_item_list:', item_list.value)
      }else{
        item_list.value = JSON.parse(item[1].contents)
        console.log('got_item_list:', item_list.value)
      }
      localStorage.setItem('my_items',JSON.stringify(item_list.value))
    })
    return{
      now_view,
      item_list,
      selected_item,
      openItemDetail
    }
  }
}
</script>

<style>
.table-icon-place{
  width: 100px;
}

.table-item-icon-frame{
  width: 50px;
  height: 50px;
  border: solid 1px rgb(210, 210, 210);
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.818);
}

.table-item-icon{
  width: 50px;
  margin: auto 0;
  padding:3px;
}

.sub-card{
  width: 95%;
  margin: 0 auto;
}

</style>