# GradeIan

## What is GradeIan?
**GradeIan** is an application for teachers to track grades. It is designed to use LAMP or WAMP as deployment structures which supports many hosting providers. The front end is written in TypeScript and takes advantage of Angular 2 for the majority of the logic. The back end is written in PHP and intended to be used with a MySQL database. The application has been designed to be responsive, and lightweight.

## How to install

### Front End
* Clone the Repository
* Install Node (if not already done)
* Open Node console
* Navigate to Project Directory
* run command `npm install`
* run command `npm start`

### Back End
* Clone the Repository
* Install PHP on platform of choice
* Host the BackEnd/Methods folder on the server
* Point the services in FrontEnd/src/app/config.ts to the location of your back end methods

### MySQL
This application utilizes MySQL and the model can be used to deploy the infrastructure to your instance. This includes stored procedures, triggers, and initial inserts into tables.

### Deployment
* Ensure `npm install` has been run
* run command `npm run deploy` which will run the gulp and ng build commands
* Move code from FrontEnd/build folder to your web server
```
If you get 404's while routing, ensure you have configured your web server to redirect back to the index page for Angular2 Routing to work.
```
