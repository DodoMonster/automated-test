/**
 * Created by vslimit on 2017/9/10.
 */
const db = require('../util/db');
const Script = require('./Script');

const Project = db.defineModel('Project', {
    projectName: {
        type: db.STRING(255),
        allowNull: false
    },
    frontPrincipal: {
        type: db.STRING(30),
        allowNull: false
    },
    endPrincipal: {
        type: db.STRING(30),
        allowNull: true
    },
    areaType: {
        type: db.STRING(30),
        allowNull: false
    }
});
Project.hasMany(Script);

// Project.associate = function (models) {
//     Project.hasMany(models.Script)
// };

module.exports = Project;