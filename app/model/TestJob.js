/**
 * Created by vslimit on 2017/9/10.
 */
const db = require('../util/db');
const TestJob = db.defineModel('TestJob', {
    scriptId: {
        type: db.BIGINT(20),
        unique: true,
        allowNull: false
    },
    resultImg: db.STRING(1000),
    resultLog: db.STRING(2000),
    params: db.STRING(200),
    runTime: {
        type: db.DATE(),
        defaultValue: db.NOW
    }
});


module.exports = TestJob;