// const inquire = require("inquirer")
// let http = require('http');
// const fs = require('fs');


class Employee {
  constructor(name, id, title, email, role) {
      this.name = name; 
      this.id = id; 
      this.title = title;
      this.email = email; 
      this.role = role; 
  }
      getName() {
      console.log(this.name) 
      }
      getId() {
         console.log(this.id) 
      }
      getTitle() {
          console.log(this.title)
      }
      getEmail() {
          console.log(this.email); 
      }
      getRole() {
         console.log(this.role); 
      }
  }
  
module.exports = Employee
