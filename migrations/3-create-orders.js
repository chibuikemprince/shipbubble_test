module.exports = {
    up: async (queryInterface, DataTypes) => {
      await queryInterface.createTable('Orders', {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        userId: {
          type: DataTypes.INTEGER,
          allowNull: false,
          references: {
            model: 'Users',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        },
        amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        status: {
          type: DataTypes.STRING,
          allowNull: false,
          defaultValue: 'pending',
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
      await queryInterface.dropTable('Orders');
    },
  };
  