
import express from 'express';
import {getInventory, buyGame,deleteGame, } from "../controllers/sale.controller.js";


const saleRouter = express.Router();

saleRouter.get('/', getInventory);
saleRouter.post('/', buyGame);
saleRouter.delete('/', deleteGame);

export default saleRouter;