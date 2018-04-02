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

Project.hasMany(Script, {
    foreignKey: 'projectId'
});

// Script.belongsTo(Project, {
//     foreignKey: 'projectId'
// });

// Project.associate = function () {  
//     Project.hasMany(Script)
// };

module.exports = Project;