import gameModel from '../models/games.model.js';

async function getGames(request, response) {
  const page = request.query.page;

  const games = await gameModel.find({});

  return response.send({ games });
}
async function getOneGame(request, response) {
  try {
    const gameId = request.params.gameId;

    const game = await gameModel.findById(gameId);

    if (!game) {
      return response.status(404).send({ error: 'Juego no existe' });
    }

    return response.send({ game });
  } catch (error) {
    response.status(500).send({ error });
  }
}
async function postGame(request, response) {
  try {
    const body = request.body;

    const game = await gameModel.create({
      title: body.title,
      description: body.description,
      price: body.price,
      imageUrl:body.imageUrl,
    });

    return response.send({ game });
  } catch (error) {
    response.status(500).send({ error });
  }
}

async function putGame(request, response) {
  const gameId = request.params.gameId;
  const body = request.body;
  const game = await gameModel.updateOne(
    { _id: gameId },
    {
      ...body,
    },
    { new: true }
  );

  return response.send({ game });
}

async function deleteGame(request, response) {
  const gameId = request.params.gameId;

  await gameModel.deleteOne({ _id: gameId });

  return response.send({ success: true });
}

export { getGames, getOneGame, postGame, putGame, deleteGame };