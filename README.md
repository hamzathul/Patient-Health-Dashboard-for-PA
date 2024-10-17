
# Patient Health Dashboard

A full-stack web application to manage and monitor patient health information, including prior authorization status. 
<br>
<div align='center'>
 <a href="https://patient-health-dashboard-for-pa.onrender.com/">View Demo</a><br><br>
  <a href="https://documenter.getpostman.com/view/38186080/2sAXxV7VrV">API Documentation - Authentication</a><br><br>
  <a href="https://documenter.getpostman.com/view/38186080/2sAXxV7VrX">API Documentation - Patient</a>
</div>
<br>

## Features

- Search for patients by name.
- View patient details such as name, age, medical history, condition, and treatment plan.
- View the authorization status for patient treatments.
- Individual patient detail view with options for updating and managing records.




## Installation

1.Clone this Repository

```bash
  git clone https://github.com/hamzathul/Patient-Health-Dashboard-for-PA.git
```
2.Navigate to the project folder:
```bash
  cd Patient-Health-Dashboard-for-PA
```
To run this project, you will need to add the following environment variables to your .env file in the project directory

`PORT = 5000`

`MONGO_URI = <your-mongodb-uri>`

`JWT_SECRET = <your-jwt-secret>`

`NODE_ENV = development`


3.Install dependencies for the backend and run backend server:
```bash
  npm install
  npm run dev
```
The backend will run on http://localhost:5000.

4.Install dependencies for the frontend and run frontend server:
```bash
  cd frontend
```
```bash
  npm install
  npm run dev
```
The frontend will run on http://localhost:5173.

Now you can open your browser and go to http://localhost:5173 to view the application.
