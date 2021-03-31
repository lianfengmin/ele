<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <slot name="second"></slot>
    <slot name="three"></slot>
    <slot name="four"></slot>
  </el-breadcrumb>
</template>
