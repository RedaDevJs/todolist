import express from 'express';
import { UserController } from './controllers/user.controller.js';
import bcrypt from 'bcrypt';
export const route = express();
route.use(express.json());

const userController = new UserController();

const sanitize = (item) => {
  const { password, salt, ...user } = item;
  return user;
};

route.get('/', async (req, res) => {
  try {
    const { page, limit, filter } = req.query;
    const result = await userController.getAll(page, limit, filter);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

route.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userController.getOne(id);
    if (result) res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

route.post('/register', async (req, res) => {
  try {
    const { body } = req;

    // Générer un sel avec bcrypt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);

    // Hacher le mot de passe avec le sel
    const hashedPassword = await bcrypt.hash(body.password, salt);

    // Ajouter l'utilisateur avec le mot de passe haché et le sel
    const result = await userController.Add({ ...body, password: hashedPassword, salt });

    if (result) {
      res.status(201).json(sanitize(result));
    } else {
      res.status(404).json({ msg: 'erreur' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json();
  }
});

route.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const result = await userController.update(id, body);
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json();
    }
  } catch (err) {
    console.error(res.status(500).json(err));
  }
});

route.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await userController.delete(id);
    if (result) res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default route;
