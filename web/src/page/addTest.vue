<template src="./addTest.tpl">

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
                resultDialogShow: false,
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
            showResult(data) {
                this.resultDialogShow = true;
                this.getResult(data);
            },
            getScriptList() {
                this.$http.get('/api/getScript', {
                    params: this.searchFormData
                }).then((response) => {
                    this.scriptList = response.data.data;
                }).catch((err) => {
                    console.log(err);
                });
            },
            getResult(data) {
                this.$http.get('/api/getResult', {
                    params: {
                        scriptId: data.id
                    }
                }).then((res) => {
                    console.log(res);
                    this.resultList = res.data.data;
                }).catch((err) => {
                    console.log(err);
                })
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
                    this.paramsList.forEach((item, index) => {
                        var paramsObj = {};
                        item.forEach((val, key) => {
                            paramsObj[val.key] = val.value;
                        })
                        prams.push(paramsObj);
                    });
                    this.runParams.paramsList = prams;
                }
                this.$http.post('/api/runJob', this.runParams).then((response) => {
                    if (response.data.code === 0) {
                        Util.dialog.show({
                            msg: '运行成功~请稍候再查看结果！'
                        });
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

