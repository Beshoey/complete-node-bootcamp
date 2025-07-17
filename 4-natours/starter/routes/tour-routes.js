import express from 'express';
import {
    checkBody,
    checkUserId,
    createTour,
    deleteTour,
    getAllTours,
    getTour,
    updateTour,
} from '../controllers/index.js';

const tourRouter = express.Router();

tourRouter
.param('id', checkUserId); // Middleware to check user ID

tourRouter
.route('/')
  .get(getAllTours)
  .post(checkBody, createTour);

tourRouter
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);


export default tourRouter;
