const Employee = require("./employee")


class Intern extends Employee {
    constructor(name, id, email, title, role, school) {
        super(name, id, title, email, role)
        this.school = school; 
        }
        getRole() {
            return this.role
        }
        getSchool () {
            return this.school
            }
    
  }

  module.exports = Intern


  //needs getRole()