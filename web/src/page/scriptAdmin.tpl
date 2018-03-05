<div class="main-container">
    <el-card class="box-card">
        <div slot="header" class="clearfix">
            <span>添加测试脚本</span>
        </div>
        <el-form ref="scriptForm" :rules="rules" :model="scriptData" label-width="150px">
            <el-form-item label="请选择项目" prop="projectId">
                <el-select v-model="scriptData.projectId" filterable placeholder="请选择项目">
                    <el-option v-for="item in projectList" :key="item.id" :label="item.projectName" :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="测试项名称" prop="testName">
                <el-input v-model="scriptData.testName"></el-input>
            </el-form-item>
            <el-form-item label="测试项具体过程描述" prop="testDesc">
                <el-input type="textarea" v-model="scriptData.testDesc"></el-input>
            </el-form-item>
            <el-form-item label="参数列表">
                <el-switch v-model="scriptData.hasParams"></el-switch>
            </el-form-item>
            <div class="param-list clearfix" v-if="scriptData.hasParams" v-for="(item,index) in scriptData.paramsList">
                <el-form-item label="参数名称">
                    <el-input v-model="item.name"></el-input>
                </el-form-item>
                <el-form-item label="参数key">
                    <el-input v-model="item.key"></el-input>
                </el-form-item>
                <i @click="addParams()" v-if="index === scriptData.paramsList.length - 1" class="el-icon el-icon-circle-plus-outline"></i>
                <i @click="delParams(index)" class="el-icon el-icon-circle-close"></i>
            </div>
            <el-form-item label="脚本文件" prop="filePath">
                <span v-if="scriptData.filePath && id">{{scriptData.filePath}}</span>
                <el-upload class="upload-demo" action="/api/script/uploadScript" name="filePath" :on-success="getScriptFilePath" :on-error="uploadFileError"
                    :on-remove="handleRemove" :on-exceed="handleExceed" :file-list="fileList">
                    <el-button size="small" icon="el-icon-upload2" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传js文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitScript">确定</el-button>
            </el-form-item>
        </el-form>
    </el-card>
</div>