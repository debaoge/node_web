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
          <div v-for="item in searchnewsList" :key="item._id" 
            class="search-item"
            @click="handleChangePage(item._id)"
            >
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
          <el-card shadow="hover" 
            @click="handleChangePage(item._id)"
            >
            <div class="image" :style="{ backgroundImage: `url(http://localhost:3001${item.cover})` }"></div>
            <span>{{ item.title }}</span>
            <div class="bottom">
              <time class="time">{{ handleEditTime(item.editTime) }}</time>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <el-tabs v-model="activeName" class="demo-tabs" style="margin: 20px;">
      <el-tab-pane v-for="item in tabList" :key="item.name" :label="item.label" :name="item.name">
        <el-row :gutter="20">
          <el-col :span="18">
            <div v-for="data in tabNews[item.name]" :key="data._id">
              <el-card shadow="hover" 
              @click="handleChangePage(data._id)">
                <div class="tab-image" :style="{ backgroundImage: `url(http://localhost:3001${data.cover})` }"></div>
                <span>{{ data.title }}</span>
                <div class="bottom">
                  <time class="tab-time">{{ handleEditTime(data.editTime) }}</time>
                </div>
              </el-card>
            </div>


          </el-col>
          <el-col :span="6">

            <el-timeline style="max-width: 600px">
              <el-timeline-item v-for="(data, index) in tabNews[item.name]" :key="index" 
              :timestamp="handleEditTime(data.editTime)">
                {{ data.title }}
              </el-timeline-item>
            </el-timeline>


          </el-col>
        </el-row>

      </el-tab-pane>
    </el-tabs>
    <el-backtop :right="40" :bottom="40" :visible-height="100"/>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue'
import { computed, onMounted } from 'vue'
import axios from 'axios'
import { ref } from 'vue'
import moment from 'moment'
import _ from 'lodash'
import { useRouter } from 'vue-router'

const searchText = ref('')
const visible = ref(false)
const newsList = ref([])
const activeName = ref(1)


const searchnewsList = computed(() => {
  return newsList.value.filter(item => item.title.includes(searchText.value))
})

const topNewsList = computed(() => newsList.value.slice(0, 4))

const handleEditTime = (dateString) => {
  return moment(dateString).format('YYYY-MM-DD HH:mm');
}

onMounted(async () => {
  const res = await axios.get('/webapi/news/list')
  console.log('res:', res.data.data)
  newsList.value = res.data.data
  console.log('newsList', newsList)
  console.log('测试lodash分组功能 ', _.groupBy(newsList.value, item => item.category));

})

const tabList = [{ label: "最新动态", name: 1 }, { label: "典型案例", name: 2 }, { label: "通知公告", name: 3 },]

const tabNews = computed(() => {
  return _.groupBy(newsList.value, item => item.category)
})
const router = useRouter()
const handleChangePage = (id)=> {
  router.push(`/news/${id}`)
  
}

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

  .bottom time {
    font-size: small;
    color: gray;
  }
}

.tab-image {
  width: 150px;
  height: 150px;
  background-size: cover;
  background-position: center;
}

.tab-time {
  font-size: small;
  color: gray;
}
</style>