// tests/setup.js
import mongoose from 'mongoose';

beforeAll(async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/grand-cafe', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  
});
