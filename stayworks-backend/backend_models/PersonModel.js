const {Model,DataTypes} = require('../node_modules/sequelize');
const sequelize = require('./db'); // Assuming db.js initializes Sequelize

class PersonModel extends Model {}

PersonModel.init({
  personId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dateofBirth:{
    type: DataTypes.DATE,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  role : {
    type: DataTypes.ENUM({
      values: ['landlord', 'tenant']
    })
  }
}, {
  sequelize,
  modelName: 'Person',
  tableName: 'Person',
  timestamps: false
});

module.exports = PersonModel;