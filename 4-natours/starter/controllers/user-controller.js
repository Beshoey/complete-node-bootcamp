import fs from 'node:fs';
import path from 'node:path';

// const __filename = import.meta.filename;
// eslint-disable-next-line n/no-unsupported-features/node-builtins
const __dirname = import.meta.dirname;

const absolutePath = path.join(__dirname, '../', 'dev-data', 'data', 'users.json');
console.log(absolutePath);
export const users = JSON.parse(fs.readFileSync(`${absolutePath}`));

const getUserById = (request) => {
  const id = request.params.id * 1;
  return users.find((element) => element.id === id);
};

export const getAllUsers = (request, response) => {
  response.status(200)
.json({
    status: 'success',
    results: users.length,
    data: { users },
  });
};

export const createUser = (request, response) => {
  const userId = users.at(-1).id + 1;
  const user = Object.assign({ id: userId }, request.body);

  users.push(user);
  // updatedTours = Object.assign(tours, newTour);

  fs.writeFile(absolutePath, JSON.stringify(users), (error) => {
    if (error) {
      return response.status(500)
        .json({
          status: 'fail',
          message: 'Internal Server Error',
        });
    }
    response.status(201)
      .json({
        status: 'success',
        data: {
          user,
        },
      });
  });
};

export const getUser = (request, response) => {
  const user = getUserById(request);

  if (!user) {
    return response.status(404)
      .json({
        status: 'fail',
        message: 'Invalid ID',
      });
  }

  response.status(200)
    .json({
      status: 'success',
      data: { user },
    });
};

export const updateUser = (request, response) => {
  const user = getUserById(request);

  if (!user) {
    return response.status(404)
    .json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const updatedUser = Object.assign(user, request.body);
  // const updatedUser2 = { ...user, ...req.body };

  fs.writeFile(absolutePath, JSON.stringify(users), (error) => {
    if (error) {
      return response.status(500)
        .json({
          status: 'fail',
          message: 'Internal Server Error',
        });
    }
    response.status(200)
    .json({
      status: 'success',
      data: { user: updatedUser },
    });
  });
};

export const deleteUser = (request, response) => {
  const user = getUserById(request);

  if (!user) {
    return response.status(404)
.json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  const index = users.indexOf(user);
  users.splice(index, 1);

  fs.writeFile(absolutePath, JSON.stringify(users), ( error) => {
    if (error) {
      return response.status(500)
        .json({
          status: 'fail',
          message: 'Internal Server Error',
        });
    }
    response.status(204)
.json({
      status: 'success',
      data: undefined,
      message: 'User deleted successfully',
    });
  });
};
