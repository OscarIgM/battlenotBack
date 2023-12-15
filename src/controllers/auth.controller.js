import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/environment.js';

async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await userModel
    .findOne({ email: email.toLowerCase() })
    .select('+password');

  if (!user) {
    return res.status(400).send({ error: 'Usuario no encontrado' });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return res.status(400).send({ error: 'Contrasena no corresponde' });
  }

  const token = jwt.sign({ userId: user._id, email:user.email, isAdmin:user.isAdmin }, JWT_SECRET, { expiresIn: '1m' });

  return res.status(200).send({ user, token });
}

async function register(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const user = await userModel.findOne({ email: email.toLowerCase() });

  if (user) {
    return res.status(400).send({ error: 'Email ya utilizado' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const userSaved = await userModel.create({
        email,
    password: passwordHash,
  });

  return res.status(200).send({ userSaved });
}

export { register, login };
