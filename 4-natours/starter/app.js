import express from 'express';
import morgan from 'morgan';
import tourRouter from './routes/tour-routes.js';
import userRouter from './routes/user-routes.js';

export const app = express();

// Development logging use morgan to log requests
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'));
}
// Body parser for reading data from body
app.use(express.json());

// Use Routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
