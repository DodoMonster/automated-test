/**
 * Created by vslimit on 2017/9/12.
 */
'use strict';
const User = require('../model/User');
const ApiResult = require('../../config/rest').APIResult;

/**
 *  Create user 
 */
exports.create = async (ctx, next) => {
    let mobile = ctx.request.body.mobile;
    let password = ctx.request.body.password;
    console.log(mobile);
    console.log(password);
    if (!mobile || !password) {
        ctx.rest(ApiResult("", -102, "手机号或密码不能为空"));
    } else {
        let count = await User.methods.count({
            mobile: mobile
        });
        console.log(count);
        if (count > 0) {
            ctx.rest(ApiResult("", -101, "手机号已存在"));
        } else {
            let user = await User.create({
                mobile: mobile,
                password: password,
                provider: 'local'
            });
            ctx.rest(ApiResult(user.access_token));
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

exports.list = async (ctx, next) => {
    let condition = {
        deleted: 0
    };
    let result = await User.findAndCountAll({
        where: condition,
        order: [
            ["updateTime", "DESC"]
        ],
        limit: pageSize,
        offset: currentPage * pageSize
    });
    ctx.rest(ApiResult(result));
};

exports.login = async (ctx, next) => {
    let mobile = ctx.request.body.mobile;
    let password = ctx.request.body.password;
    if (!mobile || !password) {
        ctx.rest(ApiResult("", -102, "手机号或密码不能为空"));
    } else {
        let user = await User.methods.load({
            mobile: mobile
        });
        if (user) {
            if (User.methods.authenticate(password, user.salt, user.hashed_password)) {
                ctx.rest(ApiResult({
                    name: user.name,
                    mobile: user.mobile,
                    access_token: user.access_token
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