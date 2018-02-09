/**
 * Created by vslimit on 2017/9/12.
 */
'use strict';
const Script = require('../model/Script'),
    ApiResult = require('../../config/rest').APIResult,
    uploadFile = require('../util/uploadFile');

/**
 *  Create Script 
 */
exports.create = async (ctx, next) => {
    console.log('-------------------- start 创建脚本 ---------------------');
    console.log(ctx.req);
    console.log(next);
    console.log(ctx.request.body);
    console.log('-------------------- end 创建脚本 ---------------------');
    let projectId = ctx.request.body.projectId,
        taskName = ctx.request.body.taskName,
        paramsList = ctx.request.body.paramsList;
    if (!projectId || !taskName) {
        ctx.rest(ApiResult("", -102, "参数为空"));
    } else {
        // 上传文件请求处理
        // let result = {
        //     success: false
        // }
        let serverFilePath = path.join(__dirname, '../scripts')

        // 上传文件事件
        let result = await uploadFile(ctx, {
            fileType: 'js',
            path: serverFilePath
        });
        console.log(result);
        // ctx.body = result
    }
    // let Script = await Script.create({
    //     mobile: mobile,
    //     password: password,
    //     provider: 'local'
    // });
    ctx.rest(ApiResult(result));
};

// exports.login = async(ctx, next) => {
//     let mobile = ctx.request.body.mobile;
//     let password = ctx.request.body.password;
//     if (!mobile || !password) {
//         ctx.rest(ApiResult("", -102, "手机号或密码不能为空"));
//     } else {
//         let Script = await Script.methods.load({mobile: mobile});
//         if (Script) {
//             if (Script.methods.authenticate(password, Script.salt, Script.hashed_password)) {
//                 ctx.rest(ApiResult({
//                     name: Script.name,
//                     mobile: Script.mobile,
//                     access_token: Script.access_token
//                 }));
//             } else {
//                 ctx.rest(ApiResult("", -105, "用户密码错误"));
//             }
//         } else {
//             ctx.rest(ApiResult("", -103, "用户不存在"));
//         }
//     }
// };


// exports.load = async(ctx, next) => {
//     var u = await Script.findById(ctx.params.id);
//     ctx.rest(ApiResult(u));
// };