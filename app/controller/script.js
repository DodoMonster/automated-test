/**
 * Created by dodomonster on 2018/02/10.
 */
'use strict';

const Script = require('../model/Script'),
    Project = require('../model/Project'),
    ApiResult = require('../../config/rest').APIResult,
    uploadFile = require('../util/uploadFile'),
    path = require('path');
    
// 定义project & script两个model间的关系
Script.belongsTo(Project);
Project.hasMany(Script);

/**
 * 创建测试脚本
 * @param {*} ctx 
 * @param {*} next 
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

/**
 * 创建测试脚本
 * @param {*} ctx 
 * @param {*} next 
 */
exports.edit = async (ctx, next) => {
    console.log('-------------------- start 创建脚本 ---------------------');
    console.log(ctx.request.body);
    let id = ctx.request.body.id,
        projectId = ctx.request.body.projectId,
        testName = ctx.request.body.testName,
        filePath = ctx.request.body.filePath,
        testDesc = ctx.request.body.testDesc,
        params = ctx.request.body.params;
    if (!id || !projectId || !testName) {
        ctx.rest(ApiResult("", -102, "参数为空"));
    } else {
        let result = await Script.update({
            projectId: projectId,
            testName: testName,
            testDesc: testDesc,
            filePath: filePath,
            params: params,
            updateTime: +new Date()
        }, {
            where: {
                id: id
            }
        });
        console.log(result);
        ctx.rest(ApiResult({}));
    }
    console.log('-------------------- end 创建脚本 ---------------------');
};

/**
 * 获取脚本文件
 * @param {*} ctx 
 * @param {*} next 
 */
exports.list = async (ctx, next) => {
    console.log('-------------------- start 获取脚本列表 ---------------------');
    let id = ctx.query.id,
        projectId = ctx.query.projectId,
        testName = ctx.query.testName,
        pageSize = Number(ctx.query.pageSize) || 10,
        currentPage = Number(ctx.query.currentPage) - 1 || 0;
    let condition = {
        deleted: 0
    };
    if (projectId) {
        condition.projectId = projectId;
    }
    if (id) {
        condition.id = id;
    }
    if (testName) {
        condition.testName = {
            $like: testName + '%'
        };
    }


    let result = await Script.findAndCountAll({
        where: condition,
        order: [
            ["updateTime", "DESC"]
        ],
        limit: pageSize,
        offset: currentPage * pageSize,
        include: [{
            model: Project
        }]
    });
    console.log(result);
    ctx.rest(ApiResult(result));
    console.log('-------------------- end 获取脚本列表 ---------------------');
};

/**
 * 上传脚本文件
 * @param {*} ctx 
 * @param {*} next 
 */
exports.upload = async (ctx, next) => {
    console.log('-------------------- start 上传脚本 ---------------------');
    let serverFilePath = path.join(__dirname, '../static/uploads/scripts')
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

/**
 * 删除脚本文件
 * @param {*} ctx 
 * @param {*} next 
 */
exports.delete = async (ctx, next) => {
    console.log('-------------------- start 删除脚本文件 ---------------------');
    let id = ctx.request.body.id;
    if (!id) {
        ctx.rest(ApiResult("", -102, "参数为空"));
    } else {
        try {
            let result = Script.update({
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
    console.log('-------------------- end 删除脚本文件 ---------------------');
};