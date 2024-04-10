const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    const UserRoleMapping = sequelize.define('UserRoleMapping', {
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
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id'
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'role_id'
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
        tableName: 'User_Role_Mapping',
        hooks: {
            beforeCreate: (record, options) => {
                let now = moment().unix('X') * 1000;
                record.dataValues.uuid = uuidv4();
                record.dataValues.createdAt = now;
                record.dataValues.updatedAt = now;
            }
        }
    });

    UserRoleMapping.associate = (models) => {
        UserRoleMapping.belongsTo(models.Users, { foreignKey: 'userId', as: 'User' });
        UserRoleMapping.belongsTo(models.Roles, { foreignKey: 'roleId', as: 'Role' });
    };

    return UserRoleMapping;
};