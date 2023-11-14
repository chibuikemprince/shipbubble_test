module.exports = {
    up: async (queryInterface, DataTypes) => {
      await queryInterface.createTable('Wallets', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          unique: true,
          references: {
            model: 'Users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        balance: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
        },
      });
    },
  
    down: async (queryInterface) => {
      await queryInterface.dropTable('Wallets');
    },
  };
  