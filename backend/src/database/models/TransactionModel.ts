import { Model, INTEGER, DECIMAL, DATE } from "sequelize";
import db from '.';
import Account from "./AccountModel";

class Transaction extends Model {
  declare id: number;
  declare debitedAccountId: number;
  declare creditedAccountId: number;
  declare value: number;
  declare createdAt: Date;
}

Transaction.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: INTEGER,
    },
    debitedAccountId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'accounts',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    creditedAccountId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'accounts',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
    value: {
      allowNull: false,
      type: DECIMAL(10, 2),
    },
    createdAt: {
      allowNull: false,
      type: DATE,
    },
  }, {
    underscored: true,
    sequelize: db,
    timestamps: false,
  }
);

Transaction.belongsTo(Account, { foreignKey: 'debitedAccountId', as: 'debitedAccountId'});
Transaction.belongsTo(Account, { foreignKey: 'creditedAccountId', as: 'creditedAccountId'});

Account.hasMany(Transaction, { foreignKey: 'debitedAccountId', as: 'debitedAccountId'});
Account.hasMany(Transaction, { foreignKey: 'creditedAccountId', as: 'creditedAccountId'});

export default Transaction;