<template>
        <div class="page-header clearfix">
            <div class="page-header-l">
                <img class="logo" src="https://www.efun.com/static/images/icon.png" alt="">
            </div>
            <div class="page-header-r">
                <img class="user-avatar" src="https://restw-download.vsplay.com/res_tw/platform/pc/assets/default-avatar-gg.jpg" alt="">
                <el-button class="btn-logout" size="mini">登出</el-button>
            </div>
        </div>
</template>

<script>
    export default {
        data() {
            return {}
        },
        methods: {
            // goLink(routerPath) {
            //   this.$router.push('/' + routerPath);
            // }
        }
    }
</script>

<style scoped>
    .page-header-l {
        width: 200px;
        float: left;
    }
    .page-header-r {
        float: right;
        line-height: 60px;
        position: relative;
    }
    .user-avatar {
        height: 40px;
        width: 40px;
        border: 1px solid #eee;
        border-radius: 50%;
        position: relative;
        top: 10px;
        margin-right: 20px;
    }
    .page-header,
    .page-header-l,
    .page-header-r,
    .logo {
        height: 100%;
    }
    .btn-logout {
        position: relative;
        top: -7px;
        margin-right: 20px;
    }
</style>