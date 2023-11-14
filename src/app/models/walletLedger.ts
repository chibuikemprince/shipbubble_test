import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from '../helpers/dbConnect';

interface WalletLedgerAttributes {
  id: number;
  userId: number;
  amount: number;
  info?: string | null;
}

interface WalletLedgerCreationAttributes extends Optional<WalletLedgerAttributes, 'id'> {}

class WalletLedger extends Model<WalletLedgerAttributes, WalletLedgerCreationAttributes> implements WalletLedgerAttributes {
  public id!: number;
  public userId!: number;
  public amount!: number;
  public info?: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

WalletLedger.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    info: {
      type: DataTypes.STRING,
      allowNull: true,
    },
     
  },
  {
    sequelize,
    modelName: 'Walletledgers' 
   // tableName: 'WalletLedger',
  }
);

export default WalletLedger;
