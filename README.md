# Stateless Microservice for Cashflo

A stateless microservice in Node, with two major functionalities:

 * Authentication
 * Image Thumbnail Generation


## Setup

**1.** Clone the repo.
```
git clone https://github.com/sujyoth/cashflo-api.git
```

**2.**  ```cd``` into the repo.
```
cd cashflo-api
```

**3.**  Setup the application by installing its dependencies with
```
npm install
```

**4.**  The app gets up and running on port 3000 with 
```
npm start
```

The secret key used for token signing and verification has also been commited to the repo for convenience.

## Testing the API routes.

The API routes can be tested using [Postman](https://www.getpostman.com/).

### Authentication
This is a mock authentication, so any username or password can be used to login.
 1. Set the request to **POST** and the url to _/api/users/login_. 
 2. In the **Body** for the Postman request, select **x-www-form-urlencoded**.
 3. You will be setting 2 keys (for username and password). Set the ```username``` key to any name (minimum of 3 characters). Set ```password``` to any password (minimum of 6 characters).
 4. Hit ```Send```. You will get a response in the below format:
 ```
 {
    "user": "sujyoth",
    "authorized": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNpd3FzcWQiLCJpYXQiOjE1ODk2MjcwMDcsImV4cCI6MTU4OTY0ODYwN30.LfBvkPrlOhU4y5ScsfnIxsNN9Jk2guIrU23jYPJtokg"
}
 ```
 

 ### Image Thumbnail Generation
This request contains a public image URL. It downloads the image, resizes to 50x50 pixels, and returns the resulting thumbnail.
 1. Set the request to **POST** and the url to _/api/generate-thumbnail_.
 2. Set the key ```imageUrl``` to a public image url.
 3. Since this is a secure route, for testing, you will have to set the token in the ```Header```. Set key as ```token``` and value as token you received from **Authentication**.
 4. Hit ```Send```. The image will be downloaded and converted to a thumbnail of size 50x50 pixels with the following response:
 ```
 {
    "converted": true,
    "user": "sujyoth",
    "success": "Image has been resized",
    "thumbnail": "./images/resized/output.png"
}
```


## Unit Testing

Unit tests have been made using mocha, chai and supertest.

Run ```npm test``` from the application's root directory for testing.

## Built With

 * [Node.js](https://nodejs.org)
 * [Express](https://expressjs.com/)
 * [Mocha](https://mochajs.org/)
