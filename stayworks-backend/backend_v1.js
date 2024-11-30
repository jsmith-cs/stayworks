const multer = require("multer");
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require("path");
const express = require("express");
const Documents = require('./backend_models/Documents');
const RentalProperty = require('./backend_models/RentalProperty');
const Tenant = require("./backend_models/Tenant");
const Expenses = require("./backend_models/Expenses");
const Revenue = require("./backend_models/Revenue");
const exp = require("constants");
const app = express();

const port = 3000;
app.use(cors( {exposedHeaders: ['Content-Disposition']})); // Enable CORS
app.use(bodyParser.json());


// Configure file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });



app.get('/getProperties/:landlordID', (req, res) => {

  (async () => {
    try {
      
      a = await RentalProperty.getPropertiesByLandlord(req.params.landlordID);
      res.json(a);
      // console.log(req.params.name);
    } catch (error) {
      console.error("Error:", error);
    }
  })();
 
});

app.post('/newProperty', upload.none(),(req, res) =>{

  // console.log(req.body.postalCode);
  (async () => {
    try {
      //   Create a new rental property for a landlord

      const newProperty = new RentalProperty(req.body.address,req.body.city,req.body.province,req.body.country,
        req.body.postalCode,req.body.landLordId);
      const np = await newProperty.create();
      console.log(np)
      res.json(np);
    } catch (error) {
      console.error("Error:", error);
    }
  })();
  
});




app.post('/upload',  upload.single("file"),(req, res) => {

    (async () => {
      try {
        // console.log(req);
        // a = await RentalProperty.getPropertiesByLandlord2(req.params.landlordID);
        res.json({a:1});
        console.log(req.file.filename);
        console.log(req.file.originalname);
        console.log(req.body.propertyId);
        console.log(req.body.fileType);

        doctype = req.body.fileType;
        fName = req.file.originalname;
        propertyId= req.body.propertyId;
        fLoc = path.join(__dirname,`uploads/${req.file.filename}`);

        const a1 = new Documents(doctype,fName,propertyId,fLoc);
        a1.create();
      } catch (error) {
        console.error("Error:", error);
      }
    })();
   
  });


app.get('/file/:docId', (req, res) => {

  (async () => {
    try {
      const filepath = await Documents.getDoc(req.params.docId);
      res.sendFile(filepath, (err) => {
        console.log(filepath);
          if (err) {
              console.error("File not found", err);
              res.status(404).send("File not found");
          }
      });
       
    } catch (error) {
      console.error("Error:", error);
    }
  })();

  
  });

app.get('/listFiles/:propertyId',(req,res) =>{

  // console.log(1);
  (async () => {
    try {
        const fList= await Documents.getDocsByPropertyId(req.params.propertyId);
        console.log(fList);
        res.json(fList[0]);
    } catch (error) {
      console.error("Error:", error);
    }
  })();
})

app.get('/getProperty/:pId',(req,res) =>{
  (async () => {
    try {
      
      property = await RentalProperty.getProperty(req.params.pId);

      res.json(property);
      // console.log(req.params.name);
    } catch (error) {
      console.error("Error:", error);
    }
  })();

})

app.post('/newExpense', upload.none(),(req, res) =>{


  const {
    propertyId,expenseDate, category, amount,description, isRecurring,recurrFrequency,recurrStartDate,recurrEndDate
  } = req.body;

  // console.log(req.body.postalCode);
  (async () => {
    try {
      const newExpense = await Expenses.createExpense({
            propertyId: propertyId,
            expenseDate: expenseDate,
            category: category,
            amount: amount,
            description: description,
            isRecurring: isRecurring,
            recurrFrequency:recurrFrequency,
            recurrStartDate:recurrStartDate,
            recurrEndDate:recurrEndDate
          });
          console.log('Created Expense:', newExpense);
          res.json(newExpense);
    } catch (error) {
      console.error("Error:", error);
    }
  })();
  
});



app.get('/overview/:landlordId',(req,res) =>{

  (async () => {
    try {
      
      properties = await RentalProperty.getPropertiesByLandlord(req.params.landlordId);
      Tenants = await Tenant.getAllTenants(req.params.landlordId);
      console.log(Tenants);

      eExpense = "0.00";
      eRevenue = "0.00";

      const propertyExpenses2 = await Expenses.getThisMonthExpense(5);
      console.log('Expenses for Property ID 1:', propertyExpenses2[0].MonthExpense);
      eExpense = propertyExpenses2[0].MonthExpense;

      const r = await Revenue.getThisMonthRevenue(5);
      console.log('Revenue for Landlord ID:', r);
      eRevenue = r.Revenue;

      res.json({"properties" : properties.length,
                "tenants" : Tenants.length,
                "revenue": eRevenue,
                "expense": eExpense
      });
      // console.log(req.params.name);
    } catch (error) {
      console.error("Error:", error);
    }
  })();
})


app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });