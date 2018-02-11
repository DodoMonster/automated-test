<template>
    <el-dialog title="提示" :visible.sync="isShow" width="30%" show-close center>
        <span>{{dialogInfo.msg}}</span>
        <span slot="footer" class="dialog-footer" v-if="dialogInfo.showBtn">
            <el-button @click="isShow = false">取 消</el-button>
            <el-button type="primary" @click="isShow = false">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import Util from '~/lib/util.js';
    export default {
        data() {
            return {
                dialogInfo: {
                    msg: '',
                    showBtn:false
                },
                isShow: false
            }
        },
        mounted() {
            Util.on('show-dialog', (data) => {
                this.isShow = true;
                this.dialogInfo = data;
            });
            Util.on('hide-dialog', (data) => {
                console.log(data);
                this.isShow = false;
            });
        },
        methods: {
            cancel() {
                Util.emit('cancel-dialog');
                this.isShow = false;
            },
            confirm() {
                this.isShow = false;
                Util.emit('confirm-dialog');
            },
        }
    }
</script>
