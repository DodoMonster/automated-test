<template src="./addScript.tpl">

</template>

<script>
    import Util from '~/lib/util';
    export default {
        data() {
            return {
                addScriptData: {
                    projectId: '',
                    taskName: '',
                    taskDesc: '',
                    hasParams: false,
                    paramsList: [{}],
                    filePath: ''
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
                this.addScriptData.paramsList.push({
                    name: '',
                    key: ''
                });
            },
            delParams(index) {
                this.addScriptData.paramsList.splice(index, 1);
            },
            createScript() {
                console.log(this.addScriptData.filePath);
                let formData = Util.getFormData(this.addScriptData.filePath);
                this.$http.post('/api/createScript', formData)
                    .then(function(response) {
                        console.log(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },
            getScriptFile(file) {
                console.log(file);
                this.addScriptData.filePath = file.raw;
            },
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

