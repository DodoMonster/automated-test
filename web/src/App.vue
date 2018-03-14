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
                    <el-menu-item index="/scriptAdmin">
                        <i class="el-icon-printer"></i>
                        <span>测试脚本管理</span>
                    </el-menu-item>
                    <el-menu-item index="/taskAdmin">
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
        <alert-dialog></alert-dialog>
    </el-container>
</template>

<script>
    import pageHeader from '~component/header.vue';
    import alertDialog from '~component/dialog.vue';
    export default {
        data() {
            return {}
        },
        components: {
            pageHeader,
            alertDialog
        },
        computed: {
            activeMenuIndex() {
                return '/' + this.$route.path.split('/')[1];
            }
        },
        mounted() {},
        methods: {
        }
    }
</script>

<style>
    .el-header {
        height: 80px;
        /* background-color: rgb(64, 158, 255); */
        background: #324057;
    }
</style>