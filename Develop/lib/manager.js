const Employee = require("./employee")
// const inquire = require("inquirer")
// let http = require('http');
// const fs = require('fs');

class Manager extends Employee {
    constructor(name, id, title, email, role, officeNumber) {
        super(name, id, title, email, role)
        this.officeNumber = officeNumber;
    }
    getRole() {
        this.role = "Manager"
        return this.role 
    }
    getOfficeNumber() {
        return this.officeNumber
    }
}

 module.exports = Manager
