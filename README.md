# cafe-employee-manager

## Summary
This project is done for as a coding assignment to showcase both frontend and backend systems. Specific requirements were given, justifications will be provided for some of the choices made in this project. This project is built on the following stack:
- ReactJS
- Python3 (Flask Server)
- MySQL

## Setup
To run this project, the following assumptions have been made, should the assumption be unfulfilled, the link is provided:
- [ReactJS] Node (>= 14.0.0), npm (>=5.6), ReactJS installed and running 
  - Node & npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
- [Python3] Python3 with virutal environment installed and running 
  - Python3: https://realpython.com/installing-python/
  - Virtualenv: https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/
- [MySQL] MySQL installed and running, read and write access granted
  - MySQL: https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/

### Cloning the project
To start off, clone this project into the desired directory, you could also download it as a zip file and extract the contents.

### Set up database
First, log in to MySQL and create a database called `cafeEmployeeManager`, this will be needed to create the necessary tables and insert seeded data. 
```
// command to use with specific username and password
mysql -u <username> -p <password>

>> create database cafeEmployeeManager;

// for simplicity you may use root since it has admin rights. proceed with caution, you may end up breaking stuff elsewhere if you are unsure of what you are doing
mysql -u root -p <password>

>> create database cafeEmployeeManager;
```
Next, create the tables and seed the data into the database. For simplicity, the commands and the seed data are given in the same file.
```
mysql -u <username> -p <password> cafeEmployeeManager < db.sql
// OR
mysql -u root -p <password> cafeEmployeeManager < db.sql
```
The tables have been created, and there is data in the database for the project!

### Set up Flask Server
We first create the virtual environment to store all the packages, so as to not mess up other installed libraries. Then, we install all the necessary libraries based on `requirements.txt`
```
// create the virtual environment

// UNIX/macOS
python -m venv venv
// Windows
py -m venv venv

// activate the virtual environment

// UNIX/macOS
source venv/bin/activate
// Windows
.\env\Scripts\activate

// install the libraries
python -m pip install -r requirements.txt
```
Now that we have the libraries and dependencies installed, we can go ahead and run the Flask server. If you encounter errors, you may check below for some solutions that may be applicable to you
```
python flask_server.py
```
If successful, you should see something like this
```
 * Serving Flask app 'flask_server'
 * Debug mode: off
WARNING: This is a development server. Do not use it in a production deployment. Use a production WSGI server instead.
 * Running on http://127.0.0.1:5000
Press CTRL+C to quit
```

### Set up ReactJS app
With Node and npm installed, we can go ahead and install the dependencies for the app.
```
cd cafe-employee-manager
npm i
```
Then, we can just run the app, and the app should have created a browser window or tab. Should it not appear, proceed to http://localhost:3000/ (Note: the port for your page, might be different, check your console to ensure that you are on the right port)
```
npm start
```
You should see something like this on your console
```
Compiled successfully!

You can now view cafe-employee-manager in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://10.0.0.23:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
```

Congrats! You are running the app successfully now with the backend linked. Feel free to create more cafes and employees. 

## Installation Errors



## Justifications

### Inserting of CafeID and EmployeeID instead of having them inserted dynamically
The insertion of the IDs could have been generated automatically through the use of a `DELIMITER`. However, that is limited to the same connection. It is not resilient towards multiple connections or should the connection reset. Therefore, for scalability, this option is not the best. Should you want it to auto increment, you can use the following code and place it under both `CREATE TABLE`
```
CREATE TABLE ... (
    // some code
);

DELIMITER $$
CREATE TRIGGER tg_employee_insert
BEFORE INSERT ON employee_data
FOR EACH ROW
BEGIN
  DECLARE max_id int;
  SELECT MAX(COALESCE(MAX(sn), 0)) INTO max_id FROM employee_data ;
  SET NEW.id = CONCAT('UI', LPAD(max_id+1, 9, '0'));
END$$
DELIMITER;
```

### Separation of methods in Flask (e.g. `PUT`, `POST`, `DELETE`)
These methods could have been merged into one function since they use the same endpoint, but for clarity of the code, they are separated into individual functions.

### Form Validation
If you inspect the codes, you will realise that all the validation of the forms are done, and only done on client side (i.e. frontend). Reason being it is much faster and it prevents redundant API calls. That being said, it is a reasonable assumption that once validated, whatever that is sent to the API should be able to be inserted into database with no issues. Should there be a concern, server side validation can be implemented as a safety and to post a callback on to verify the status.

### Placeholders in SQL queries
This is a safety feature of the library `mysql-connector-python` to prevent malicious attempts such as SQL injections. 