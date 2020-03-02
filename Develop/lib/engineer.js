const Employee = require("./employee")
const inquire = require("inquirer")
let http = require('http');
const fs = require('fs');

class Engineer extends Employee {
        constructor(name, id, title, email, role, gitName) {
            super(name, id, title, email, role)
            this.gitName = gitName;
        }
        getGithub() {
            return this.gitName
        }
        getRole() {
            this.role = "Engineer"
            return this.role 
        }
    }
    
     module.exports = Engineer


     //could be return Engineer
    
 
