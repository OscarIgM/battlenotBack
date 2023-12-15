import gameModel from '../models/games.model.js';
import express from 'express';
import  { getGames, getOneGame, postGame, putGame, deleteGame } from '../controllers/games.controller.js';


const gamesRouter = express.Router();

gamesRouter.get('/',getGames);
gamesRouter.get('/:gameId', getOneGame);
gamesRouter.post('/', postGame);
gamesRouter.delete('/:gameId', deleteGame);
gamesRouter.put('/:gameId', deleteGame);

export default gamesRouter;
