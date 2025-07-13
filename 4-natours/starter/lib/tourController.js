import fs from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const absolutePath = resolve(
  __dirname,

  'dev-data',
  'data',
  'tours-simple.json'
);

export const tours = JSON.parse(fs.readFileSync(`${absolutePath}`, 'utf-8'));

export const getTourById = (req) => {
  const id = req.params.id * 1;
  return tours.find((el) => el.id === id);
};

export const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours },
  });
};

export const createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  // updatedTours = Object.assign(tours, newTour);

  fs.writeFile(absolutePath, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
};

export const getTour = (req, res) => {
  const tour = getTourById(req);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: { tour },
  });
};

export const updateTour = (req, res) => {
  const tour = getTourById(req);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const updatedTour = Object.assign(tour, req.body);
  // const updatedTour2 = { ...tour, ...req.body };

  fs.writeFile(absolutePath, JSON.stringify(tours), (err) => {
    res.status(200).json({
      status: 'success',
      data: { tour: updatedTour },
    });
  });
};

export const deleteTour = (req, res) => {
  const tour = getTourById(req);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const index = tours.indexOf(tour);
  tours.splice(index, 1);

  fs.writeFile(absolutePath, JSON.stringify(tours), (err) => {
    res.status(204).json({
      status: 'success',
      data: null,
      message: 'Tour deleted successfully',
    });
  });
};
