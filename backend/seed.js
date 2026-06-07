require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const connectDB = require('./config/db');

const seedData = async () => {
  try {
    await connectDB();

    await User.deleteMany(); // Warning: Clears all users

    const users = [
      {
        name: 'Admin User',
        email: 'admin@agridata.com',
        password: 'admin123',
        role: 'admin',
      },
      {
        name: 'Vendor User',
        email: 'vendor@agridata.com',
        password: 'vendor123',
        role: 'vendor',
      },
    ];

    await User.create(users);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

seedData();
