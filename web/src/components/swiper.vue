<template>
    <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="(slide,index) in resultImg" :key="index">
            <img :src="'uploads/results/' + slide" alt="">
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
        <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
</template>

<script>
    import Util from '~/lib/util';
    import 'swiper/dist/css/swiper.css';
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper';
    export default {
        props: ['resultImg'],
        components: {
            swiper,
            swiperSlide
        },
        computed: {
            mySwiper() {
                return this.$refs.mySwiper.swiper
            }
        },
        data() {
            return {
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination'
                    },
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    }
                },
            }
        },
        mounted() {
        },
        methods: {},
        watch: {
            resultImg: function(val) {
                this.mySwiper.update(true);
                this.mySwiper.slideTo(0, 1000, false); //切换到第一个slide，速度为1秒                
            }
        }
    }
</script>

<style scoped>
    .el-pagination {
        margin: 20px auto;
    }
    .swiper-slide {
        text-align: center
    }
    .swiper-slide img {
        max-width: 350px;
    }
</style>

