const {expect} = require('chai');
const request = require('supertest');

const app = require('../index');

describe('Cashflo Microservice', () => {
  // Create dummy login data
  const loginDetails = {username: 'someone', password: 'awesome'};
  // Create token variable to save user token
  let token;
  // Set various variables to be used in the application
  const imageUrl = 'https://i.ibb.co/W2KDcny/home.png';
  const invalidImageUrl = 'https://i.ibb.co/W2KDcny/home';

  // Mock user authentication
  describe('Mock Authentication', () => {
    it('should not log user in if username and password do not meet requirements', (done) => {
      request.agent(app)
          .post('/api/users/login')
          .send({username: 'someone', password: ''})
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            done();
          });
    });

    it('should accept a username/password and return a signed JWT', (done) => {
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
    it('should accept a public image url and return a resized image', (done) => {
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

    it('should not process image if token is invalid', (done) => {
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

    it('should not process image if url is invalid', (done) => {
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