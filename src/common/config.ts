import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

export const PORT = process.env.PORT || "8080";
export const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://thirdmadman:passroot@localhost:27017';
export const NODE_ENV = process.env.NODE_ENV || 'production';
