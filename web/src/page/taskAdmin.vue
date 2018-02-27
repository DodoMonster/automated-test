<template src="./taskAdmin.tpl"></template>

<script>
    import Util from '~/lib/util';
    import 'swiper/dist/css/swiper.css';
    import {
        swiper,
        swiperSlide
    } from 'vue-awesome-swiper';
    export default {
        components: {
            swiper,
            swiperSlide
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
                scriptList: [],
                resultList: [],
                resultDialog: {
                    show: false,
                    title: ''
                },
                addParamsDialogShow: false,
                paramsObject: [],
                paramsFromData: {},
                paramsList: [],
                searchFormData: {
                    projectId: '',
                    testName: ''
                },
                runParams: {},
                page: {
                    totalPage: 1,
                    currentPage: 1,
                    pageSize: 10
                },
                resultImgDialogShow: false,
                resultImg: [],
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination'
                    }
                }
            }
        },
        mounted() {
            this.getScriptList();
        },
        methods: {
            getScriptList() {
                this.$http.get('/api/getScript', {
                    params: this.searchFormData
                }).then((response) => {
                    this.scriptList = response.data.data;
                }).catch((err) => {
                    console.log(err);
                });
            },
            // 查看测试结果
            getResult(data) {
                this.resultDialog.title = data.testName;
                this.$http.get('/api/getResult', {
                    params: {
                        scriptId: data.id
                    }
                }).then((res) => {
                    this.resultList = res.data.data;
                    if (!this.resultList.length) {
                        Util.dialog.show({
                            msg: '暂无测试结果！'
                        });
                        return;
                    } else {
                        this.resultDialog.show = true;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            showResultImg(data) {
                this.resultImg = data.resultImg.split(',') || [data] || [];
                this.resultImgDialogShow = true;
            },
            filterHandler(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            filterProject(value, row) {
                return row.projectName === value;
            },
            addParams() {
                this.paramsList.push(JSON.parse(JSON.stringify(this.paramsObject)));
            },
            delParams(index) {
                this.paramsList.splice(index, 1);
            },
            // 显示运行脚本的提示输入框
            showRun(item) {
                this.runParams = item;
                this.paramsObject = [];
                if (item.params) {
                    try {
                        this.paramsObject = JSON.parse(item.params);
                        var newObj = {};
                        if (this.paramsObject.length) {
                            this.addParamsDialogShow = true;
                            this.paramsList = [JSON.parse(JSON.stringify(this.paramsObject))];
                        }
                    } catch (e) {
                        console.log(e);
                    }
                } else {
                    this.startRun(item);
                }
            },
            startRun(flag) {
                if (flag) {
                    let prams = [];
                    var isFalse = false;
                    for (let item in this.paramsList) {
                        var paramsObj = {};
                        for (let key of this.paramsList[item]) {
                            if (!key || !key.value) {
                                Util.dialog.show({
                                    msg: '参数不能为空！'
                                });
                                isFalse = true;
                                break;
                            }
                            paramsObj[key.key] = key.value;
                        }
                        if (isFalse) {
                            break;
                        }
                        prams.push(paramsObj);
                    }
                    this.runParams.paramsList = prams;
                }
                if (isFalse) {
                    return;
                }
                this.$http.post('/api/runJob', this.runParams).then((response) => {
                    if (response.data.code === 0) {
                        Util.dialog.show({
                            msg: '运行成功~请稍候再查看结果！'
                        });
                        this.paramsList = [];
                    } else {
                        Util.dialog.show({
                            msg: response.data.message
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            // 弹出询问是否删除结果的提示框
            askForDeleteResult(data) {
                Util.dialog.show({
                    msg: '是否确定删除该次测试任务?',
                    showBtn: true,
                    callback: () => {
                        this.deleteTestResult(data);
                    }
                });
            },
            // 删除测试任务结果
            deleteTestResult(data) {
                this.$http.post('/api/deleteResult', {
                    id: data.row.id
                }).then((response) => {
                    if (response.data.code === 0) {
                        Util.dialog.show({
                            msg: '删除该测试结果成功！'
                        });
                        this.resultList.splice(data.$index, 1);
                    } else {
                        Util.dialog.show({
                            msg: response.data.message
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            // 弹出询问是否删除测试脚本的提示框
            askForDeleteScript(data) {
                Util.dialog.show({
                    msg: '是否确定删除该测试脚本文件?',
                    showBtn: true,
                    callback: () => {
                        this.deleteTestScript(data);
                    }
                });
            },
            // 删除测试任务结果
            deleteTestScript(data) {
                this.$http.post('/api/deleteScript', {
                    id: data.row.id
                }).then((response) => {
                    if (response.data.code === 0) {
                        Util.dialog.show({
                            msg: '删除测试脚本成功！'
                        });
                        this.scriptList.splice(data.$index, 1);
                    } else {
                        Util.dialog.show({
                            msg: response.data.message
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            handleSizeChange() {},
            handleCurrentChange() {},
            search() {}
        }
    }
</script>

<style>
    .search-form {
        float: right;
        height: 38px;
    }
    .el-pagination {
        margin: 20px auto;
    }
    .swiper-slide {
        text-align: center
    }
    .swiper-slide img {
        max-width: 350px;
    }
    .el-button--small,
    .el-button--small.is-round {
        padding: 7px 7px !important;
    }
</style>

