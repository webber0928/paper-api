const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const Strategies = sequelize.define('Strategies', {
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
        name: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        type: {
            type: DataTypes.ENUM('NEW', 'ADJUST'),
            defaultValue: 'NEW'
        },
        minInvestAmount: {
            type: DataTypes.BIGINT,
            defaultValue: 0,
            field: 'min_invest_amount'
        },
        currency: {
            type: DataTypes.ENUM('TWD', 'USD'),
            defaultValue: 'TWD'
        },
        expectReturn: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'expect_return'
        },
        expectDeviation: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'expect_deviation'
        },
        riskLevel: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
            field: 'risk_level'
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: null
        },
        status: {
            type: DataTypes.ENUM('REVIEWING', 'REVIEWED', 'APPROVED', 'PUBLISHED', 'REJECTED'),
            defaultValue: 'REVIEWING'
        },
        isReviewing: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_reviewing',
        },
        reviewingAt: {
            type: DataTypes.BIGINT,
            field: 'reviewing_at',
            allowNull: true
        },
        isReviewed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_reviewed',
        },
        reviewedAt: {
            type: DataTypes.BIGINT,
            field: 'reviewed_at',
            allowNull: true
        },
        isApproved: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_approved',
        },
        approvedAt: {
            type: DataTypes.BIGINT,
            field: 'approved_at',
            allowNull: true
        },
        isPublished: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_published',
        },
        publishedAt: {
            type: DataTypes.BIGINT,
            field: 'published_at',
            allowNull: true
        },
        isRejected: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            field: 'is_rejected',
        },
        rejectedAt: {
            type: DataTypes.BIGINT,
            field: 'rejected_at',
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
        tableName: 'Strategies',
        hooks: {
            beforeCreate: (record, options) => {
                let now = moment().unix('X') * 1000;
                record.dataValues.uuid = uuidv4();
                record.dataValues.createdAt = now;
                record.dataValues.updatedAt = now;
                record.dataValues.reviewingAt = now;
            }
        }
    });

    Strategies.associate = (models) => {
        Strategies.hasMany(models.StrategyItems, { foreignKey: 'strategyId' , as: 'StrategyItems' });
        Strategies.hasMany(models.StrategyRecommends, { foreignKey: 'strategyId', as: 'StrategyRecommends' });
    };

    return Strategies;
};