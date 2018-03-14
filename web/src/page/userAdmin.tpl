<div class="main-container">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>用户管理</span>
            <el-button @click="showCreateForm();" icon="el-icon-plus" type="primary" plain size="small" style="float:right">
                添加用户
            </el-button>
        </div>
        <!-- <h1 class="page-title">敬请期待</h1> -->
        <el-table stripe :default-sort="{prop: 'createTime', order: 'descending'}" :data="userList" style="width: 100%">
            <el-table-column prop="id" label="ID" width="100">
            </el-table-column>
            <el-table-column prop="username" label="用户名">
            </el-table-column>
            <el-table-column prop="department" label="部门" width="200">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button @click="showCreateForm(scope.row)" icon="el-icon-edit" size="small" title="编辑" type="primary">
                    </el-button>
                    <el-button @click="askForDeleteuser(scope.row)" icon="el-icon-delete" title="删除" size="small" type="danger">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="text-center" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.currentPage"
            :page-sizes="[1, 10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
        </el-pagination>

        <el-dialog title="添加" :visible.sync="createFormShow">
            <el-form ref="createForm" :rules="rules" :model="userFormData" label-width="100px">
                <el-form-item label="部门" prop="department">
                    <el-input v-model="userFormData.department" placeholder="请输入部门"></el-input>
                </el-form-item>
                <el-form-item label="用户名" prop="username">
                    <el-input v-model="userFormData.username" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" v-if="!isEdit || userFormData.showEditPwd">
                    <el-input v-model="userFormData.password" type="password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" prop="passwordAgain" v-if="!isEdit || userFormData.showEditPwd">
                    <el-input v-model="userFormData.passwordAgain" type="password" placeholder="请重复输入密码"></el-input>
                </el-form-item>
                <el-form-item class="text-center width-100" v-if="isEdit">
                    <el-button type="danger" @click="userFormData.showEditPwd = !userFormData.showEditPwd">{{ !userFormData.showEditPwd ? '修改密码' : '取消修改密码'}}</el-button>
                </el-form-item>
                <el-form-item class="text-center width-100">
                    <el-button type="primary" @click="confirmCreate()">确定</el-button>
                    <el-button @click="cancelCreate()">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-card>
</div>