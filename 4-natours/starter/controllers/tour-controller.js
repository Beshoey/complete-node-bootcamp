import fs from 'node:fs';
import { resolve } from 'node:path';

const __filename = import.meta.filename;
const __dirname = import.meta.dirname;

const absolutePath = resolve(
  __dirname,
  '../',
  'dev-data',
  'data',
  'tours-simple.json'
);

// Global variables
export const tours = JSON.parse(fs.readFileSync(`${absolutePath}`));

// Helper functions
export const getTourById = (id) => {
  return tours.find((element) => element.id === id);
};

export const checkUserId = (request, response, next, value) => {
  const id = Number(value);
  const tour = getTourById(id);

  if (!tour) {
    return response.status(404)
.json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  request.tour = tour;

  next();
};

export const checkBody = (request, response, next) => {
  if (!request.body.name || !request.body.price) {
    return response.status(400)
.json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

// Main functions
export const getAllTours = (request, response) => {
  response.status(200)
.json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
};

export const createTour = (request, response) => {
  const newId = tours.at(-1).id + 1;
  const newTour = Object.assign({ id: newId }, request.body);

  tours.push(newTour);
  // updatedTours = Object.assign(tours, newTour);

  fs.writeFile(absolutePath, JSON.stringify(tours), (error) => {
    res.status(201)
.json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
};

export const getTour = (request, response) => {
  const tour = request.tour;

  response.status(200)
.json({
    status: 'success',
    data: { tour },
  });
};

export const updateTour = (request, response) => {
  const tour = request.tour;

  const updatedTour = Object.assign(tour, request.body);
  // const updatedTour2 = { ...tour, ...req.body };

  fs.writeFile(absolutePath, JSON.stringify(tours), (error) => {
    res.status(200)
.json({
      status: 'success',
      data: { tour: updatedTour },
    });
  });
};

export const deleteTour = (request, response) => {
  const tour = request.tour;

  const index = tours.indexOf(tour);
  tours.splice(index, 1);

  fs.writeFile(absolutePath, JSON.stringify(tours), (error) => {
    res.status(204)
.json({
      status: 'success',
      data: null,
      message: 'Tour deleted successfully',
    });
  });
};
