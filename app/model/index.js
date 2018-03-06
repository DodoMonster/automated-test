'use strict';

var sequelize = require('../util/db').sequelize;
// console.log(Sequelize.sequelize);
// .sequelize.sequelize();
var Project = require('./Project.js'),
    Script = require('./Script.js'),
    Task = require('./Task.js'),
    User = require('./User.js');

// 建立模型之间的关系
// User.hasOne(UserCheckin);
// UserCheckin.belongsTo(User);
// User.hasMany(UserAddress, {
//     foreignKey: 'user_id',
//     targetKey: 'id',
//     as: 'Address'
// });
// User.belongsToMany(Role, {
//     through: 'userRoles',
//     as: 'UserRoles'
// });
// Role.belongsToMany(User, {
//     through: 'userRoles',
//     as: 'UserRoles'
// });

Project.hasMany(Script, {
    foreignKey: 'projectId',
    targetKey: 'id',
    as: 'TestScript'
});

// 同步模型到数据库中
sequelize.sync();

exports.User = User;
exports.Project = Project;
exports.Task = Task;
exports.Script = Script;