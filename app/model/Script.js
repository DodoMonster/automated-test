/**
 * Created by vslimit on 2017/9/10.
 */
const db = require('../util/db');
const moment = require('moment');
const Project = require('./Project');

const Script = db.defineModel('Script', {
    filePath: {
        type: db.STRING(),
        unique: true,
        allowNull: false
    },
    projectId: db.BIGINT(),
    projectId: {
        type: db.BIGINT(11),
        field: 'projectId',
        references: {
            model: 'Project',
            key: 'id'
        },
    },
    testName: {
        type: db.STRING(),
        unique: true
    },
    testDesc: {
        type: db.STRING(500),
        allowNull: true
    },
    params: {
        type: db.STRING(500),
        allowNull: true
    },
    lastRunTime: {
        type: db.DATE,
        allowNull: true,
        get: function () {
            return moment.utc(this.getDataValue('lastRunTime')).utcOffset(+8).format('YYYY-MM-DD HH:mm:ss')
        }
    }
});

// Project.hasMany(Script, {foreignKey: 'projectId'});
console.log(db.model);
// Script.belongsTo(Project, {foreignKey: 'projectId'});

// Script.beforeValidate(function (Script) {
//     if (Script.isNewRecord) {
//         let salt = this.methods.makeSalt();
//         Script.set('salt', salt);
//         Script.set('hashed_password', this.methods.encryptPassword(Script.password, salt));
//     }
// });

// Script.afterCreate(function (Script) {
//     console.log(JSON.stringify(Script));
//     // Script.access_token = this.methods.makeAccessToken(Script.id);
//     // console.log(Script.access_token);
//     Script.save();
// });

Script.methods = {
    // authenticate: function (password, salt, hashed_password) {
    //     return this.encryptPassword(password, salt) === hashed_password;
    // },

    /**
     * Make salt
     *
     * @return {String}
     * @api public
     */
    // makeSalt: function () {
    //     return Math.round((new Date().valueOf() * Math.random())) + '';
    // },
    // makeAccessToken: function (id) {
    //     return crypto
    //         .createHmac('sha1', id.toString())
    //         .update(uuid.v4() + Date.now())
    //         .digest('hex');
    // },
};

module.exports = Script;