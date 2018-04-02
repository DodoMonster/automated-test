/**
 * Created by vslimit on 2017/9/10.
 */
const db = require('../util/db');
const moment = require('moment');

var Script = db.defineModel('Script', {
    filePath: {
        type: db.STRING(),
        unique: true,
        allowNull: false
    },
    projectId: {
        type: db.BIGINT()
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


module.exports = Script;