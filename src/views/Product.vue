<template>
    <div>
        <el-carousel height="calc(100vh - 59px)" direction="vertical" :autoplay="false" v-if="looplist.length">

            <el-carousel-item v-for="item in looplist" :key="item._id">
                <div class="item" :style="{ backgroundImage: `url(http://localhost:3001${item.cover})` }">
                    <el-card class="box-card">
                        <div class="card-header">
                            <h2>{{ item.title }}</h2>
                            <span>{{ item.describe }}</span><br>
                            <span>{{ item.content }}</span><br>
                            <div>更多信息，请访问
                                <br> http:debaoge:8080
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-carousel-item>
        </el-carousel>

        <el-empty description="暂无产品" v-else />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const looplist = ref([])

onMounted(async () => {
    const res = await axios.get('/webapi/product/list')
    looplist.value = res.data.data
})

</script>

<style lang="scss" scoped>
.item {
    width: 100%;
    height: 100%;
    background: cover;
}

.box-card {
    width: 50%;
    height: 100%;
    background-color: rgba(255, 255, 255, $alpha: 0.7);
}
</style>