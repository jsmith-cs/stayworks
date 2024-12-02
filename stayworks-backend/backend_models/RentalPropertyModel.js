const { Model, DataTypes, where } = require("../node_modules/sequelize");
const PersonModel = require("./PersonModel");
const sequelize = require("./db"); // Assuming db.js initializes Sequelize

const RentalPropertyModel = sequelize.define(
  "RentalProperty",
  {
    propertyId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    City: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Province: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    Country: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    PostalCode: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    landlordId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: PersonModel, // Landlord is also a Person
        key: "personId",
      },
    },
  },
  {
    tableName: "RentalProperty",
    timestamps: false,
  }
);

// Associations: Set up relationships between models
// PersonModel.hasMany(RentalPropertyModel, { foreignKey: 'landlordId', as: 'RentalsAsLandlord', where: {role: 'landlord'} });

// RentalPropertyModel.belongsTo(PersonModel, { foreignKey: 'landlordId', as: 'Landlord' });

// RentalPropertyModel.hasMany(PropertyTenantsModel, {
//   foreignKey: 'propertyId',
//   as: 'Tenants',
// });

module.exports = RentalPropertyModel;
