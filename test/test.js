const {expect} = require('chai');
const request = require('supertest');

const app = require('../app');

describe('Cashflo Microservice', () => {
  // Create dummy login data.
  const loginDetails = {
    username: 'random_username',
    password: 'random_password',
  };

  // Create token variable to save generated token.
  let token;

  // Create one valid and invalid image URL each.
  const imageUrl = 'https://i.ibb.co/W2KDcny/home.png';
  const invalidImageUrl = 'https://i.ibb.co/W2KDcny/home';

  describe('Mock Authentication', () => {
    it('should not return a token if username is missing',
        (done) => {
          request.agent(app)
              .post('/api/users/login')
              .send({password: 'random_password'})
              .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
              });
        });

    it('should not return a token if password is missing',
        (done) => {
          request.agent(app)
              .post('/api/users/login')
              .send({username: 'random_username'})
              .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
              });
        });

    it('should not return a token if username and password are missing',
        (done) => {
          request.agent(app)
              .post('/api/users/login')
              .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
              });
        });

    it('should not return a token if username and password are invalid',
        (done) => {
          request.agent(app)
              .post('/api/users/login')
              .send({username: 'as', password: 'sa'})
              .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
              });
        });

    it('should return a token if username and password are valid',
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

  describe('Thumbnail generation', () => {
    it('should not resize image if the token is invalid',
        (done) => {
          request.agent(app)
              .post('/api/generate-thumbnail')
              .set('token', 'random_token')
              .send({imageUrl: imageUrl})
              .end((err, res) => {
                expect(res.statusCode).to.equal(401);
                expect(res.body.authorized).to.equal(false);
                done();
              });
        });

    it('should not resize image if the URL is invalid',
        (done) => {
          request.agent(app)
              .post('/api/generate-thumbnail')
              .set('token', token)
              .send({imageUrl: invalidImageUrl})
              .end((err, res) => {
                expect(res.statusCode).to.equal(400);
                done();
              });
        });

    it('should not resize image if the token and URL are invalid',
        (done) => {
          request.agent(app)
              .post('/api/generate-thumbnail')
              .set('token', 'random_token')
              .send({imageUrl: invalidImageUrl})
              .end((err, res) => {
                expect(res.statusCode).to.equal(401);
                expect(res.body.authorized).to.equal(false);
                done();
              });
        });

    it('should return the generated thumbnail if the URL and token are valid',
        (done) => {
          request.agent(app)
              .post('/api/generate-thumbnail')
              .set('token', token)
              .send({imageUrl: imageUrl})
              .end((err, res) => {
                expect(res.statusCode).to.equal(200);
                expect(res.body.converted).to.equal(true);
                done();
              });
        });
  });
});
