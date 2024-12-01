const ExpensesModel = require('./ExpensesModel'); // Assuming landlords are persons
const sequelize = require('./db');
const { QueryTypes } = require("sequelize");

class Expenses{
  constructor() {
  }

  /**
   * Create a new expense
   * @param {Object} expenseData - Data for the new expense
   * @returns {Object} - The created expense
   */
  static async createExpense(expenseData) {
    try {
      const expense = await ExpensesModel.create(expenseData);
      return expense;
    } catch (error) {
      throw new Error(`Error creating expense: ${error.message}`);
    }
  }

  /**
   * Retrieve all expenses, optionally filtered by propertyId
   * @param {Object} filters - Filters (e.g., propertyId)
   * @returns {Array} - List of expenses
   */
  static async getAllExpenses(filters = {}) {
    try {
      const whereClause = {};

      if (filters.propertyId) {
        whereClause.propertyId = filters.propertyId;
      }

      if (filters.startDate && filters.endDate) {
        whereClause.expenseDate = {
          [Op.between]: [filters.startDate, filters.endDate],
        };
      }

      const expenses = await ExpensesModel.findAll({ where: whereClause,raw:true });
      return expenses;
    } catch (error) {
      throw new Error(`Error retrieving expenses: ${error.message}`);
    }
  }

  /**
   * Retrieve a single expense by ID
   * @param {Number} expenseId - ID of the expense
   * @returns {Object|null} - The expense or null if not found
   */
  static async getExpenseById(expenseId) {
    try {
      const expense = await ExpensesModel.findByPk(expenseId);
      return expense.dataValues;
    } catch (error) {
      throw new Error(`Error retrieving expense: ${error.message}`);
    }
  }

  /**
   * Update an expense
   * @param {Number} expenseId - ID of the expense to update
   * @param {Object} updateData - Fields to update
   * @returns {Object|null} - The updated expense or null if not found
   */
  static async updateExpense(expenseId, updateData) {
    try {
      const expense = await ExpensesModel.findByPk(expenseId);
      if (!expense) {
        return null; // Expense not found
      }

      const updatedExpense = await expense.update(updateData);
      return updatedExpense;
    } catch (error) {
      throw new Error(`Error updating expense: ${error.message}`);
    }
  }

  /**
   * Delete an expense
   * @param {Number} expenseId - ID of the expense to delete
   * @returns {Boolean} - True if deleted, false if not found
   */
  static async deleteExpense(expenseId) {
    try {
      const deletedCount = await ExpensesModel.destroy({
        where: { expenseId },
      });

      return deletedCount > 0; // True if at least one record was deleted
    } catch (error) {
      throw new Error(`Error deleting expense: ${error.message}`);
    }
  }

  static async getExpenseByLandlordId(landLordId) {
    try {
      const expenses = await sequelize.query('SELECT *,CONCAT(CONVERT(MONTH(expenseDate),CHAR),"-",CONVERT(YEAR(expenseDate),CHAR)) as `MonthYear` FROM `Expenses` inner join `RentalProperty` on `Expenses`.propertyId = `RentalProperty`.propertyId where landLordId = ? and isRecurring = 0;',{replacements: [landLordId],type:QueryTypes.SELECT})

      if (expenses.length === 0) {
        console.log("No Expenses found for this landlord.");
      }
      return expenses;
    } catch (error) {
      console.error("Error fetching properties for landlord:", error);
      throw error;
    }
  }

  static async get12MonthExpense(landLordId) {
    try {
        
        let q = 'SELECT * FROM STAYWORKSTestEnv.monthlyExpensesByLandlordId where landlordId = ? ;';
      const expenses = await sequelize.query(q,{replacements: [landLordId],type:QueryTypes.SELECT})

      if (expenses.length === 0) {
        console.log("No Expenses found for this landlord.");
      }
      return expenses;
    } catch (error) {
      console.error("Error fetching properties for landlord:", error);
      throw error;
    }
  }

  static async getThisMonthExpense(landLordId) {
    try {
        
        let q = 'SELECT * FROM STAYWORKSTestEnv.monthlyExpensesByLandlordId where landlordId = ? and EOM = LAST_DAY(NOW());';
      const expenses = await sequelize.query(q,{replacements: [landLordId],type:QueryTypes.SELECT})

      if (expenses.length === 0) {
        console.log("No Expenses found for this landlord.");
      }
      return expenses;
    } catch (error) {
      console.error("Error fetching properties for landlord:", error);
      throw error;
    }
  }
}

module.exports = Expenses;

  // (async () => {
  //   try {

  //       // const newExpense = await Expenses.createExpense({
  //       //     propertyId: 1,
  //       //     expenseDate: '2024-11-28',
  //       //     category: 'Utilities',
  //       //     amount: 150.75,
  //       //     description: 'Electricity bill',
  //       //     isRecurring: false,
  //       //   });
  //       //   console.log('Created Expense:', newExpense);

  //       // const propertyExpenses = await Expenses.getAllExpenses({propertyId : 1});
  //       // console.log('Expenses for Property ID 1:', propertyExpenses);

  //       // const propertyExpenses1 = await Expenses.getExpenseByLandlordId(1);
  //       // console.log('Expenses for Property ID 1:', propertyExpenses1);


  //       // const propertyExpenses1 = await Expenses.get12MonthExpense(5);
  //       // console.log('Expenses for Property ID 1:', propertyExpenses1);

  //       // const propertyExpenses2 = await Expenses.getThisMonthExpense(5);
  //       // console.log('Expenses for Property ID 1:', propertyExpenses2[0].MonthExpense);

  //        // READ a single expense by ID
  //       // const expense = await Expenses.getExpenseById(1);
  //       // console.log('Retrieved Expense:', expense);
     
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // })();
