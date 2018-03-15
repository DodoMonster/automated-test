<template src="./projectAdmin.tpl">

</template>

<script>
    import Util from '~/lib/util';
    export default {
        components: {},
        data() {
            return {
                projectList: [],
                page: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0
                },
                createFormShow: false,
                projectFromData: {
                    projectName: '',
                    frontPrincipal: '',
                    endPrincipal: '',
                    areaType: ''
                },
                rules: {
                    projectName: [{
                        required: true,
                        message: '请输入项目名称',
                        trigger: 'blur'
                    }],
                    frontPrincipal: [{
                        required: true,
                        message: '请输入前端负责人',
                        trigger: 'blur'
                    }, {
                        min: 2,
                        max: 5,
                        message: '长度在 2 到 5 个字符',
                        trigger: 'blur'
                    }],
                    endPrincipal: [{
                            required: true,
                            message: '请输入后端负责人',
                            trigger: 'blur'
                        },
                        {
                            min: 2,
                            max: 5,
                            message: '长度在 2 到 5 个字符',
                            trigger: 'blur'
                        }
                    ],
                    areaType: [{
                        required: true,
                        message: '请选择所属地区',
                        trigger: 'change'
                    }]
                },
                areaList: ['亚欧', '港台', '韩国', '总经办']
            }
        },
        created() {
            Util.checkIfLogin();
        },
        mounted() {
            this.getProjectList();
        },
        methods: {
            getProjectList() {
                this.$http.get('/api/project/getProjectList', {
                    params: this.page
                }).then(res => {
                    if (res.data.code === 0) {
                        this.projectList = res.data.data.rows || [];
                        this.page.total = res.data.data.count;
                        // this.page.totalPage = Math.ceil(res.data.data.count / this.page.pageSize) || 0;
                    } else {
                        Util.dialog.show({
                            msg: res.data.message
                        });
                    }
                }).catch(err => {})
            },
            // 分页的每页条数改变时
            handleSizeChange(size) {
                this.page.pageSize = size;
                this.getProjectList();
            },
            handleCurrentChange(page) {
                this.page.currentPage = page;
                this.getProjectList();
            },
            showCreateForm(data) {
                this.createFormShow = true;
                if (data) {
                    this.isEdit = true;
                    this.projectFromData = Object.assign({}, data);
                } else {
                    this.isEdit = false;
                }
                // this.resetForm('createForm');
            },
            confirmCreate() {
                this.$refs['createForm'].validate((valid) => {
                    if (valid) {
                        if (this.isEdit) {
                            this.editProject();
                        } else {
                            this.createProject();
                        }
                    } else {
                        Util.dialog.show({
                            msg: '请先输入必填项'
                        });
                        return false;
                    }
                });
            },
            cancelCreate() {
                this.createFormShow = false;
                this.projectFromData = {
                    projectName: '',
                    frontPrincipal: '',
                    endPrincipal: '',
                    areaType: ''
                };
                // this.resetForm('createForm');
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            createProject() {
                this.$http.post('/api/project/createProject', this.projectFromData).then((res) => {
                    if (res.data.code === 0) {
                        Util.dialog.show({
                            msg: '创建成功'
                        });
                        this.getProjectList();
                        this.cancelCreate();
                    } else {
                        Util.dialog.show({
                            msg: res.data.message
                        });
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            editProject() {
                this.$http.post('/api/project/editProject', this.projectFromData).then(res => {
                    if (res.data.code === 0) {
                        Util.dialog.show({
                            msg: '修改成功'
                        });
                        this.getProjectList();
                        this.cancelCreate();
                    } else {
                        Util.dialog.show({
                            msg: res.data.message
                        });
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
            askForDeleteProject(data) {
                Util.dialog.show({
                    msg: '是否确定删除该项目？',
                    showBtn: true,
                    callback: () => {
                        this.deleteProject(data.id);
                    }
                });
            },
            deleteProject(id) {
                this.$http.post('/api/project/deleteProject', {
                    id: id
                }).then(res => {
                    if (res.data.code === 0) {
                        Util.dialog.show({
                            msg: '删除成功'
                        });
                        this.getProjectList();
                    } else {
                        Util.dialog.show({
                            msg: res.data.message
                        });
                    }
                }).catch(err => {
                    console.log(err);
                });
            },
        }
    }
</script>
