const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const StrategyRecommends = sequelize.define('StrategyRecommends', {
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
        recommend: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        status: {
            type: DataTypes.ENUM('PENDING', 'NORMAL', 'SUBSPEND'),
            defaultValue: 'NORMAL'
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
        tableName: 'Strategy_Recommends',
        hooks: {
            beforeCreate: (record, options) => {
                let now = moment().unix('X') * 1000;
                record.dataValues.uuid = uuidv4();
                record.dataValues.createdAt = now;
                record.dataValues.updatedAt = now;
            }
        }
    });

    StrategyRecommends.associate = (models) => {
        StrategyRecommends.belongsTo(models.Strategies, { foreignKey: 'strategyId', as: 'Strategy' });
    };

    return StrategyRecommends;
};