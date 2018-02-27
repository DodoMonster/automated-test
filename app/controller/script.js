/**
 * Created by vslimit on 2017/9/12.
 */
'use strict';
const Script = require('../model/Script'),
    ApiResult = require('../../config/rest').APIResult,
    uploadFile = require('../util/uploadFile'),
    path = require('path');

/**
 *  Create Script  
 */
exports.create = async (ctx, next) => {
    console.log('-------------------- start 创建脚本 ---------------------');
    console.log(ctx.request.body);
    let projectId = ctx.request.body.projectId,
        testName = ctx.request.body.testName,
        filePath = ctx.request.body.filePath,
        testDesc = ctx.request.body.testDesc,
        params = ctx.request.body.params;
    if (!projectId || !testName) {
        ctx.rest(ApiResult("", -102, "参数为空"));
    } else {
        let result = await Script.create({
            projectId: projectId,
            testName: testName,
            testDesc: testDesc,
            filePath: filePath,
            params: params
        });
        console.log(result);
        ctx.rest(ApiResult({}));
    }
    console.log('-------------------- end 创建脚本 ---------------------');
};



exports.list = async (ctx, next) => {
    console.log('-------------------- start 获取脚本列表 ---------------------');
    console.log(ctx.rest);
    let projectId = ctx.params.projectId,
        testName = ctx.params.testName;

    let condition = {};
    if (projectId) {
        condition.projectId = projectId;
    }
    if (testName) {
        condition.testName = testName;
    }
    console.log(condition);
    let result = await Script.findAll({
        where: condition
    });
    console.log(result);
    ctx.rest(ApiResult(result));
    console.log('-------------------- end 获取脚本列表 ---------------------');
};

exports.upload = async (ctx, next) => {
    console.log('-------------------- start 上传脚本 ---------------------');
    let serverFilePath = path.join(__dirname, '../uploads/scripts')
    console.log(serverFilePath);
    // 上传文件事件
    let result = await uploadFile(ctx, {
        fileType: 'js',
        path: serverFilePath
    });
    console.log(result);
    ctx.rest(ApiResult(result.data, result.code, result.message));
    console.log('-------------------- end 上传脚本 ---------------------');
};