import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';

async function getUsers(request, response) {
  const page = request.query.page;

  const users = await userModel.find({});

  return response.send({ users, userId: request.userId });
}

async function getOneUser(request, response) {
  try {
    const userId = request.params.userId;

    const user = await userModel.findById(userId);

    if (!user) {
      return response.status(404).send({ error: 'Usuario no existe' });
    }

    return response.send({ user });
  } catch (error) {
    response.status(500).send({ error });
  }
}

async function createUser(request, response) {
  try {
    const body = request.body;

    const user = await userModel.create({
      name: body.name,
      password: body.password,
    });

    return response.send({ user });
  } catch (error) {
    response.status(500).send({ error });
  }
}

async function editUser(request, response) {
  const userId = request.params.userId;

  const body = request.body;

  const user = await userModel.updateOne(
    { _id: userId },
    {
      ...body,
    },
    { new: true }
  );

  return response.send({ user });
}

async function deleteUser(request, response) {
  const userId = request.params.userId;

  await userModel.deleteOne({ _id: userId });

  return response.send({ success: true });
}

export { getUsers, getOneUser, createUser, editUser, deleteUser };
