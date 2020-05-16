const {expect} = require('chai');
const request = require('supertest');

const app = require('../app');

describe('Cashflo Microservice', () => {
  // Create dummy login data
  const loginDetails = {
    username: 'random_username',
    password: 'random_password',
  };
  // Create token variable to save user token
  let token;
  // Set various variables to be used in the application
  const imageUrl = 'https://i.ibb.co/W2KDcny/home.png';
  const invalidImageUrl = 'https://i.ibb.co/W2KDcny/home';

  // Mock user authentication
  describe('Mock Authentication', () => {
    it('should not return token if username and password are invalid',
        (done) => {
          request.agent(app)
              .post('/api/users/login')
              .send({username: 'random_username', password: ''})
              .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
              });
        });

    it('should accept username and password and return a token',
        (done) => {
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
    it('should accept an image url and return the generated thumbnail',
        (done) => {
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

    it('should not resize image if the token is invalid',
        (done) => {
          request.agent(app)
              .post('/api/create-thumbnail')
              .set('token', 'random_token')
              .send({imageUrl: imageUrl})
              .end((err, res) => {
                expect(res.statusCode).to.equal(401);
                expect(res.body.authorized).to.equal(false);
              });
          done();
        });

    it('should not resize image if the url is invalid',
        (done) => {
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
