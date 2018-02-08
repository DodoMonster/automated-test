<template src="./addTask.tpl">

</template>

<script>
    export default {
        data() {
            return {
                addTaskData: {
                    project: '',
                    taskName: '',
                    taskDesc: '',
                    hasParams: false,
                    paramsList: [{}]
                },
                projectList: [{
                    projectName: '项目1',
                    id: '1'
                }, {
                    projectName: '项目2',
                    id: '2'
                }],
                rules: {
                    project: [{
                        required: true,
                        message: '请选择项目',
                        trigger: 'blur'
                    }],
                    taskName: [{
                        required: true,
                        message: '请输入测试项名称',
                        trigger: 'blur'
                    }],
                },
                fileList: []
            }
        },
        methods: {
            addParams() {
                this.addTaskData.paramsList.push({
                    name: '',
                    key: ''
                });
            },
            delParams(index) {
                this.addTaskData.paramsList.splice(index, 1);
            },
            createTask() {},
            handlePreview() {},
            handleRemove() {},
            beforeRemove() {},
            handleExceed() {},
        }
    }
</script>

<style scoped>
    .param-list .el-form-item {
        width: 45%;
        float: left;
    }
    .el-icon {
        margin: 10px 0 0 5px;
        cursor: pointer;
    }
    .el-form {
        width: 900px;
    }
</style>

