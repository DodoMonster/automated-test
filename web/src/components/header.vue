<template>
    <div class="page-header clearfix">
        <div class="page-header-l">
            <img class="logo" src="https://www.efun.com/static/images/icon.png" alt="">
        </div>
        <div class="page-header-r">
            <img class="user-avatar" src="https://restw-download.vsplay.com/res_tw/platform/pc/assets/default-avatar-gg.jpg" alt="">
            <span class="username">{{username}}</span>
            <el-button @click="logout()" class="btn-logout" size="mini">登出</el-button>
        </div>
    </div>
</template>

<script>
    import Util from '~/lib/util';
    export default {
        data() {
            return {
                username: ''
            }
        },
        created() {
            this.username = Util.getCookie('username');
        },
        methods: {
            logout() {
                Util.clearCookie();
                location.href = '/login';
            }
        }
    }
</script>

<style scoped>
    .username {
        color: #fff;
        position: relative;
        margin: 0 10px 0;
        top: -4px;
    }
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
        /* margin-right: 20px; */
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