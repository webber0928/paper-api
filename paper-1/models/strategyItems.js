const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const StrategyItems = sequelize.define('StrategyItems', {
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
        strategyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'strategy_id'
        },
        assetId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'asset_id'
        },
        allocation: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
        status: {
            type: DataTypes.ENUM('ENABLE', 'DISABLE'),
            defaultValue: 'ENABLE'
        },
        isDisable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_disable',
        },
        disableAt: {
            type: DataTypes.BIGINT,
            field: 'disable_at',
            allowNull: true
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
        tableName: 'Strategy_Items',
        hooks: {
            beforeCreate: (record, options) => {
                let now = moment().unix('X') * 1000;
                record.dataValues.uuid = uuidv4();
                record.dataValues.createdAt = now;
                record.dataValues.updatedAt = now;
            }
        }
    });

    StrategyItems.associate = (models) => {
        StrategyItems.belongsTo(models.Strategies, { foreignKey: 'strategyId', as: 'Strategy' });
        StrategyItems.belongsTo(models.Assets, { foreignKey: 'assetId', as: 'Asset' });
    };

    return StrategyItems;
};