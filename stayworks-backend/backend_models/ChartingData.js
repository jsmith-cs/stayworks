const sequelize = require('./db');
const { QueryTypes } = require("sequelize");


class ChartingData {
    

    static async overview(landLordId) {
        try {
            const q = 'SELECT * FROM STAYWORKSTestEnv.chartingData where cLandlordid = ?;'
            const revenue = await sequelize.query(q,{replacements: [landLordId],type:QueryTypes.SELECT})
          if (revenue.length === 0) {
            console.log("No Revenue found for this property.");
          } else {
            console.log(`Revenue found`);
            return revenue;
          }
          
        } catch (error) {
          console.error("Error fetching Revenue for landlord:", error);
          throw error;
        }
      }

}


module.exports = ChartingData;

// (async () => {
//     try {

//         const r = await ChartingData.overview(5);
//         console.log('Overview Data:', r);
//         const output = r.map(e => e.cEOM);
//         console.log(output);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   })();
