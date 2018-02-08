<template src="./addTest.tpl">

</template>

<script>
    export default {
        components: {
        },
        data() {
            return {
                projectList: [{
                    projectName: '亚欧新平台储值改版1',
                    id: 1,
                    text: '亚欧新平台储值改版1',
                    value: '亚欧新平台储值改版1'
                }, {
                    projectName: '亚欧新平台储值改版2',
                    id: 2,
                    text: '亚欧新平台储值改版2',
                    value: '亚欧新平台储值改版2'
                }],
                taskList: [{
                    id: '1',
                    projectName: '亚欧新平台储值改版1',
                    lastRunTime: '1518069233270',
                    taskName: "测试登录",
                    taskDesc: "从首页点击登录按钮，跳转到登录页面，输入用户名、密码点击登录按钮"
                }, {
                    id: '2',
                    projectName: '亚欧新平台储值改版2',
                    lastRunTime: '15180692333333',
                    taskName: "测试注册",
                    taskDesc: "从首页点击登录按钮，跳转到登录页面，输入用户名、密码点击登录按钮"
                }],
                projectId: '',
                resultList: [],
                resultDialogShow: false,
                addParamsDialogShow: false,
                paramsObject: [{
                    name: '账号名',
                    key: 'username',
                    value: ''
                }, {
                    name: '密码',
                    key: 'password',
                    value: ''
                }],
                paramsFromData: {},
                paramsList: [],
                searchFormData: {},
                page:{
                    totalPage:1,
                    currentPage:1,
                    pageSize:10
                }
            }
        },
        mounted() {
            this.addParams();
        },
        methods: {
            showResult() {
                this.resultDialogShow = true;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            filterProject(value, row) {
                return row.projectName === value;
            },
            addParams() {
                this.paramsList.push(this.paramsObject);
            },
            delParams(index) {
                this.paramsList.splice(index, 1);
            },
            handleSizeChange(){},
            handleCurrentChange(){},
            startRun(){},
            search() {}
        }
    }
</script>

<style>
    .search-form {
        float: right;
        height: 38px;
    }
    .el-pagination{
        margin:20px auto;
    }
</style>

