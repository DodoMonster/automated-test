const Sequelize = require('sequelize');

console.log('init sequelize...');
const node_env = process.env.NODE_ENV ? process.env.NODE_ENV : 'development';
const Config = require('../../config/dbConfig.js')[node_env];

console.log('--------------------- start 数据库Config -------------------------');
console.log(Config);
console.log('--------------------- start 数据库Config -------------------------');

var sequelize = new Sequelize(Config.database, Config.username, Config.password, Config.option);

const ID_TYPE = Sequelize.BIGINT();

function defineModel(name, attributes) {
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
        defaultValue: Sequelize.NOW
    };
    attrs.deleted = {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 'false'
    };
    // attrs.updated_at = {
    //     type: Sequelize.BIGINT,
    //     allowNull: false
    // };
    // attrs.version = {
    //     type: Sequelize.BIGINT,
    //     allowNull: false
    // };
    // attrs.status = {
    //     type: Sequelize.BIGINT,
    //     allowNull: false
    // };
    // console.log('model defined for table: ' + name + '\n' + JSON.stringify(attrs, function (k, v) {
    //     if (k === 'type') {
    //         for (let key in Sequelize) {
    //             if (key === 'ABSTRACT' || key === 'NUMBER') {
    //                 continue;
    //             }
    //             let dbType = Sequelize[key];
    //             if (typeof dbType === 'function') {
    //                 if (v instanceof dbType) {
    //                     if (v._length) {
    //                         return `${dbType.key}(${v._length})`;
    //                     }
    //                     return dbType.key;
    //                 }
    //                 if (v === dbType) {
    //                     return dbType.key;
    //                 }
    //             }
    //         }
    //     }
    //     return v;
    // }, '  '));
    return sequelize.define(name, attrs, {
        tableName: name,
        timestamps: false,
        freezeTableName: true, //否则会自动为表名添加一个后缀s
        //判断是否是isNewRecord从而设置主键、时间戳和版本号
        hooks: {
            beforeValidate: function (obj) {
                let now = Date.now();
                if (obj.isNewRecord) {
                    console.log('will create entity...' + obj);
                    obj.created_at = now;
                    obj.updated_at = now;
                    obj.version = 0;
                    obj.status = 0;
                    obj.deleted = 0;
                } else {
                    console.log('will update entity...');
                    obj.updated_at = now;
                    obj.version++;
                }
            }
        }
    });
}


const TYPES = ['STRING', 'INTEGER', 'BIGINT', 'TEXT', 'DOUBLE', 'DATEONLY', 'BOOLEAN', 'VIRTUAL'];

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

module.exports = exp;