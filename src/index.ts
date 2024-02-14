import dotenv from "dotenv";
import * as process from "process";

dotenv.config();

console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV === 'production') {
  require('module-alias/register');
}

import App from '@/app';
import logger from '@/middlewares/logger';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { AuthRoute } from '@/routes/auth.route';
import { OrderRoute } from '@/routes/order.route';
import { ResponseRoute } from '@/routes/response.route';
import { UserRoute } from '@/routes/user.route';

const allowedOrigins = ['http://localhost:5173', 'http://164.92.195.79', 'http://192.168.100.2:5173'];

const app = new App({
  port: 8000,
  middlewares: [
    logger(),
    cookieParser(),
    cors({
      origin: function (origin, callback) {
        const isAllowed = !origin || allowedOrigins.includes(origin);
        callback(null, isAllowed);
      },
      credentials: true,
    })
  ],
  routes: [
    new AuthRoute(),
    new UserRoute(),
    new OrderRoute(),
    new ResponseRoute()
  ],
});

app.listen();
