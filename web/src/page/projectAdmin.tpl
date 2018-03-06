<div class="main-container">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>项目管理</span>
            <el-button @click="showCreateForm();" icon="el-icon-plus" type="primary" plain size="small" style="float:right">
                创建项目
            </el-button>
        </div>
        <!-- <h1 class="page-title">敬请期待</h1> -->
        <el-table stripe :default-sort="{prop: 'createTime', order: 'descending'}" :data="projectList" style="width: 100%">
            <el-table-column prop="projectName" label="项目名称" >
            </el-table-column>
            <el-table-column prop="frontPrincipal" label="前端负责人" width="200">
            </el-table-column>
            <el-table-column prop="endPrincipal" label="后端负责人" width="200">
            </el-table-column>
            <el-table-column prop="areaType" label="所属地区" width="200">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template slot-scope="scope">
                    <el-button @click="showCreateForm(scope.row)" icon="el-icon-edit" size="small" title="编辑" type="primary">
                    </el-button>
                    <el-button @click="askForDeleteProject(scope.row)" icon="el-icon-delete" title="删除" size="small" type="danger">
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="text-center" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.currentPage"
            :page-sizes="[1, 10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
        </el-pagination>

        <el-dialog title="创建项目" :visible.sync="createFormShow">
            <el-form ref="createForm" :rules="rules" :model="projectFromData" label-width="100px">
                <el-form-item label="所属地区" prop="areaType">
                    <el-select v-model="projectFromData.areaType" placeholder="请选择项目所属地区">
                        <el-option v-for="(area,index) in areaList" :key="index" :label="area" :value="area"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="项目名称" prop="projectName">
                    <el-input v-model="projectFromData.projectName" placeholder="请输入项目名称"></el-input>
                </el-form-item>
                <el-form-item label="前端负责人" prop="frontPrincipal">
                    <el-input v-model="projectFromData.frontPrincipal" placeholder="请输入前端负责人"></el-input>
                </el-form-item>
                <el-form-item label="后端负责人" prop="endPrincipal">
                    <el-input v-model="projectFromData.endPrincipal" placeholder="请输入后端负责人"></el-input>
                </el-form-item>
                <el-form-item class="text-center width-100">
                    <el-button type="primary" @click="confirmCreate()">确定</el-button>
                    <el-button @click="cancelCreate()">取消</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </el-card>
</div>