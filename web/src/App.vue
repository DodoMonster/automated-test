<template>
    <el-container>
        <el-header>
            <page-header></page-header>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu :default-active="activeMenuIndex" router class="el-menu-vertical-demo">
                    <el-menu-item index="/userAdmin">
                        <i class="el-icon-setting"></i>
                        <span>用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="/projectAdmin">
                        <i class="el-icon-tickets"></i>
                        <span>项目管理</span>
                    </el-menu-item>
                    <el-menu-item index="/addTask">
                        <i class="el-icon-printer"></i>
                        <span>创建测试脚本</span>
                    </el-menu-item>
                    <el-menu-item index="/addTest">
                        <i class="el-icon-date"></i>
                        <span>测试任务管理</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-main>
                    <router-view></router-view>
                </el-main>
                <el-footer>
                    <!-- Footer -->
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
    import pageHeader from '~component/header.vue';
    export default {
        data() {
            return {}
        },
        components: {
            pageHeader
        },
        computed: {
            activeMenuIndex() {
                return '/' + this.$route.matched[0].path.split('/')[1];
                s
            }
        },
        mounted() {},
        methods: {
            // goLink(routerPath) {
            //   this.$router.push('/' + routerPath);
            // }
        }
    }
</script>

<style>
    .el-header {
        height: 80px;
        /* background-color: rgb(64, 158, 255); */
        /* background: #48494b; */
        background: #324057;
    }
</style>