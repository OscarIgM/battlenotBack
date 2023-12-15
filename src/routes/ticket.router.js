import express from 'express';
import { postTicket } from '../controllers/ticket.controller.js';

postTicket = express.Router();

gameRouter.post('/', postTicket);

export default postTicket;