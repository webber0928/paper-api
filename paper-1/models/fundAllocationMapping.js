const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const FundAllocationMapping = sequelize.define('FundAllocationMapping', {
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
        assetId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'asset_id'
        },
        allocationId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'allocation_id'
        },
        percentage: {
            type: DataTypes.FLOAT,
            defaultValue: 0
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
        tableName: 'Fund_Allocation_Mapping',
        hooks: {
            beforeCreate: (record, options) => {
                let now = moment().unix('X') * 1000;
                record.dataValues.uuid = uuidv4();
                record.dataValues.createdAt = now;
                record.dataValues.updatedAt = now;
            }
        }
    });

    FundAllocationMapping.associate = (models) => {
        FundAllocationMapping.belongsTo(models.Allocations, { foreignKey: 'allocationId', as: 'Allocation' });
        FundAllocationMapping.belongsTo(models.Assets, { foreignKey: 'assetId', as: 'Asset' });
    };

    return FundAllocationMapping;
};