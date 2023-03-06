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
          <tr>
            <td>
              <div class="table-item-icon-frame">
                <img src= "../assets/ticket_normal.png" class="table-item-icon">
              </div>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- 全アイテム一覧 -->
    <div class="all-item-list">

    </div>
  </div>
</template>

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