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
    }
    // runTime: {
    //     type: db.DATE(),
    //     defaultValue: db.NOW,
    //     get() {
    //         return moment(this.getDataValue('runTime')).format('YYYY-MM-DD HH:mm:ss');
    //     }
    // }
});


module.exports = Task;