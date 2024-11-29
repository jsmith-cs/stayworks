const {Model,DataTypes, where} = require('../node_modules/sequelize');

const sequelize = require('./db'); // Assuming db.js initializes Sequelize

const ExpensesModel  = sequelize.define('Expenses', {
    expenseId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    propertyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'RentalProperty', // Name of the referenced table
        key: 'propertyId', // Key in the referenced table
      },
    },
    expenseDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isRecurring: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    recurrFrequency: {
      type: DataTypes.ENUM('daily', 'weekly', 'monthly', 'yearly'),
      allowNull: true,
    },
    recurrStartDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    recurrEndDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  }, {
    tableName: 'Expenses', // Explicitly specify the table name
    timestamps: true, // Enable automatic `createdAt` and `updatedAt`
    createdAt: 'created_at', // Map to custom column name
    updatedAt: 'updated_at', // Map to custom column name
  });



  module.exports = ExpensesModel;