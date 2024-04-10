module.exports = {
    up: async (queryInterface, Sequelize) => {

        await queryInterface.createTable('Roles', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            uuid: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: true,
                defaultValue: null
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            created_at: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            deleted_at: {
                type: Sequelize.BIGINT,
                allowNull: true,
                defaultValue: null
            }
        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });

        await queryInterface.createTable('Users', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            uuid: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: true,
                defaultValue: null
            },
            email: {
                type: Sequelize.STRING(255),
                allowNull: true,
                defaultValue: null
            },
            password: {
                type: Sequelize.STRING(255),
                allowNull: true,
                defaultValue: null
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            created_at: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            deleted_at: {
                type: Sequelize.BIGINT,
                allowNull: true,
                defaultValue: null
            }
        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });

        await queryInterface.createTable('User_Role_Mapping', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            uuid: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
                defaultValue: null
            },
            role_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Roles',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
                defaultValue: null
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            created_at: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            deleted_at: {
                type: Sequelize.BIGINT,
                allowNull: true,
                defaultValue: null
            }
        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });

        await queryInterface.createTable('Allocations', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            uuid: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: true,
                defaultValue: null
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            created_at: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            deleted_at: {
                type: Sequelize.BIGINT,
                allowNull: true,
                defaultValue: null
            }
        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });

        await queryInterface.createTable('Regions', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            uuid: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: true,
                defaultValue: null
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            created_at: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            deleted_at: {
                type: Sequelize.BIGINT,
                allowNull: true,
                defaultValue: null
            }
        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });

        await queryInterface.createTable('Strategies', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            uuid: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            type: {
                type: Sequelize.ENUM('NEW', 'ADJUST'),
                defaultValue: 'NEW'
            },
            min_invest_amount: {
                type: Sequelize.BIGINT,
                defaultValue: 0
            },
            currency: {
                type: Sequelize.ENUM('TWD', 'USD'),
                defaultValue: 'TWD'
            },
            expect_return: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            expect_deviation: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            risk_level: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: true,
                defaultValue: null
            },
            status: {
                type: Sequelize.ENUM('REVIEWING', 'REVIEWED', 'APPROVED', 'PUBLISHED', 'REJECTED'),
                defaultValue: 'REVIEWING'
            },
            is_reviewing: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            reviewing_at: {
                type: Sequelize.BIGINT,
                allowNull: true,
                defaultValue: null
            },
            is_reviewed: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            reviewed_at: {
                type: Sequelize.BIGINT,
                allowNull: true,
                defaultValue: null
            },
            is_approved: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            approved_at: {
                type: Sequelize.BIGINT,
                allowNull: true,
                defaultValue: null
            },
            is_published: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            published_at: {
                type: Sequelize.BIGINT,
                allowNull: true,
                defaultValue: null
            },
            is_rejected: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            rejected_at: {
                type: Sequelize.BIGINT,
                allowNull: true,
                defaultValue: null
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            created_at: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            deleted_at: {
                type: Sequelize.BIGINT,
                allowNull: true,
                defaultValue: null
            }
        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });

        await queryInterface.createTable('Assets', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            uuid: {
                type: Sequelize.STRING(255),
                allowNull: true,
                defaultValue: null
            },
            isin: {
                type: Sequelize.STRING(255),
                allowNull: true,
                defaultValue: null
            },
            name: {
                type: Sequelize.STRING(255),
                allowNull: true,
                defaultValue: null
            },
            name_eng: {
                type: Sequelize.STRING(255),
                allowNull: true,
                defaultValue: null
            },
            risk_rating: {
                type: Sequelize.INTEGER,
                defaultValue: 1
            },
            invest_region: {
                type: Sequelize.STRING(255),
                allowNull: true,
                defaultValue: null
            },
            type: {
                type: Sequelize.ENUM('FUND', 'STOCK', 'ETF', 'CASH'),
                defaultValue: 'FUND'
            },
            fund_type: {
                type: Sequelize.STRING(255),
                allowNull: true,
                defaultValue: '未知',
            },
            return_rate: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            created_at: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            deleted_at: {
                type: Sequelize.BIGINT,
                allowNull: true,
                defaultValue: null
            }
        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });

        await queryInterface.createTable('Strategy_Items', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            uuid: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            strategy_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Strategies',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
                defaultValue: null
            },
            asset_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Assets',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
                defaultValue: null
            },
            allocation: {
                type: Sequelize.INTEGER,
                defaultValue: 0
            },
            status: {
                type: Sequelize.ENUM('ENABLE', 'DISABLE'),
                defaultValue: 'ENABLE'
            },
            is_disable: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            disable_at: {
                type: Sequelize.BIGINT,
                allowNull: true,
                defaultValue: null
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            created_at: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            deleted_at: {
                type: Sequelize.BIGINT,
                allowNull: true,
                defaultValue: null
            }
        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });

        await queryInterface.createTable('Strategy_Recommends', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            uuid: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            strategy_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Strategies',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
                defaultValue: null
            },
            recommend: {
                type: Sequelize.TEXT,
                allowNull: true,
                defaultValue: null
            },
            status: {
                type: Sequelize.ENUM('PENDING', 'NORMAL', 'SUBSPEND'),
                defaultValue: 'NORMAL'
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            created_at: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            deleted_at: {
                type: Sequelize.BIGINT,
                allowNull: true,
                defaultValue: null
            }
        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });

        await queryInterface.createTable('Fund_Allocation_Mapping', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            uuid: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            asset_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Assets',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
                defaultValue: null
            },
            allocation_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Allocations',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
                defaultValue: null
            },
            percentage: {
                type: Sequelize.FLOAT,
                defaultValue: 0
            },
            status: {
                type: Sequelize.ENUM('PENDING', 'NORMAL', 'SUBSPEND'),
                defaultValue: 'NORMAL'
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            created_at: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            deleted_at: {
                type: Sequelize.BIGINT,
                allowNull: true,
                defaultValue: null
            }
        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });

        await queryInterface.createTable('Fund_Region_Mapping', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            uuid: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            asset_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Assets',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
                defaultValue: null
            },
            region_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Regions',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL',
                allowNull: true,
                defaultValue: null
            },
            percentage: {
                type: Sequelize.FLOAT,
                defaultValue: 0
            },
            status: {
                type: Sequelize.ENUM('PENDING', 'NORMAL', 'SUBSPEND'),
                defaultValue: 'NORMAL'
            },
            is_deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false
            },
            created_at: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            updated_at: {
                type: Sequelize.BIGINT,
                allowNull: false
            },
            deleted_at: {
                type: Sequelize.BIGINT,
                allowNull: true,
                defaultValue: null
            }
        }, {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        });

        await queryInterface.addIndex('Users', ['uuid']);
        await queryInterface.addIndex('Users', ['email']);
        await queryInterface.addIndex('Roles', ['name']);
        await queryInterface.addIndex('User_Role_Mapping', ['user_id']);
        await queryInterface.addIndex('User_Role_Mapping', ['user_id', 'role_id']);
        await queryInterface.addIndex('Strategies', ['uuid']);
        await queryInterface.addIndex('Strategies', ['status']);
        await queryInterface.addIndex('Strategies', ['is_approved']);
        await queryInterface.addIndex('Assets', ['uuid']);
        await queryInterface.addIndex('Assets', ['isin']);
        await queryInterface.addIndex('Assets', ['name']);
        await queryInterface.addIndex('Assets', ['risk_rating']);
        await queryInterface.addIndex('Assets', ['name', 'risk_rating']);
        await queryInterface.addIndex('Strategy_Items', ['strategy_id']);
        await queryInterface.addIndex('Strategy_Items', ['asset_id']);
        await queryInterface.addIndex('Strategy_Items', ['strategy_id', 'is_disable']);
        await queryInterface.addIndex('Strategy_Items', ['strategy_id', 'is_disable', 'disable_at']);
        await queryInterface.addIndex('Strategy_Recommends', ['strategy_id']);
        await queryInterface.addIndex('Fund_Allocation_Mapping', ['allocation_id']);
        await queryInterface.addIndex('Fund_Allocation_Mapping', ['asset_id']);
        await queryInterface.addIndex('Fund_Region_Mapping', ['region_id']);
        await queryInterface.addIndex('Fund_Region_Mapping', ['asset_id']);
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Fund_Allocation_Mapping');
        await queryInterface.dropTable('Fund_Region_Mapping');
        await queryInterface.dropTable('Strategy_Recommends');
        await queryInterface.dropTable('Strategy_Items');
        await queryInterface.dropTable('Strategies');
        await queryInterface.dropTable('Assets');
        await queryInterface.dropTable('Regions');
        await queryInterface.dropTable('Allocations');
        await queryInterface.dropTable('User_Role_Mapping');
        await queryInterface.dropTable('Roles');
        await queryInterface.dropTable('Users');
    }
};
