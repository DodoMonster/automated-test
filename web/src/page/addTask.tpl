<div class="main-container">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>添加测试脚本</span>
        </div>
        <el-form ref="form" :rules="rules" :model="addTaskData" label-width="150px">
            <el-form-item label="请选择项目" prop="project">
                <el-select v-model="addTaskData.project" filterable placeholder="请选择项目">
                    <el-option v-for="item in projectList" :key="item.id" :label="item.projectName" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="测试项名称" prop="taskName">
                <el-input v-model="addTaskData.taskName"></el-input>
            </el-form-item>
            <el-form-item label="测试项具体过程描述" prop="taskDesc">
                <el-input type="textarea" v-model="addTaskData.taskName"></el-input>
            </el-form-item>
            <el-form-item label="参数列表">
                <el-switch v-model="addTaskData.hasParams"></el-switch>
            </el-form-item>
            <div class="param-list clearfix" v-if="addTaskData.hasParams" v-for="(item,index) in addTaskData.paramsList">
                <el-form-item label="参数名称" prop="item.name">
                    <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="参数key" prop="item.key">
                    <el-input v-model="item.key"></el-input>
                </el-form-item>
                <i @click="addParams()" v-if="index === addTaskData.paramsList.length - 1" class="el-icon el-icon-circle-plus-outline"></i>
                <i @click="delParams(index)" class="el-icon el-icon-circle-close"></i>
            </div>
            <el-form-item label="上传脚本文件" prop="scriptFile">
                <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" :on-preview="handlePreview" :on-remove="handleRemove"
                    :before-remove="beforeRemove" :on-exceed="handleExceed" :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传js文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="createTask">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</div>