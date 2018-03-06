<template src="./taskAdmin.tpl">

</template>

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
                projectList: [],
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
                    totalPage: 0,
                    currentPage: 1,
                    pageSize: 10,
                    total: 0
                },
                resultPage: {
                    currentPage: 1,
                    pageSize: 20,
                    total: 0
                },
                resultImgDialogShow: false,
                resultImg: [],
                swiperOption: {
                    pagination: {
                        el: '.swiper-pagination'
                    }
                },
                resultData: {}
            }
        },
        mounted() {
            this.getScriptList();
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
            getScriptList() {
                this.$http.get('/api/script/getScript', {
                    params: Object.assign(this.page, this.searchFormData)
                }).then((response) => {
                    this.scriptList = response.data.data.rows || [];
                    this.page.total = response.data.data.count;
                    // this.page.totalPage = Math.ceil(response.data.data.count / this.page.pageSize) || 0;
                }).catch((err) => {
                    console.log(err);
                });
            },
            // 查看测试结果
            getResult(data) {
                this.resultData = data;
                this.resultDialog.title = data.testName;
                let params = {
                    scriptId: data.id
                };
                params = Object.assign(params, this.resultPage);
                this.$http.get('/api/task/getResult', {
                    params: params
                }).then((res) => {
                    this.resultList = res.data.data.rows || [];;
                    this.resultPage.total = res.data.data.count || 0;
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
                this.$http.post('/api/task/runJob', this.runParams).then((response) => {
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
                this.$http.post('/api/task/deleteResult', {
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
                this.$http.post('/api/script/deleteScript', {
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
            // 分页的每页条数改变时
            handleSizeChange(size) {
                console.log(size);
                this.page.pageSize = size;
                this.getScriptList();
            },
            handleCurrentChange(page) {
                this.page.currentPage = page;
                this.getScriptList();
            },
            // 分页的每页条数改变时
            handleResultSizeChange(size) {
                console.log(size);
                this.resultPage.pageSize = size;
                this.getResult(this.resultData);
            },
            handleResultCurrentChange(page) {
                this.resultPage.currentPage = page;
                this.getResult(this.resultData);
            }
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

