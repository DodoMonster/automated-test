/**
 * Created by vslimit on 2017/9/12.
 */
'use strict';
const TestJob = require('../model/TestJob'),
    ApiResult = require('../../config/rest').APIResult,
    path = require('path');

exports.run = async (ctx, next) => {
    console.log('-------------------- start 运行测试脚本 ---------------------');
    console.log(ctx.request.body);
    let scriptId = ctx.request.body.id,
        // filePath = ctx.request.body.filePath,
        filePath = '1518330718323_5075e66b0c5af.js',
        paramsList = ctx.request.body.paramsList;
    if (!scriptId || !filePath) {
        ctx.rest(ApiResult("", -102, "参数为空"));
    } else {
        let scriptFilePath = path.join(__dirname, '../uploads/scripts/' + filePath),
            scriptFile = require('../uploads/scripts/' + filePath);
        console.log(scriptFilePath);
        console.log(scriptFile.startJob);
        try {
            paramsList.forEach((item) => {
                scriptFile.startJob(item, ctx.request.body);
            });
        } catch (e) {
            console.log(e);
            scriptFile.startJob(paramsList, ctx.request.body);
        }
        ctx.rest(ApiResult({}));
    }
    console.log('-------------------- end 运行测试脚本 ---------------------');
};

exports.create = async (params) => {
    console.log('-------------------- start 保存运行结果 ---------------------');
    let scriptId = ctx.request.body.id,
        // filePath = ctx.request.body.filePath,
        filePath = '1518330718323_5075e66b0c5af.js',
        paramsList = ctx.request.body.paramsList;
    if (!scriptId || !filePath) {
        ctx.rest(ApiResult("", -102, "参数为空"));
    } else {
        let scriptFilePath = path.join(__dirname, '../uploads/scripts/' + filePath),
            scriptFile = require('../uploads/scripts/' + filePath);
        console.log(scriptFilePath);
        console.log(scriptFile.startJob);
        try {
            paramsList.forEach((item) => {
                scriptFile.startJob(item);
            });
        } catch (e) {
            console.log(e);
            scriptFile.startJob(paramsList);
        }
        ctx.rest(ApiResult({}));
    }
    console.log('-------------------- end 保存运行结果 ---------------------');
};