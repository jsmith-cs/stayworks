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
const ChartingData = require("./backend_models/ChartingData");
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
app.get('/getPropertyByPropertyId/:propertyId', (req, res) => {
  (async () => {
    try {
      
      a = await RentalProperty.getPropertyByPropertyId(req.params.propertyId);
      res.json(a);
      // console.log(req.params.name);
    } catch (error) {
      console.error("Error:", error);
    }
  })();
 
});

//Expenses

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


app.get('/getExpenses/:landlordId',(req,res) =>{

  (async () => {
      try {
  
          const landlordExpenses = await Expenses.getExpenseByLandlordId(req.params.landlordId);
          console.log('Expenses for landlord:', landlordExpenses);
          res.json(landlordExpenses);
      } catch (error) {
        console.error("Error:", error);
      }
    })();
  })


  app.get('/deleteExpense/:expenseId',(req,res) =>{

    (async () => {
        try {
    
            const expense = await Expenses.deleteExpense(req.params.expenseId);
            console.log('Deleted Expense', expense);
            res.json(expense);
        } catch (error) {
          console.error("Error:", error);
        }
      })();
    })
  



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

      const propertyExpenses2 = await Expenses.getThisMonthExpense(req.params.landlordId);
      console.log('Expenses for Property ID 1:', propertyExpenses2[0].MonthExpense);
      eExpense = propertyExpenses2[0].MonthExpense;

      const r = await Revenue.getThisMonthRevenue(req.params.landlordId);
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

app.get('/chartingData/:landlordId',(req,res) =>{

(async () => {
    try {

        const r = await ChartingData.overview(5);
        console.log('Overview Data:', r);
        res.json(r);
    } catch (error) {
      console.error("Error:", error);
    }
  })();
})



app.get('/overview/:landlordId',(req,res) =>{

  (async () => {
    try {
      
      properties = await RentalProperty.getPropertiesByLandlord(req.params.landlordId);
      Tenants = await Tenant.getAllTenants(req.params.landlordId);
      console.log(Tenants);
      eRevenue = "0.00";
      eExpense = "0.50";

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

// app.get('/getTenants/:propertyId',(req,res) =>{

//   (async () => {
//     try {
//       tenantsByPropertyId = await Tenant.getTenantByPropertyId(req.params.propertyId);
//       res.json(tenantsByPropertyId);
//       // console.log(req.params.name);
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   })();

// })

  app.use(cors( {exposedHeaders: ['Content-Disposition']})); // Enable CORS
  app.use(bodyParser.json());
  
  
  
  
  app.get('/getProperty/:pId', (req, res) => {
  
    (async () => {
      try {
  
        a = await RentalProperty.getPropertiesByLandlord(req.params.pId);
        res.json(a);
        // console.log(req.params.name);
      } catch (error) {
        console.error("Error:", error);
      }
    })();
   
  });
  
  app.get('/getPropertyByPropertyId/:propertyId', (req, res) => {
  
    (async () => {
      try {
        
        a = await RentalProperty.getPropertyByPropertyId(req.params.propertyId);
        res.json(a);
        // console.log(req.params.name);
      } catch (error) {
        console.error("Error:", error);
      }
    })();
   
  });
  
  app.get('/getProperty/:province', (req, res) => {
  
    (async () => {
      try {
        a = await RentalProperty.getPropertyByProvince(req.params.Province);
        res.json(a);
      } catch (error) {
        console.error("Error:", error);
      }
    })();
   
  });
  
  app.post('/newProperty', upload.none(),(req, res) =>{
  
    (async () => {
      try {
        //   Create a new rental property for a landlord
  
        const newProperty = new RentalProperty(req.body.address,req.body.city,req.body.province,req.body.country,
          req.body.landLordId);
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
  
 
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });