<template>
  <div class="item_list">
    <!-- 現在の所持品 -->
    <div class="now-in-possession card">
      <h4>-- 所持品 --</h4>
      <table class="table">
        <thead>
          <tr>
            <th class="table-icon-place"></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in item_list" :key="item.id">
            <td>
              <div class="table-item-icon-frame">
                <img :src= "require('../assets/'+item.img)" class="table-item-icon">
              </div>
            </td>
            <td>{{ item.name }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 全アイテム一覧 -->
    <div class="all-item-list">

    </div>
  </div>
</template>

<script>
import {ref,onMounted} from 'vue'
export default {
  name: 'HomeView',
  setup(){
    let item_list = ref([])

    onMounted(()=>{
      setInterval(() => {
        item_list.value = JSON.parse(localStorage.getItem('my_items'))
        console.log('item_list:',item_list.value)
      }, 1000);
    })
    return{
      item_list
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

</style>