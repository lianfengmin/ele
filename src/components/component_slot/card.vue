<template>
  <el-card>
    <el-row>
      <el-col class="btn_box">
        <slot name="btn"></slot>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <slot name="table"></slot>

    <!-- 分页 -->
    <slot name="pages"></slot>
  </el-card>
</template>
<script>
export default {
  name: 'card',
  props: ['btn'],
  data: function () {
    return {
     
    }
  },
}
</script>
<style leng="less" scoped>
.el-col {
  margin-bottom: 10px;
  text-align: left;
}
</style>
