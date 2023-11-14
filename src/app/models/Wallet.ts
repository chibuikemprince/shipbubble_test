import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../helpers/dbConnect';
import User from './User';

interface WalletAttributes {
  id: number;
  userId: number;
  balance: number;
}

interface WalletCreationAttributes extends Optional<WalletAttributes, 'id'> {}

class Wallet extends Model<WalletAttributes, WalletCreationAttributes> implements WalletAttributes {
  public id!: number;
  public userId!: number;
  public balance!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly User?: User;
}

Wallet.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    balance: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Wallet',
  }
);

Wallet.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});

export default Wallet;
