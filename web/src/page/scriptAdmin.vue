<template src="./scriptAdmin.tpl"></template>

<script>
    import Util from '~/lib/util'; 
    export default {
        data() {
            return {
                addScriptData: {
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
                rules: {
                    project: [{
                        required: true,
                        message: '请选择项目',
                        trigger: 'blur'
                    }],
                    testName: [{
                        required: true,
                        message: '请输入测试项名称',
                        trigger: 'blur'
                    }],
                },
                fileList: []
            }
        },
        mounted() {},
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
                if (this.addScriptData.hasParams && this.addScriptData.paramsList.length !== 0) {
                    this.addScriptData.params = JSON.stringify(this.addScriptData.paramsList);
                }
                this.$http.post('/api/createScript', this.addScriptData)
                    .then(function(response) {
                        if (response.data.code === 0) {
                            Util.dialog.show({
                                msg: '上传成功'
                            });
                        } else {
                            Util.dialog.show({
                                msg: response.data.message
                            });
                        }
                        console.log(response);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });
            },
            getScriptFile(file) {
                console.log(file);
                // this.addScriptData.filePath = file.raw;
            },
            getScriptFilePath(response, file, fileList) {
                console.log(response);
                this.addScriptData.filePath = response.data.pictureUrl;
            },
            uploadFileError(err, file, fileList) {
                console.log(err);
            },
            handleRemove() {
                this.addScriptData.filePath = '';
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

