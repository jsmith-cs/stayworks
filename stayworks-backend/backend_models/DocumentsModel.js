const {Model,DataTypes} = require('../node_modules/sequelize');
const sequelize = require('./db'); // Assuming db.js initializes Sequelize

class DocumentsModel extends Model {}

DocumentsModel.init({
  docId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  docType: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fileName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  propertyId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'Documents',
  tableName: 'Documents',
  timestamps: true
});

module.exports = DocumentsModel;