// tests/setup.ts
import mongoose from 'mongoose';

beforeAll(async () => {
  // Replace with your dedicated test database string to avoid wiping your dev data!
  const testDbUri = process.env.MONGO_URI_TEST || 'mongodb://127.0.0.1:27017/virtual_museum_test';
  await mongoose.connect(testDbUri);
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
  }
});