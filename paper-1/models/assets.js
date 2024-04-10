const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Assets = sequelize.define('Assets', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        uuid: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        isin: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        nameEng: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            field: 'name_eng',
        },
        riskRating: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'risk_rating'
        },
        investRegion: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
            field: 'invest_region'
        },
        type: {
            type: DataTypes.ENUM('FUND', 'STOCK'),
            defaultValue: 'FUND'
        },
        fundType: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: '未知',
            field: 'fund_type',
        },
        returnRate: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'return_rate'
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_deleted',
        },
        createdAt: {
            type: DataTypes.BIGINT,
            field: 'created_at',
            allowNull: true
        },
        updatedAt: {
            type: DataTypes.BIGINT,
            field: 'updated_at',
            allowNull: true
        },
        deletedAt: {
            type: DataTypes.BIGINT,
            field: 'deleted_at',
            allowNull: true
        },
    }, {
        freezeTableName: true,
        underscored: false,
        timestamps: false,
        tableName: 'Assets',
        hooks: {
            beforeCreate: (record, options) => {
                let now = moment().unix('X') * 1000;
                record.dataValues.uuid = uuidv4();
                record.dataValues.createdAt = now;
                record.dataValues.updatedAt = now;
            }
        }
    });

    return Assets;
};