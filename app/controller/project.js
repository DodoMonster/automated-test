/**
 * Created by dodomonster on 2018/03/05.
 */
'use strict';
const Project = require('../model/Project');
const ApiResult = require('../../config/rest').APIResult;

/**
 *  Create project 
 */
exports.create = async (ctx, next) => {
    console.log('-------------------- start 添加项目 ---------------------');
    var params = {
        projectName: ctx.request.body.projectName,
        frontPrincipal: ctx.request.body.frontPrincipal,
        endPrincipal: ctx.request.body.endPrincipal,
        areaType: ctx.request.body.areaType
    };
    if (!params.projectName || !params.frontPrincipal || !params.areaType) {
        ctx.rest(ApiResult("", -102, "参数不能为空"));
    } else {
        let condition = {
            deleted: 0,
            projectName: params.projectName
        };
        let data = await Project.findAll({
            where: condition
        });
        if (data && data.length === 0) {
            let result = await Project.create(params);
            ctx.rest(ApiResult(result));
        } else {
            ctx.rest(ApiResult({}, -103, "该项目名称已存在~"));
        }
    }
    console.log('-------------------- end 添加项目 ---------------------');
};

/**
 * 删除项目
 * @param {*} ctx 
 * @param {*} next 
 */
exports.delete = async (ctx, next) => {
    console.log('-------------------- start 删除项目 ---------------------');
    let id = ctx.request.body.id;
    if (!id) {
        ctx.rest(ApiResult("", -102, "参数为空"));
    } else {
        try {
            let result = Project.update({
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
    console.log('-------------------- end 删除项目 ---------------------');
};

exports.list = async (ctx, next) => {
    console.log('-------------------- start 获取项目列表 ---------------------');
    let currentPage = Number(ctx.query.currentPage) - 1 || 0,
        pageSize = Number(ctx.query.pageSize) || 10,
        func = ctx.query.function;
    let condition = {
        deleted: 0
    };
    if (func) {
        var result = await Project.findAll({
            where: condition
        });
    } else {
        var result = await Project.findAndCountAll({
            where: condition,
            order: [
                ["updateTime", "DESC"]
            ],
            limit: pageSize,
            offset: currentPage * pageSize
        });
    }

    ctx.rest(ApiResult(result));
    console.log('-------------------- end 获取项目列表 ---------------------');

};

exports.edit = async (ctx, next) => {
    console.log('-------------------- start 修改项目信息 ---------------------');
    let id = ctx.request.body.id,
        params = {
            projectName: ctx.request.body.projectName,
            frontPrincipal: ctx.request.body.frontPrincipal,
            endPrincipal: ctx.request.body.endPrincipal,
            areaType: ctx.request.body.areaType
        }
    if (!params.projectName || !params.frontPrincipal || !params.areaType) {
        ctx.rest(ApiResult("", -102, "参数不能为空"));
    } else {
        let condition = {
            deleted: 0,
            projectName: params.projectName
        };
        let data = await Project.findAll({
            where: condition
        });

        if ((data && data.length === 0) || (data && data.length === 1 && data[0].dataValues && data[0].dataValues.id === id)) {
            let result = Project.update(params, {
                where: {
                    id: id
                }
            });
            ctx.rest(ApiResult(result));
        } else {
            ctx.rest(ApiResult({}, -103, "该项目名称已存在~"));
        }
        // let result = Project.update(params, {
        //     where: {
        //         id: id
        //     }
        // });
        // ctx.rest(ApiResult(result));
    }
    console.log('-------------------- end 修改项目信息 ---------------------');

};