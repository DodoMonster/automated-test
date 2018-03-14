<template src="./userAdmin.tpl">

</template>

<script>
    import Util from '~/lib/util';
    export default {
        components: {},
        data() {
            return {
                userList: [],
                page: {
                    currentPage: 1,
                    pageSize: 10,
                    total: 0
                },
                createFormShow: false,
                userFormData: {
                    department: '',
                    username: '',
                    password: '',
                    passwordAgain: '',
                    showEditPwd: false
                },
                rules: {
                    department: [{
                        required: true,
                        message: '请输入部门',
                        trigger: 'blur'
                    }, {
                        min: 2,
                        max: 6,
                        message: '长度在 2 到 6 个字符',
                        trigger: 'blur'
                    }],
                    username: [{
                        required: true,
                        message: '请输入用户名称，用于登录',
                        trigger: 'blur'
                    }, {
                        min: 2,
                        max: 16,
                        message: '长度在 2 到 16 个字符',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }, {
                        min: 6,
                        max: 14,
                        message: '长度在 6 到 14 个字符',
                        trigger: 'blur'
                    }],
                    passwordAgain: [{
                        required: true,
                        message: '请重复输入密码',
                        trigger: 'blur'
                    }, {
                        min: 6,
                        max: 14,
                        message: '长度在 6 到 14 个字符',
                        trigger: 'blur'
                    }]
                },
                isEdit: false,
                areaList: ['亚欧', '港台', '韩国', '总经办']
            }
        },
        created() {
            Util.checkIfLogin();
        },
        mounted() {
            this.getUserList();
        },
        methods: {
            getUserList() {
                this.$http.get('/api/user/getUserList', {
                    params: this.page
                }).then(res => {
                    if (res.data.code === 0) {
                        this.userList = res.data.data.rows || [];
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
                this.getUserList();
            },
            handleCurrentChange(page) {
                this.page.currentPage = page;
                this.getUserList();
            },
            showCreateForm(data) {
                this.createFormShow = true;
                if (data) {
                    this.isEdit = true;
                    this.userFormData = Object.assign({
                        showEditPwd: false
                    }, data);
                } else {
                    this.isEdit = false;
                }
                // this.resetForm('createForm');
            },
            confirmCreate() {
                this.$refs['createForm'].validate((valid) => {
                    if (valid) {
                        if (this.isEdit) {
                            this.editUser();
                        } else {
                            this.createUser();
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
                this.isEdit = this.userFormData.showEditPwd = this.createFormShow = false;
                this.userFormData = {
                    username: '',
                    department: '',
                    endPrincipal: '',
                    areaType: ''
                };
                // this.resetForm('createForm');
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            createUser() {
                this.$http.post('/api/user/createUser', this.userFormData).then((res) => {
                    if (res.data.code === 0) {
                        Util.dialog.show({
                            msg: '创建成功'
                        });
                        this.getUserList();
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
            editUser() {
                this.$http.post('/api/user/editUser', this.userFormData).then(res => {
                    if (res.data.code === 0) {
                        Util.dialog.show({
                            msg: '修改成功'
                        });
                        this.getUserList();
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
            askForDeleteuser(data) {
                Util.dialog.show({
                    msg: '是否确定删除该用户？',
                    showBtn: true,
                    callback: () => {
                        this.deleteUser(data.id);
                    }
                });
            },
            deleteUser(id) {
                this.$http.post('/api/user/deleteUser', {
                    id: id
                }).then(res => {
                    if (res.data.code === 0) {
                        Util.dialog.show({
                            msg: '删除成功'
                        });
                        this.getUserList();
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
