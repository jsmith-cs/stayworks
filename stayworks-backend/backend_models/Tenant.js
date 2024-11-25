const sequelize = require('./db');

class Tenant {
    

    static async getAllTenants(landLordId) {
        try {
          const properties = await sequelize.query(' SELECT * from Tenants where landlord_id = '+ landLordId+ ';')
    
          if (properties.length === 0) {
            console.log("No Tenants found for this property.");
          } else {
            console.log(`Tenants found`);
          }
        //   console.log(properties);
          return properties;
        } catch (error) {
          console.error("Error fetching properties for landlord:", error);
          throw error;
        }
      }

}


module.exports = Tenant;