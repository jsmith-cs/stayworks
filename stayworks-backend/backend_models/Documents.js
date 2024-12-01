const DocumentsModel = require('./DocumentsModel');
const sequelize = require('./db');
class Documents {
    constructor(docType,fileName,propertyId,location) {
        this.docType = docType;
        this.fileName = fileName;
        this.propertyId = propertyId;
        this.location = location;
    }
  
    // Method specific to landlord
    // getDocuments() {
    //   return `${this.getPersonInfo()}, Properties Owned: ${this.propertiesOwned.join(", ")}, Bank Details: ${this.bankDetails}`;
    // }

    async create(){
        try {
          const Documents = await DocumentsModel.create({
            docType:this.docType,
            fileName: this.fileName,
            propertyId: this.propertyId,
            location:this.location
          });

          console.log("Document saved:", Documents);
        } catch (error) {
          console.error("Error saving Document:", error);
        }
    }

    static async getDoc(docId) {
        try {
            const loc = await DocumentsModel.findByPk(docId)
            return loc.getDataValue('location');
        }catch(error){
            console.error("Error getting location:", error);
            throw error;
        }
      }


      static async getDocsByPropertyId(propertyId) {
        try {
          const properties = await sequelize.query(' SELECT * FROM Documents WHERE propertyId = '+ propertyId+ ';')
    
          if (properties.length === 0) {
            console.log("No Docs found for this property.");
          } else {
            console.log(`Docs found`);
            
          }
        //   console.log(properties);
        return properties;
        } catch (error) {
          console.error("Error fetching properties for landlord:", error);
          throw error;
        }
      }

      static async getDocsByLandlordId(landlordId) {
        try {
          const properties = await sequelize.query(' SELECT * FROM Documents inner join RentalProperty on RentalProperty.propertyId = Documents.propertyId where landlordId = '+ landlordId+ ';')
    
          if (properties.length === 0) {
            console.log("No Docs found for this property.");
            
          } else {
            console.log(`Docs found`);
            return properties;
          }
        //   console.log(properties);
          
        } catch (error) {
          console.error("Error fetching properties for landlord:", error);
          throw error;
        }
      }
    
}

// const a1 = new Documents('Test','1730649416591.png',123);

// a1.create();




// (async () => {
//     try {

//         const test= await Documents.getDocsByLandlordId(5);
//         console.log(test);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   })();


// (async () => {
//     try {

//         const test= await Documents.getDoc(5);
//         console.log(test);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   })();

 
module.exports = Documents;