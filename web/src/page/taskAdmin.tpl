<div class="main-container">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>测试任务列表</span>
            <el-form :inline="true" :model="searchFormData" class="demo-form-inline search-form">
                <el-form-item label="项目">
                    <el-select filterable v-model="searchFormData.projectId" placeholder="请选择项目">
                        <el-option v-for="(item,index) in projectList" :key="index" :label="item.projectName" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="测试项名称">
                    <el-input v-model="searchFormData.testName" placeholder="请输入测试项名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon el-icon-search" size="small" @click="getScriptList()"></el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table stripe :default-sort="{prop: 'lastRunTime', order: 'descending'}" :filter-method="filterHandler" :data="scriptList"
            style="width: 100%">
            <el-table-column prop="Project.projectName" label="项目" width="250">
            </el-table-column>
            <el-table-column sortable label="上一次运行时间" width="200">
                <template slot-scope="scope">
                    <p v-if="scope.row.lastRunTime && scope.row.lastRunTime !== 'Invalid date'">{{scope.row.lastRunTime}}</p>
                    <p v-else>暂未运行过</p>
                </template>
            </el-table-column>
            <el-table-column prop="testName" label="测试项名称" width="300">
            </el-table-column>
            <el-table-column prop="testDesc" label="测试项过程具体描述">
            </el-table-column>
            <el-table-column label="操作" width="180">
                <template slot-scope="scope">
                    <el-button @click="showRun(scope.row);" icon="el-icon-refresh" title="运行" type="warning" size="small">
                    </el-button>
                    <el-button @click="getResult(scope.row)" title="查看结果" icon="el-icon-zoom-in" type="success" size="small"></el-button>
                    <el-button @click="askForDeleteScript(scope)" icon="el-icon-delete" title="删除" size="small" type="danger">
                    </el-button>
                    <router-link :to="{path:'/scriptAdmin/' + scope.row.id}" style="margin-left:5px">
                        <el-button size="small" icon="el-icon-edit" title="编辑" type="primary">
                        </el-button>
                    </router-link>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="text-center" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.currentPage"
            :page-sizes="[10, 20, 30, 40]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.total">
        </el-pagination>
    </el-card>
    <el-dialog title="添加参数" :visible.sync="addParamsDialogShow">
        <el-form ref="paramsFrom" :inline="true" class="demo-form-inline width-100" :model="paramsFromData" label-width="100px">
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
                <el-button type="primary" @click="startRun('true')">立即运行</el-button>
                <el-button @click="addParamsDialogShow = false">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
    <el-dialog :title="resultDialog.title" width="50%" :visible.sync="resultDialog.show">
        <el-table :data="resultList" max-height="800">
            <el-table-column property="createdTime" label="运行日期" width="200"></el-table-column>
            <el-table-column label="运行结果" width="200">
                <template slot-scope="props">
                    <span class="color-danger" v-if="props.row.result == 1">失败</span>
                    <span class="color-success" v-else>成功</span>                    
                    <!-- {{props.row.result == 1 ? '失败' : '成功'}} -->
                </template>
            </el-table-column>
            <el-table-column property="params" label="参数"></el-table-column>
            <el-table-column type="expand" label="测试结果日志" width="120">
                <template slot-scope="props">
                    <div v-html="props.row.resultLog"></div>
                </template>
            </el-table-column>
            <el-table-column property="resultImg" label="操作" width="120" align="center">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.resultImg" title="查看截图" @click="showResultImg(scope.row)" icon="el-icon-zoom-in" type="success"
                        size="small"></el-button>
                    <p v-else>测试结果无截图</p>
                    <el-button @click="askForDeleteResult(scope)" title="删除" size="small" type="danger">
                        <i class="el-icon-delete"></i>
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="text-center" background @size-change="handleResultSizeChange" @current-change="handleResultCurrentChange"
            :current-page="resultPage.currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="resultPage.pageSize" layout="total, sizes, prev, pager, next, jumper"
            :total="resultPage.total">
        </el-pagination>
    </el-dialog>
    <el-dialog :visible.sync="resultImgDialogShow">
        <swiper :resultImg="resultImg"></swiper>
    </el-dialog>
</div>