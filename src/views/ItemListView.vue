<template>
  <div class="item-list">
    <!-- 現在の所持品 -->
    <div class="now-in-possession sub-card" v-if="now_view == 'hold_items'">
      <div class="page-title">
        <h4 class="typewriter3">所持品</h4>
      </div>

      <div class="search-box">
        <table class="search-table">
          <tr>
            <th>レアリティ</th>
            <th>種別</th>
          </tr>
          <tr>
            <td>
              <select v-model="search_rare" @change="searchItem()">
                <option value="">すべて</option>
                <option value="r">R</option>
                <option value="sr">SR</option>
                <option value="ssr">SSR</option>
              </select>
            </td>
            <td>
              <select>
                <option value="">すべて</option>
              </select>
            </td>
          </tr>
        </table>
      </div>

      <table class="item-list-table">
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
      <div :class="'sub-card nes-balloon item-detail-card '+selected_item[0].rare">
        <div class="item-detail-card-img">
          <div class="large-item-icon-frame">
            <img :src="require('../assets/item/'+selected_item[0].img)" class="card-img-top">
          </div>
        </div>
        <div class="card-body">
          <div class="item-title">
            <h5 :class="'card-title typewriter'+String(selected_item[0].name.length)">{{ selected_item[0].name }}</h5>
          </div>
          <div class="item-comment">
            <p :class="'card-text typewriter'+String(selected_item[0].explain.length)">{{ selected_item[0].explain }}</p>
          </div>
          <br>
          <button class="nes-btn detail-card-btn" @click="useItem()">使用する</button>
          <button class="nes-btn detail-card-btn" @click="closeDetail()">戻る</button>
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

    let origin_list = ref([])
    let item_list = ref([])

    let selected_item = ref([])

    let search_rare = ref("")

    const searchItem=()=>{
      if(search_rare.value == ""){
        item_list.value = origin_list.value
      }else{
        item_list.value = origin_list.value.filter(item_data => {
          return item_data.rare == search_rare.value
        })
      }
    }

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

    const closeDetail=()=>{
      now_view.value = "hold_items"
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
        origin_list.value = item
        console.log('got_item_list:', item_list.value)
      }else{
        item_list.value = []
        origin_list.value = []
        console.log('got_item_list:', item_list.value)
      }
    })
    return{
      now_view,
      origin_list,
      item_list,
      selected_item,
      search_rare,
      openItemDetail,
      useItem,
      forceReload,
      searchItem,
      closeDetail
    }
  }
}
</script>

<style lang="scss">
*{
  color: white;
}

.item-list{
  margin-bottom: 100px;
}

.page-title{
  width: 90vw;
  margin: 0 auto;
  text-align: center;
  font-weight: bold;
}

.page-title h4{
  margin: 0 auto;
  padding-bottom: 20px;
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

.item-detail-card{
  h5{
    color: black;
  }
  p{
    color: black;
  }
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

.card-text{
  text-align: left;
}

.item-list-item{
  width: 70vw;
}

.nes-balloon{
  padding:0;
  z-index:0;
}

.item-title{
  margin: 0 auto;
  text-align: center;
  width: 100%;
}

.card-title{
  margin: 0 auto;
}

.item-comment{
  padding: 20px;
  width: 90%;
  margin: 0 auto;
  p{
    overflow-wrap:break-word;
    display: block;
  }
}

.item-list-table{
  margin: 0 auto;
}

.search-table{
  margin: 0 auto;
  th{
    padding-left: 20px;
    padding-right:20px;
  }
  td{
    select{
      color: black;
      text-align: center;
    }
  }
}

.detail-card-btn{
  margin: 10px;
}
</style>