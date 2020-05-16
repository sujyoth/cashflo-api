const {expect} = require('chai');
const request = require('supertest');

const app = require('../app');

describe('Cashflo Microservice', () => {
  // Create dummy login data
  const loginDetails = {username: 'sujyoth', password: '135d211'};
  // Create token variable to save user token
  let token;
  // Set various variables to be used in the application
  const imageUrl = 'https://i.ibb.co/W2KDcny/home.png';
  const invalidImageUrl = 'https://i.ibb.co/W2KDcny/home';

  // Mock user authentication
  describe('Mock Authentication', () => {
    it('should not return token if username and password do not meet requirements', (done) => {
      request.agent(app)
          .post('/api/users/login')
          .send({username: 'aditya', password: ''})
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            done();
          });
    });

    it('should accept username and password and return a signed JWT', (done) => {
      request.agent(app)
          .post('/api/users/login')
          .send(loginDetails)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.authorized).to.equal(true);
            token = res.body.token;
            done();
          });
    });
  });

  describe('Thumbnail creation', () => {
    it('should accept an image url and return a resized image', (done) => {
      request.agent(app)
          .post('/api/create-thumbnail')
          .set('token', token)
          .send({imageUrl: imageUrl})
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body.converted).to.equal(true);
          });
      done();
    });

    it('should not resize image if the token is invalid', (done) => {
      request.agent(app)
          .post('/api/create-thumbnail')
          .set('token', 'wrongtoken')
          .send({imageUrl: imageUrl})
          .end((err, res) => {
            expect(res.statusCode).to.equal(401);
            expect(res.body.authorized).to.equal(false);
          });
      done();
    });

    it('should not resize image if the url is invalid', (done) => {
      request.agent(app)
          .post('/api/create-thumbnail')
          .set('token', token)
          .send({imageUrl: invalidImageUrl})
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
          });
      done();
    });
  });
});
