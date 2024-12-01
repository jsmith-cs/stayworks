const sequelize = require('./db');
const { QueryTypes } = require("sequelize");


class Revenue {
    

    static async getThisMonthRevenue(landLordId) {
        try {
            const q = 'SELECT * FROM STAYWORKSTestEnv.revenueByLandlordId  where landlordid = ? and EOM = LAST_DAY(NOW());'
            const revenue = await sequelize.query(q,{replacements: [landLordId],type:QueryTypes.SELECT})
          if (revenue.length === 0) {
            console.log("No Revenue found for this property.");
          } else {
            console.log(`Revenue found`);
            return revenue[0];
          }
          
        } catch (error) {
          console.error("Error fetching Revenue for landlord:", error);
          throw error;
        }
      }

}


module.exports = Revenue;

// (async () => {
//     try {

//         const r = await Revenue.getThisMonthRevenue(5);
//         console.log('Revenue for Landlord ID:', r.Revenue);

//     } catch (error) {
//       console.error("Error:", error);
//     }
//   })();
