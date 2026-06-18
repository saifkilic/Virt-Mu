// src/tests/museum.test.ts
import { describe, it, before, after } from 'node:test';
import assert from 'node:assert/strict';
import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app.js';
import jwt from 'jsonwebtoken';

const testToken = jwt.sign(
  { id: 'testUserId', role: 'admin' },
  process.env.JWT_SECRET || 'super_secret_virtual_museum_jwt_key_2026'
);

describe('Museum API Endpoints', () => {
  let museumId: string;

  before(async () => {
    const testDbUri = process.env.MONGO_URI_TEST || process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!testDbUri) {
      throw new Error('Database connection failed: No MongoDB URI found in environment variables.');
    }
    await mongoose.connect(testDbUri);
    
    // Clear out any old test records left over from previous runs
    try {
      await mongoose.connection.collection('museums').deleteMany({});
    } catch {
      // Collection might not exist yet; safe to ignore
    }
  });

  after(async () => {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.dropDatabase();
      await mongoose.connection.close();
    }
  });

  it('should create a museum (protected)', async () => {
    const res = await request(app)
      .post('/api/museums')
      .set('Authorization', `Bearer ${testToken}`)
      .send({ 
        code: 'lahore', // Must match your schema's strict enum
        name: {
          en: 'Lahore Museum Test Instance',
          ur: 'لاہور عجائب گھر'
        },
        slug: 'lahore-museum-test'
      });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.ok(res.body.data._id);
    museumId = res.body.data._id;
  });

  it('should list museums (public)', async () => {
    const res = await request(app).get('/api/museums');
    
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(Array.isArray(res.body.data), true);
  });

  it('should fetch a single museum by ID', async () => {
    const res = await request(app).get(`/api/museums/${museumId}`);
    
    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data._id, museumId);
  });

  it('should update a museum (protected)', async () => {
    const res = await request(app)
      .put(`/api/museums/${museumId}`)
      .set('Authorization', `Bearer ${testToken}`)
      .send({ 'location.city': 'Lahore' });

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
    assert.equal(res.body.data.location.city, 'Lahore');
  });

  it('should delete a museum (protected)', async () => {
    const res = await request(app)
      .delete(`/api/museums/${museumId}`)
      .set('Authorization', `Bearer ${testToken}`);

    assert.equal(res.status, 200);
    assert.equal(res.body.success, true);
  });
});