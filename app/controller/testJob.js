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
        filePath = ctx.request.body.filePath,
        paramsList = ctx.request.body.paramsList;
    if (!scriptId || !filePath) {
        ctx.rest(ApiResult("", -102, "参数为空"));
    } else {
        try {
            let scriptFile = require('../uploads/scripts/' + filePath);
            // if (paramsList && paramsList.length) {
            // (async () => {
            //     for (const item of paramsList) {
            //         console.log(item);
            //         await scriptFile.startJob(ctx.request.body, item);
            //     }
            // })();
            //     paramsList.forEach((item) => {
            //         scriptFile.startJob(ctx.request.body, item);
            //     });
            // } else {
            scriptFile.startJob(ctx.request.body, paramsList);
            // }
        } catch (e) {
            console.log(e);
        }
        ctx.rest(ApiResult({}));
    }
    console.log('-------------------- end 运行测试脚本 ---------------------');
};
/**
 * 
 *  
 * @param {any} ctx 
 * @param {any} next 
 */
exports.list = async (ctx, next) => {
    console.log('-------------------- start 获取运行任务结果 ---------------------');
    console.log(ctx.query);
    console.log(ctx.request.query);
    let scriptId = ctx.query.scriptId;
    if (!scriptId) {
        ctx.rest(ApiResult("", -102, "参数为空"));
    } else {
        let result = {};
        try {
            let condition = {
                deleted: 0
            };
            condition.scriptId = scriptId;
            result = await TestJob.findAll({
                where: condition
            }); 
            console.log(result);
        } catch (e) {
            console.log(e);
        }
        ctx.rest(ApiResult(result));
    }
    console.log('-------------------- end 获取运行任务结果 ---------------------');
};

exports.save = async (params, originParams, testParams) => {
    console.log('-------------------- start 保存运行结果 ---------------------');
    console.log(params);
    console.log(originParams);
    try {
        let result = await TestJob.create({
            scriptId: originParams.id,
            resultImg: params.imgList.join(','),
            resultLog: params.txtLog,
            params: JSON.stringify(testParams)
        });
        console.log(result);
    } catch (e) {
        console.log(e);
    }
    console.log('-------------------- end 保存运行结果 ---------------------');
};