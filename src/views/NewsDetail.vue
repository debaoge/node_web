<template>
    <el-row>
        <el-col :span="17" :offset="1">
            <div>
                <h2>{{ currentNews.title }}</h2>
                <div class="time">
                    {{ handleEditTime(currentNews.timeEdit) }}
                </div>
                <el-divider>
                    <el-icon>
                        <star-filled></star-filled>
                    </el-icon>
                </el-divider>
                <div v-html="currentNews.content" />
            </div>

        </el-col>
        <el-col :span="4" :offset="1" :pull="1">
            <el-card class="box-card">
                <template #header>
                    <div class="card-header">
                        <span style="font-size: 16; font-weight: bold;">最近新闻</span>
                    </div>
                </template>
                <div v-for="item in topNews" :key="item._id" style="padding: 14px;" @click="handleChange(item._id)"
                    class="text item">
                    {{ item.title }}
                    <div class="bottom">
                        <time class="time">{{ handleEditTime(item.editTime) }}</time>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>
<script setup>
import { watch } from 'vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router'
import axios from 'axios';
import moment from 'moment';
import { StarFilled } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const currentNews = ref({})
const topNews = ref({})

watch(
    () => route.params.id,
    async (newId) => {
        if (!newId) return; // 如果 id 不存在，直接返回

       // console.log('id:', newId);
        const res = await axios.get(`/webapi/news/list/${newId}`);
        currentNews.value = res.data.data[0];

        const res2 = await axios.get(`/webapi/news/toplist?limit=4`);
        topNews.value = res2.data.data;
    },
    { immediate: true } // 立即执行一次
);

const handleEditTime = (dateString) => {
    return moment(dateString).format('YYYY-MM-DD HH:mm');
}

const handleChange = (id) => {
    router.push(`/news/${id}`)
}
</script>

<style>
.el-row {
    margin-top: 20px;
}

.time {
    font-size: small;
    color: gray;
}
</style>