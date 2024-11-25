const RentalPropertyModel = require('./RentalPropertyModel');
const PersonModel = require('./PersonModel'); // Assuming landlords are persons
const sequelize = require('./db');
// const Landlord = require('./Landlord');

class RentalProperty {
  constructor( address,city,province,country, postalCode,landlordId) {

    this.address = address;
    this.landlordId = landlordId;
    this.city = city;
    this.province = province;
    this.country = country;
    this.postalCode = postalCode;
  }

  // Method to create a new rental property and associate it with a landlord
  async create() {
    try {
      // Ensure the landlord exists in the database
      const landlord = await PersonModel.findAll({
        where: {
          personId: this.landlordId
        },
      });
      if (!landlord) {
        throw new Error("Landlord not found!");
      }

      console.log(this.city);
      console.log(this.postalCode);
      // Create a new rental property
      const newProperty = await RentalPropertyModel.create({
        address: this.address,
        City: this.city,
        Province: this.province,
        Country: this.country,
        PostalCode:this.postalCode,
        landlordId: this.landlordId, // Associate the landlord with the property
      });

      // console.log("Rental property created successfully:", newProperty);
      return newProperty.dataValues;
    } catch (error) {
      console.error("Error creating rental property:", error);
      throw error;
    }
  }

  static async getProperty(propertyId) {
    try {
        const property = await RentalPropertyModel.findByPk(propertyId)
        return property.dataValues;
    }catch(error){
        console.error("Error getting location:", error);
        throw error;
    }
  }


  static async getPropertiesByLandlord(landlordId) {
    try {
      const properties = await sequelize.query(' SELECT * FROM `RentalProperty` where `landlordId` = '+landlordId+';')

      if (properties.length === 0) {
        console.log("No properties found for this landlord.");
      }
      return properties[0];
    } catch (error) {
      console.error("Error fetching properties for landlord:", error);
      throw error;
    }
  }


}


// (async () => {
//     try {

//       // const alandlord = await RentalProperty.getPropertiesByLandlord(1);
//       //   Create a new rental property for a landlord
//       const newProperty = new RentalProperty("789 abc St","Brampton","Ontario","Canada",'asdasda',
//         "1");
//       const np = await newProperty.create();
//       console.log(np)
//       // console.log("New rental property created:", newProperty);
  
//       // Fetch properties for a landlord
//       // const properties = await RentalProperty.getPropertiesByLandlord(1);
//       // console.log("Properties for landlord 1:", properties);
//       // console.log(await RentalProperty.getPropertiesByLandlord2(1));

//       // console.log(await RentalProperty.getProperty(1));
     
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   })();

module.exports = RentalProperty;