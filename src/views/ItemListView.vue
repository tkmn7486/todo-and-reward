<template>
  <div class="item_list">
    <!-- 現在の所持品 -->
    <div class="now-in-possession sub-card" v-if="now_view == 'hold_items'">
      <div class="page-title">
        <h4 class="typewriter3">所持品</h4>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item,index in item_list" :key="item.id">
            <td>
              <div :class="'nes-balloon item-list-item '+item.rare" @click="openItemDetail(item,index)">
                <table>
                  <tr>
                    <td class="table-icon-place">
                      <div class="table-item-icon-frame">
                        <img :src= "require('../assets/item/'+item.img)" class="table-item-icon">
                      </div>
                    </td>
                    <td class="table-item-name-place">
                      <div :class="'table-item-name-frame typewriter'+String(item.item_name.length)">
                        {{ item.item_name }}
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 全アイテム一覧 -->
    <div class="all-item-list" v-else-if="now_view == 'all_items'">

    </div>

    <!-- アイテム詳細 -->
    <div class="item-detail" v-else-if="now_view == 'detail'">
      <div :class="'sub-card item-detail-card '+selected_item[0].rare">
        <div class="item-detail-card-img">
          <div class="large-item-icon-frame">
            <img :src="require('../assets/item/'+selected_item[0].img)" class="card-img-top">
          </div>
        </div>
        <div class="card-body">
          <h5 :class="'card-title typewriter'+String(selected_item[0].name.length)">{{ selected_item[0].name }}</h5>
          <p :class="'card-text typewriter'+String(selected_item[0].explain.length)">{{ selected_item[0].explain }}</p>
          <br>
          <button class="btn btn-outline-dark" @click="useItem()">使用する</button>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {ref,onMounted} from 'vue'
import {supabase} from '../supabase'
import { useRouter } from 'vue-router'
export default {
  name: 'HomeView',
  setup(){
    const router = useRouter()

    let now_view = ref('hold_items')
    let item_list = ref([])

    let selected_item = ref([])

    const openItemDetail=(item,index)=>{
      console.log('item:',item)
      console.log('index:',index)
      selected_item.value = []
      selected_item.value.push(
        {
          item_id: item.id,
          index:index,
          name:item.item_name,
          img: item.img,
          explain:item.explain,
          rare:item.rare,
        }
      )
      console.log('selected:', selected_item.value[0])
      console.log('id:', selected_item.value[0].item_id)
      now_view.value = 'detail'
    }

    const useItem=async()=>{
      let choice = confirm('アイテムを使用します。\nよろしいですか？')
      if(choice==true){
        await supabase
        .from('got_items')
        .delete()
        .eq('id', Number(selected_item.value[0].item_id))
      }
      forceReload()
    }

    const forceReload=async()=>{
      router.go({path: router.currentRoute.path, force: true})
    }

    onMounted(async()=>{
      let {
        data: item
      } = await supabase.from('got_items').select('id,item_name,img,explain,rare');

      console.log('取得データ：', item)

      if(item.length >= 1){
        item_list.value = item
        console.log('got_item_list:', item_list.value)
      }else{
        item_list.value = []
        console.log('got_item_list:', item_list.value)
      }
    })
    return{
      now_view,
      item_list,
      selected_item,
      openItemDetail,
      useItem,
      forceReload
    }
  }
}
</script>

<style lang="scss">
.page-title{
  width: 100vw;
  margin: 0 auto;
  text-align: center;
  font-weight: bold;
}

.page-title h4{
  margin: 0 auto;
}

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

.large-item-icon-frame{
  width: 130px;
  height: 130px;
  background-color: rgba(0, 0, 0, 0.818);
  margin:0 auto;
}

.table-item-name-frame{
  font-weight: bold;
  color:rgba(36, 36, 36, 0.575)
}

.table-item-icon{
  width: 50px;
  margin: auto 0;
  padding:3px;
}

.sub-card{
  width: 95%;
  margin: 0 auto;
  border:none;
  border-radius: 5px;
  padding: 20px 0;
}

.item-card{
  border:none;
  border-radius: 5px;
  text-align: center;
}

.table-icon-place{
  height: 60px;
  width: 60px;
}

.item-detail-card-img{
  border: solid 1px rgba(75, 75, 75, 0.52);
  border-radius: 2px;
  margin:5px;
  padding:10px;
  background-color: rgb(0, 0, 0);
}

.r{
  background: linear-gradient(45deg, #a57e65 0%, #a57e65 45%, #f3cfb8 70%, #a57e65 85%, #a57e65 90% 100%);
  background-size: 800% 400%;
  animation: gradient 5s infinite cubic-bezier(.62, .28, .23, .99) both;
}

.sr{
  background: linear-gradient(45deg, #757575 0%, #9E9E9E 45%, #E8E8E8 70%, #9E9E9E 85%, #757575 90% 100%);
  background-size: 800% 400%;
  animation: gradient 5s infinite cubic-bezier(.62, .28, .23, .99) both;
}

.ssr{
  background: linear-gradient(45deg, #DAAF08 0%, #DAAF08 45%, #FEE9A0 70%, #DAAF08 85%, #DAAF08 90% 100%);
  background-size: 800% 400%;
  animation: gradient 5s infinite cubic-bezier(.62, .28, .23, .99) both;
}
@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.item-list-item{
  width: 90%;
}

.nes-balloon{
  padding:0;
  z-index:0;
}
</style>