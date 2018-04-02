/**
 * Created by vslimit on 2017/9/10.
 */
const db = require('../util/db');

const Task = db.defineModel('Task', {
    scriptId: {
        type: db.BIGINT(20),
        unique: true,
        allowNull: false
    },
    resultImg: {
        type: db.STRING(1000),
        allowNull: true
    },
    resultLog: {
        type: db.STRING(2000),
        allowNull: true
    },
    params: {
        type: db.STRING(200),
        allowNull: true
    },
    result: {
        type: db.ENUM(0, 1),
        allowNull: false,
        defaultValue: 0
    }
});

module.exports = Task;