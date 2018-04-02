/**
 * Created by vslimit on 2017/9/12.
 */
'use strict';
const Task = require('../model/Task'),
    Script = require('../model/Script'),
    Project = require('../model/Project'),
    ApiResult = require('../../config/rest').APIResult,
    path = require('path');

/**
 * run 运行脚本接口
 * @param {*} ctx 
 * @param {*} next 
 */
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
            let scriptFile = require('../static/uploads/scripts/' + filePath);
            scriptFile.startJob(ctx.request.body, paramsList);
        } catch (e) {
            console.log(e);
        }
        ctx.rest(ApiResult({}));
    }
    console.log('-------------------- end 运行测试脚本 ---------------------');
};

/**
 * delete 删除测试结果接口
 * @param {*} ctx 
 * @param {*} next 
 */
exports.delete = async (ctx, next) => {
    console.log('-------------------- start 删除测试结果 ---------------------');
    let id = ctx.request.body.id;
    if (!id) {
        ctx.rest(ApiResult("", -102, "参数为空"));
    } else {
        try {
            let result = Task.update({
                deleted: 1
            }, {
                where: {
                    id: id
                }
            });
            console.log(result);
        } catch (e) {
            console.log(e);
        }
        ctx.rest(ApiResult({}));
    }
    console.log('-------------------- end 删除测试结果 ---------------------');
};

/**
 * list 获取脚本运行结果
 * @param {any} ctx 
 * @param {any} next 
 */
exports.list = async (ctx, next) => {
    console.log('-------------------- start 获取运行任务结果 ---------------------');
    console.log(ctx.request.query);
    let scriptId = ctx.query.scriptId,
        currentPage = Number(ctx.query.currentPage) - 1 || 0,
        pageSize = Number(ctx.query.pageSize) || 10;
    if (!scriptId) {
        ctx.rest(ApiResult("", -102, "参数为空"));
    } else {
        let result = {};
        try {
            let condition = {
                deleted: 0
            };
            condition.scriptId = scriptId;
            result = await Task.findAndCountAll({
                where: condition,
                order: [
                    ["updateTime", "DESC"]
                ],
                limit: pageSize,
                offset: currentPage * pageSize
            });
            console.log(result);
        } catch (e) {
            console.log(e);
        }
        ctx.rest(ApiResult(result));
    }
    console.log('-------------------- end 获取运行任务结果 ---------------------');
};

/**
 * save 保存运行结果
 * @param {*} testResult 测试结果，含截图imgList,日志txtLog
 * @param {*} originParams 点击运行发起运行接口请求的前端的请求参数
 * @param {*} testParams 用户输入的测试用例参数
 */
exports.save = async (testResult, originParams, testParams) => {
    console.log('-------------------- start 保存运行结果 ---------------------');
    console.log(testResult);
    console.log(originParams);
    try {
        let result = await Task.create({
            scriptId: originParams.id,
            resultImg: testResult ? testResult.imgList.join(',') : null,
            resultLog: testResult.txtLog,
            result:testResult.runResult || 0,
            params: JSON.stringify(testParams)
        });
        console.log(result);

        // 更新脚本运行的最后一次结果
        let lastRunTime = new Date();
        Script.update({
            lastRunTime: lastRunTime
        }, {
            where: {
                id: originParams.id
            }
        }).then(function (res) {
            console.log(res);
        });
    } catch (e) {
        console.log(e);
    }
    console.log('-------------------- end 保存运行结果 ---------------------');
};