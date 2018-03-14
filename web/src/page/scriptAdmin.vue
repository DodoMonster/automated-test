<template src="./scriptAdmin.tpl">

</template>

<script>
    import Util from '~/lib/util';
    export default {
        data() {
            return {
                scriptData: {
                    projectId: '',
                    testName: '',
                    testDesc: '',
                    hasParams: false,
                    paramsList: [{
                        name: '',
                        key: ''
                    }],
                    filePath: ''
                },
                projectList: [],
                rules: {
                    projectId: [{
                        required: true,
                        message: '请选择项目',
                        trigger: 'change'
                    }],
                    testName: [{
                        required: true,
                        message: '请输入测试项名称',
                        trigger: 'blur'
                    }],
                    filePath: [{
                        required: true,
                        message: '请上传测试脚本文件',
                        trigger: 'blur'
                    }]
                },
                fileList: [],
                id: null
            }
        },
        created() {
            Util.checkIfLogin();
        },
        mounted() {
            this.id = this.$route.params.id || null;
            if (this.id) {
                this.scriptData.id = this.id;
                this.getScriptInfo(this.$route.params.id || null);
            }
            this.getProjectList();
        },
        methods: {
            getProjectList() {
                this.$http.get('/api/project/getProjectList', {
                    params: {
                        function: 'getAll'
                    }
                }).then(res => {
                    if (res.data.code === 0) {
                        this.projectList = res.data.data || [];
                    } else {
                        Util.dialog.show({
                            msg: res.data.message
                        });
                    }
                }).catch(err => {})
            },
            // 如果是编辑，则获取脚本信息
            getScriptInfo(id) {
                this.$http.get('/api/script/getScript', {
                    params: {
                        id: id
                    }
                }).then((res) => {
                    if (res.data.code === 0) {
                        let data = res.data.data.rows[0] || {};
                        data.paramsList = JSON.parse(data.params) || [];
                        if (data.paramsList.length !== 0) {
                            data.hasParams = true;
                        }
                        this.scriptData = data;
                    } else {
                        Util.dialog.show({
                            msg: res.data.message
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            addParams() {
                this.scriptData.paramsList.push({
                    name: '',
                    key: ''
                });
            },
            delParams(index) {
                this.scriptData.paramsList.splice(index, 1);
            },
            // 点击确定按钮，判断是新建还是修改
            submitScript() {
                this.$refs['scriptForm'].validate((valid) => {
                    if (valid) {
                        if (this.id) {
                            this.editScript();
                        } else {
                            this.createScript();
                        }
                    } else {
                        Util.dialog.show({
                            msg: '请先输入必填项'
                        });
                        return false;
                    }
                });
            },
            // 添加测试脚本            
            createScript() {
                if (this.scriptData.hasParams && this.scriptData.paramsList.length !== 0) {
                    this.scriptData.params = JSON.stringify(this.scriptData.paramsList);
                } else {
                    this.scriptData.params = null;
                }
                this.$http.post('/api/script/createScript', this.scriptData)
                    .then(function(res) {
                        if (res.data.code === 0) {
                            Util.dialog.show({
                                msg: '上传成功'
                            });
                        } else {
                            Util.dialog.show({
                                msg: res.data.message
                            });
                        }
                        console.log(res);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },
            // 修改测试脚本
            editScript() {
                if (this.scriptData.hasParams && this.scriptData.paramsList.length !== 0) {
                    this.scriptData.params = JSON.stringify(this.scriptData.paramsList);
                } else {
                    this.scriptData.params = null;
                }
                this.$http.post('/api/script/editScript', this.scriptData)
                    .then(function(res) {
                        if (res.data.code === 0) {
                            Util.dialog.show({
                                msg: '修改成功'
                            });
                        } else {
                            Util.dialog.show({
                                msg: res.data.message
                            });
                        }
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },
            getScriptFilePath(res, file, fileList) {
                this.scriptData.filePath = res.data.pictureUrl;
            },
            uploadFileError(err, file, fileList) {
                console.log(err);
            },
            handleRemove() {
                this.scriptData.filePath = '';
            },
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

