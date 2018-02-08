<div class="main-container">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>测试任务列表</span>
            <el-form :inline="true" :model="searchFormData" class="demo-form-inline search-form">
                <el-form-item label="项目">
                    <el-select filterable v-model="searchFormData.id" placeholder="请选择项目">
                        <el-option v-for="(item,index) in projectList" :key="index" :label="item.projectName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="测试项名称">
                    <el-input v-model="searchFormData.taskName" placeholder="请输入测试项名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" size="small" @click="search()"></el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table stripe height="100%" :default-sort="{prop: 'lastRunTime', order: 'descending'}" :filters="projectList" :filter-method="filterHandler"
            :data="taskList" style="width: 100%">
            <el-table-column prop="projectName" label="项目" width="250" :filters="projectList" filter-placement="bottom-end" :filter-method="filterProject">
            </el-table-column>
            <el-table-column prop="lastRunTime" sortable label="上一次运行时间" width="200">
            </el-table-column>
            <el-table-column prop="taskName" label="测试项名称" width="300">
            </el-table-column>
            <el-table-column prop="taskDesc" label="测试项过程具体描述">
            </el-table-column>
            <el-table-column label="操作" width="300">
                <template slot-scope="scope">
                    <el-button @click="addParamsDialogShow = true" type="warning" size="small">运行</el-button>
                    <el-button @click="showResult(scope.row)" icon="el-icon-zoom-in" type="success" size="small"></el-button>
                    <el-button size="small" icon="el-icon-edit" type="primary">
                        <router-link :to="{path:'/editTask/' + scope.row.id}"></router-link>
                    </el-button>
                    <el-button size="small" type="danger">
                        <i class="el-icon-delete"></i>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="text-center"
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.totalPage">
      </el-pagination>
    </el-card>
    <el-dialog title="添加参数" :visible.sync="addParamsDialogShow">
        <el-form ref="paramsFrom" :inline="true" class="demo-form-inline width-100" :model="paramsFromData" label-width="80px">
            <div v-for="(params,index) in paramsList" :key="index">
                <el-form-item v-for="(item,i) in params" :key="i" :label="item.name">
                    <el-input v-model="item.value"></el-input>
                </el-form-item>
                <el-form-item>
                    <i class="el-icon el-icon-plus" v-if="index === paramsList.length - 1" @click="addParams()"></i>
                    <i class="el-icon el-icon-close" v-if="paramsList.length > 1" @click="delParams(index)"></i>
                </el-form-item>
            </div>
            <el-form-item class="text-center width-100">
                <el-button type="primary" @click="startRun()">立即运行</el-button>
                <el-button @click="addParamsDialogShow = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog title="测试项名称" :visible.sync="resultDialogShow">
        <el-table :data="resultList">
            <el-table-column property="runTime" label="运行日期" width="150"></el-table-column>
            <el-table-column property="result" label="运行结果" width="200"></el-table-column>
            <el-table-column property="detail" label="测试结果详情"></el-table-column>
        </el-table>
    </el-dialog>
</div>