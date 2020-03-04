const inquirer = require("inquirer")
const Employee = require("./lib/employee")
const Intern = require("./lib/intern")
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager")
const fs = require('fs');
const util = require("util");
const jest = require("jest")

const render = require('./lib/htmlRenderer')

var employees = [];
var listManager
var listIntern
var listEngineer

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
  return inquirer.prompt([{
        type: "list",
        name: "role",
        message: "What type of team member are you?",
        choices: ["manager","engineer", "intern"]
      },
    {
      type: "input",
      message: "What is your name?",
      name: "name"
    },
    {
      type: "input",
      message: "What is your id?",
      name: "id"
    },
    {
      type: "input",
      message: "What is your title?",
      name: "title"
    },
    {
      type: "input",
      message: "What is your email?",
      name: "email"
    },
    {
      when: function (answers) {
        return answers.role === "manager"
      },
      default: "What is your office number?",
      name: "officeNumber"
    },
    {
      when: function (answers) {
        return answers.role === "engineer"
      },
      default: "What is your GitHub user name",
      name: "gitName"
    },
    {
      when: function (answers) {
        return answers.role === "intern"
      },
      default: "What school did you go to?",
      name: "internSchool"
    }
  ]);

  }

function generateHTML(answers) {
  if(answers.role === 'manager') {

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
      <title>Manager</title>
    </head>
  
    <body>
    <div class="container">
    <div class="card" style="width: 18rem;" style= "background-color:#F5F5F5;"/>
    <img src="" class="card-img-top-primary">
    <div class="card-body" style = "text-align: center; background-color:#F5F5F5">
      <h3><span class="badge badge-primary display-4">Hi! My name is: </span><br>${answers.name}</h3>
        <p class="lead">id: ${answers.id} </p>
        <h3><span class="badge badge-danger">${answers.role}</span></h3>
        <ul class="list-group">
        <li class="list-group-item">email: ${answers.email}</li>
        <li class="lead list-group-item"><span class="badge badge-secondary">${answers.title}</span></li>
        <li class="list-group-item">Office number: ${answers.officeNumber}</li
        </ul>
      </div>
    </div>
    </body>
    </html>`
  
}
else if(answers.role === 'intern') {
  return `
  <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
        <title>Intern</title>
      </head>
    
      <body>
      <div class="container">
      <div class="card" style="width: 18rem;" style= "background-color:#F5F5F5;"/>
      <img src="" class="card-img-top light">
      <div class="card-body" style = "text-align: center;background-color:#F5F5F5">
        <h3><span class="badge badge-primary display-4">Hi! My name is: </span><br>${answers.name}</h3>
        
          <p class="lead">id: ${answers.id} </p>
          <h3><span class="badge badge-info">${answers.role}</span></h3>
          <ul class="list-group">
          <li class="list-group-item">email: ${answers.email}</li>
          <li class="lead list-group-item"><span class="badge badge-secondary">${answers.title}</span></li>
          <li class="list-group-item">School: ${answers.internSchool}</li>
          </ul>
        </div>
      </div>
      </body>
      </html>`
}
else if(answers.role === 'engineer') {
  return `
  <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
        <title>Engineer</title>
      </head>
    
      <body>
      <div class="container">
      <div class="card" style="width: 18rem;" style= "background-color: #F5F5F5;"/>
      <img src="" class="card-img-top light">
      <div class="card-body" style = "text-align: center;background-color:#F5F5F5">
        <h3><span class="badge badge-primary display-4">Hi! My name is: </span><br>${answers.name}</h3>
        
          <p class="lead">id: ${answers.id} </p>
          <h3><span class="badge badge-warning">${answers.role}</span></h3>
          <ul class="list-group">
          <li class="list-group-item">email: ${answers.email}</li>
          <li class="lead list-group-item"><span class="badge badge-secondary">${answers.title}</span></li>
          <li class="lead list-group-item">GitHub: ${answers.gitName}</span></li>
          </ul>
        </div>
      </div>
      </body>
      </html>`
}
}

promptUser()
  .then(function (answers) {
    const html = generateHTML(answers);
    if (answers.role === "manager") {
      listManager = new Manager(answers.name, answers.id, answers.title, answers.email, answers.role, answers.officeNumber)
      console.log(listManager.getName())
      employees.push(listManager);
      return writeFileAsync("./templates/manager.html", html)
    } else if (answers.role === "intern") {
      listIntern = new Intern(answers.name, answers.id, answers.title, answers.email, answers.role, answers.internSchool)
      employees.push(listIntern);
      return writeFileAsync("./templates/intern.html", html)
    } else if (answers.role === "engineer") {
      listEngineer = new Engineer(answers.name, answers.id, answers.title, answers.email, answers.role, answers.gitName)
      employees.push(listEngineer);
      return writeFileAsync("./templates/engineer.html", html)
    } //else {
     // writeFileAsync("main.html", html)
   // }
    return employees
  })
  .then(function () {
    console.log("Successfully wrote to html file");
  }).then(function () {
    console.log(employees)
  }).catch(function (err) {
    console.log(err);
  })
render;


module.exports = promptUser;