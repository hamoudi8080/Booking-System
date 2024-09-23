import { expect } from 'chai';
import request from 'supertest';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import app from '../api/index.js';
import User from '../api/models/User.js'; // Adjust the path to your User model

describe('GET /profile', function() {
    const jwtSecret = 'fdafkdhnalkfhsjhkl4h1312d';
  let jwtVerifyStub;
  let userFindByIdStub;

  before(() => {
    // Stub jwt.verify
    jwtVerifyStub = sinon.stub(jwt, 'verify').callsFake((token, secret, options, callback) => {
      callback(null, { id: '12345' });
    });

    // Stub User.findById
    userFindByIdStub = sinon.stub(User, 'findById').resolves({
      name: 'Hamo',
      email: 'hamo@outlook.com',
      _id: '12345'
    });
  });

  after(() => {
    // Restore the original methods
    jwtVerifyStub.restore();
    userFindByIdStub.restore();
  });

  it('should return user profile with valid token', async () => {
    const token = jwt.sign({ id: '12345' }, jwtSecret); // Replace 'your_jwt_secret' with your actual secret

    const res = await request(app)
      .get('/profile')
      .set('Cookie', `token=${token}`)
      .expect(200);

    expect(res.body).to.deep.include({
      name: 'Hamo',
      email: 'hamo@outlook.com',
      _id: '12345'
    });
  });

  it('should return null if no token is provided', async () => {
    const res = await request(app)
      .get('/profile')
      .expect(200);

    expect(res.body).to.be.null;
  });
});