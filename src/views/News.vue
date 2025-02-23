<template>
    <div class="container">
      <div class="news-header" :style="{ backgroundImage: `url(${require('@/assets/news.jpg')})` }"></div>
  
      <div class="search">
        <el-popover placement="bottom" title="检索结果" width="50%" :visible="visible">
          <template #reference>
            <el-input v-model="searchText" type="search" size="large" placeholder="输入关键字" @input="visible = true"
              @blur="visible = false">
              <template #prefix>
                <el-icon class="el-input__icon">
                  <search />
                </el-icon>
              </template>
            </el-input>
          </template>
          <div v-if="searchnewsList.length">
            <div v-for="item in searchnewsList" :key="item._id" class="search-item">
              {{ item.title }}
            </div>
          </div>
          <div v-else>
            <el-empty description="暂无新闻" :image-size="50"></el-empty>
          </div>
        </el-popover>
      </div>
      <div class="topnews">
        <el-row :gutter="20">
          <el-col :span="6" v-for="item in topNewsList" :key="item._id">
            <el-card>
              <div class="image" :style="{ backgroundImage: `url(${item.cover})` }"></div>
              <template #header>{{ item.title }}</template>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </template>
  
  <script setup>
  import { Search } from '@element-plus/icons-vue'
  import { computed, onMounted } from 'vue'
  import axios from 'axios'
  import { ref } from 'vue'
  
  const searchText = ref('')
  const visible = ref(false)
  const newsList = ref([])
  
  const searchnewsList = computed(() => {
    return newsList.value.filter(item => item.title.includes(searchText.value))
  })
  
  const topNewsList = computed(() => {
    const newlist = newsList.value.slice(0, 4).map(item => {
      const cover = item.cover
        ? (item.cover.startsWith('http') ? item.cover : `http://localhost:3001${item.cover}`)
        : 'https://via.placeholder.com/150'; // 默认图片
      console.log('item.cover:', item.cover, 'processed cover:', cover);
      return { ...item, cover };
    });
    return newlist;
  })
  
  onMounted(async () => {
    const res = await axios.get('/webapi/news/list')
    console.log('res:', res.data.data)
    newsList.value = res.data.data
    console.log('newsList', newsList)
  })
  </script>
  
  <style lang="scss" scoped>
  .container {
    position: relative;
  }
  
  .news-header {
    width: 100%;
    height: 400px;
    background-size: cover;
  }
  
  .search {
    position: absolute;
    top: 300px;
    width: 100%;
    text-align: center;
  
    .el-input {
      width: 50%;
    }
  }
  
  .search-item {
    height: 50px;
    line-height: 50px;
  
    &:hover {
      background-color: whitesmoke;
      color: red;
    }
  }
  
  .topnews {
    margin-top: 20px;
    margin: 20px;
  
    .image {
      width: 100%;
      height: 150px;
      background-size: cover;
      background-position: center;
    }
  }
  </style>