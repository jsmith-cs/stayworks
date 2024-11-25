const PersonModel = require('./PersonModel'); 

class Person {
    constructor(personId, name, dateofBirth ,address, phoneNumber, email,role) {
      this.personId = personId;
      this.name = name;
      this.dateofBirth = dateofBirth;
      this.address = address;
      this.phoneNumber = phoneNumber;
      this.email = email;
      this.role = role;
    }
  
    // A method to display general person info
    getPersonInfo() {
      return `ID: ${this.personId}, Name: ${this.name}, DOB: ${this.dateofBirth} ,Address: ${this.address}, Phone: ${this.phoneNumber}, Email: ${this.email}, Role: ${this.role}`;
    }

    async save(){
      try {
        // If `personId` exists, this means you might want to update the entry
        if (this.personId) {
          // Find the person by ID and update
          const person = await PersonModel.findByPk(this.personId);
          //Role is fixed and cannot be changed once created.
          if (person) {
            person.name = this.name;
            person.dateofBirth = this.dateofBirth;
            person.address = this.address;
            person.phoneNumber = this.phoneNumber;
            person.email = this.email;
            await person.save();  // Save changes to the database
            console.log('Person updated:', person.toJSON());
          } else {
            throw new Error('Person not found for update.');
          }
        } else {
          this.create();
        }
      } catch (error) {
        console.error('Error saving person:', error);
      }
    }

    async create(){
      try {
        const person = await PersonModel.create({
          personId:this.personId,
          name: this.name,
          dateofBirth: this.dateofBirth,
          address: this.address,
          phoneNumber: this.phoneNumber,
          email: this.email,
          role: this.role
        });
        // this.personId = person.personId;  // Get the ID assigned by the DB
        console.log("Person saved:", person);
      } catch (error) {
        console.error("Error saving person:", error);
      }
  }

  }


  
  module.exports = Person;

