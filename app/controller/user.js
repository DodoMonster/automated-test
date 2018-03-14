/**
 * Created by vslimit on 2017/9/12.
 */
'use strict';
const User = require('../model/User');
const ApiResult = require('../../config/rest').APIResult;

exports.list = async (ctx, next) => {
    console.log('-------------------- start 获取用户列表 ---------------------');
    let currentPage = Number(ctx.query.currentPage) - 1 || 0,
        pageSize = Number(ctx.query.pageSize) || 10;
    let condition = {
        deleted: 0
    };
    let result = await User.findAndCountAll({
        where: condition,
        order: [
            ["updateTime", "DESC"]
        ],
        limit: pageSize,
        offset: currentPage * pageSize,
        attributes: ['id', 'username', 'department']
    });
    ctx.rest(ApiResult(result));
    console.log('-------------------- end 获取用户列表 ---------------------');
};

/**
 *  Create user 
 */
exports.create = async (ctx, next) => {
    let params = {
        username: ctx.request.body.username,
        department: ctx.request.body.department,
        password: ctx.request.body.password
    };

    if (!params.username || !params.department || !params.password) {
        ctx.rest(ApiResult("", -102, "参数不能为空"));
    } else {
        let count = await User.methods.count({
            username: params.username,
            deleted: 0
        });
        if (count > 0) {
            ctx.rest(ApiResult("", -101, "用户名已存在"));
        } else {
            params.salt = User.methods.makeSalt();
            params.password = User.methods.encryptPassword(params.password, params.salt);
            let user = await User.create(params);
            ctx.rest(ApiResult({}));

        }
    }
};

/**
 * 删除用户
 * @param {*} ctx 
 * @param {*} next 
 */
exports.delete = async (ctx, next) => {
    console.log('-------------------- start 删除用户 ---------------------');
    let id = ctx.request.body.id;
    if (!id) {
        ctx.rest(ApiResult("", -102, "参数为空"));
    } else {
        try {
            let result = User.update({
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
    console.log('-------------------- end 删除用户 ---------------------');
};

exports.edit = async (ctx, next) => {
    console.log('-------------------- start 修改用户信息 ---------------------');
    let id = ctx.request.body.id,
        hasChangePwd = ctx.request.body.showEditPwd,
        params = {
            username: ctx.request.body.username,
            department: ctx.request.body.department
        };
    if (!params.username || !params.department) {
        ctx.rest(ApiResult("", -102, "参数不能为空"));
    } else {
        let count = await User.methods.count({
            username: params.username,
            deleted: 0,
            id: {
                $not: id
            }
        });
        if (count > 0) {
            ctx.rest(ApiResult("", -101, "用户名已存在"));
            return;
        }
        if (hasChangePwd) {
            params.salt = User.methods.makeSalt();
            params.password = User.methods.encryptPassword(ctx.request.body.password, params.salt);
            var result = User.update(params, {
                where: {
                    id: id
                }
            });
        } else {
            var result = User.update(params, {
                where: {
                    id: id
                }
            });
        }
        ctx.rest(ApiResult(result));
    }
    console.log('-------------------- end 修改用户信息 ---------------------');
};

exports.login = async (ctx, next) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    if (!username || !password) {
        ctx.rest(ApiResult("", -102, "参数不能为空"));
    } else {
        let user = await User.methods.load({
            username: username
        });             
        if (user) {
            if (User.methods.authenticate(password, user.salt, user.password)) {
                var accessToken = User.methods.makeAccessToken(user.id);
                ctx.rest(ApiResult({
                    username: user.username,
                    accessToken:accessToken
                }));
            } else {
                ctx.rest(ApiResult("", -105, "用户密码错误"));
            }
        } else {
            ctx.rest(ApiResult("", -103, "用户不存在"));
        }
    }
};


exports.load = async (ctx, next) => {
    var u = await User.findById(ctx.params.id);
    ctx.rest(ApiResult(u));
};