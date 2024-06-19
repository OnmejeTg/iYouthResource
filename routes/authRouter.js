import express from 'express';
import { createUser } from '../controllers/authCtrl.js';

export const authRouter = express.Router();

authRouter.post('/', createUser)
