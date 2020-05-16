# Stateless Microservice for Cashflo

A simple stateless microservice in Nodejs, with two major functionalities -

 * Authentication
 * Image Thumbnail Generation


## Setup

The API requires [Node.js](https://nodejs.org/en/download/)

To get up and running: 

**1.** Clone the repo.
```
git clone https://github.com/sujyoth/cashflo-api.git
```

**2.**  ```cd``` into repo. Use the same directory name(below) if you do not change it.
```
cd cashflo-api
```

**3.**  Setup the application by installing its dependencies with
```
npm install
```

**4.**  The app gets up and running on port 3000 with ```npm start```.

**5.**  **Important** Create a ```.env``` file and set ```jwtSecret``` to any secret phrase you want.
 

## Logging

All logs are saved in ```cashflo.log``` in the application's root.


## Built With

 * [Node.js](https://nodejs.org)
 * [Express](https://expressjs.com/)
 * [Mocha](https://mochajs.org/) - For testing


## Known Issues

 1. Testing has not been completely implemented
