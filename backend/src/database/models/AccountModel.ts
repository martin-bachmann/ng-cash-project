import { Model, INTEGER, DECIMAL } from "sequelize";
import db from '.';

class Account extends Model {
  declare id: number;
  declare balance: number;
}

Account.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    balance: {
      allowNull: false,
      type: DECIMAL(10, 2),
    }, 
  }, {
    underscored: true,
    sequelize: db,
    timestamps: false,
  }
);

export default Account;