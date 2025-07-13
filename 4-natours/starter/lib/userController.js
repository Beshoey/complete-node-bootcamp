import fs from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const absolutePath = join(__dirname, '../', 'dev-data', 'data', 'users.json');

export const users = JSON.parse(fs.readFileSync(`${absolutePath}`, 'utf-8'));

export const getAllUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: users.length,
    data: { users },
  });
};

const getUser = (req, res) => {
  const id = req.params.id * 1;
  return users.find((el) => el.id === id);
};

export const createUser = (req, res) => {
  const newId = users[users.length - 1].id + 1;
  const newUser = Object.assign({ id: newId }, req.body);

  users.push(newUser);
  // updatedTours = Object.assign(tours, newTour);

  fs.writeFile(absolutePath, JSON.stringify(tours), (err) => {
    res.status(201).json({
      status: 'success',
      data: {
        user: newUser,
      },
    });
  });
};
