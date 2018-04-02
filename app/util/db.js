const Sequelize = require('sequelize');

console.log('init sequelize...');
const node_env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const Config = require('../../config/dbConfig.js')[node_env];
const moment = require('moment');
console.log('--------------------- start 数据库Config -------------------------');
console.log(Config);
console.log('--------------------- end 数据库Config -------------------------');

var sequelize = new Sequelize(Config.database, Config.username, Config.password, Config.option);

const ID_TYPE = Sequelize.BIGINT();

function defineModel(name, attributes, classMethods) {
    var attrs = {};
    for (let key in attributes) {
        let value = attributes[key];
        if (typeof value === 'object' && value['type']) {
            value.allowNull = value.allowNull || false;
            attrs[key] = value;
        } else {
            attrs[key] = {
                type: value,
                allowNull: false
            };
        }
    }
    attrs.id = {
        type: ID_TYPE,
        primaryKey: true,
        autoIncrement: true
    };
    attrs.createdTime = {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        get: function () {
            return moment.utc(this.getDataValue('createdTime')).utcOffset(+8).format('YYYY-MM-DD HH:mm:ss')
        }
    };
    attrs.updateTime = {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        get: function () {
            return moment.utc(this.getDataValue('updateTime')).utcOffset(+8).format('YYYY-MM-DD HH:mm:ss')
        }
    };
    attrs.deleted = {
        type: Sequelize.ENUM(0, 1),
        allowNull: false,
        defaultValue: 0
    };
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        freezeTableName: true, //否则会自动为表名添加一个后缀s
        //判断是否是isNewRecord从而设置主键、时间戳和版本号
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                obj.updatedTime = now;
                // if (obj.isNewRecord) {
                //     console.log('will create entity...');
                //     obj.createdTime = now;
                //     obj.updatedTime = now;
                //     // obj.version = 0;
                //     // obj.status = 0;
                //     // obj.deleted = 0;
                // } else {
                //     console.log('will update entity...');
                //     obj.updatedTime = now;
                //     // obj.version++;
                // }
            }
        }
    });
}

const TYPES = ['STRING', 'INTEGER', 'ENUM', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN', 'VIRTUAL', 'DATE'];

var exp = {
    defineModel: defineModel,
    sync: () => {
        // only allow create ddl in non-production environment:
        if (process.env.NODE_ENV !== 'production') {
            sequelize.sync({
                force: true
            });
        } else {
            throw new Error('Cannot sync() when NODE_ENV is set to \'production\'.');
        }
    }
};

for (let type of TYPES) {
    exp[type] = Sequelize[type];
}

exp.ID = ID_TYPE;
exp.NOW = Sequelize.NOW;
exp.sequelize = sequelize;

module.exports = exp;