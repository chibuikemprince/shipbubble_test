import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../helpers/dbConnect';

import User from './User';

interface OrderAttributes {
  id: number;
  userId: number;
  amount: number;
  status: string;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class Order extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number;
  public userId!: number;
  public amount!: number;
  public status!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly User?: User;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
  },
  {
    sequelize,
    modelName: 'Order',
  }
);

Order.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

export default Order;
