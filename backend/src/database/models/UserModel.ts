import { Model, INTEGER, STRING } from 'sequelize'
import db from '.'
import Account from './AccountModel'

class User extends Model {
  declare id: number
  declare username: string
  declare password: string
  declare accountId: number
}

User.init(
  {
    id: {
      type: INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      allowNull: false,
      type: STRING(50),
    },
    password: {
      allowNull: false,
      type: STRING(50),
    },
    accountId: {
      type: INTEGER,
      allowNull: false,
      references: {
        model: 'accounts',
        key: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    },
  }, {
    underscored: true,
    sequelize: db,
    timestamps: false,
  }
)

User.belongsTo(Account, { foreignKey: 'accountId', as: 'accountId'})
Account.hasOne(User, { foreignKey: 'accountId', as: 'accountId'})

export default User