import userModel from '../models/user.model.js';
import gameModel from '../models/games.model.js';

async function getInventory(req, res) {
    try {
      const user = await userModel.findById(req.query.userId); // Cambié req.body.userId a req.query.userId
  
      console.log("la id es", user);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      const inventory = await Promise.all(
        user.inventory.map(async (gameId) => {
          const game = await gameModel.findById(gameId);
          return game;
        })
      );
  
      res.status(200).json({ inventory });
  
    } catch (error) {
      console.error('Error al obtener el inventario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
  



async function buyGame (req, res)  {
    try {
    const user = await userModel.findById(req.body.userId);
    const game = await gameModel.findById(req.body.gameId);
console.log("datos", game);

    if (!user || !game) {
      return res.status(404).json({ error: 'Usuario o juego no encontrado' });
    }

    // Verificar si el juego ya está en el inventario del usuario
    const isInInventory = user.inventory.some(item => item._id.equals(req.body.gameId));

    if (isInInventory) {
      return res.status(400).json({ error: 'El juego ya está en el inventario del usuario' });
    }
    console.log("datos", game);

    // Agregar el juego al inventario del usuario
    user.inventory.push(game._id);
    await user.save();
    // Puedes realizar otras operaciones si es necesario, como actualizar la cantidad de juegos disponibles, etc.

    res.status(200).json({ message: 'Juego comprado con éxito', user });
  } catch (error) {
    console.error('Error al comprar el juego:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

async function deleteGame(req, res) {
    try {
      const user = await userModel.findById(req.body.userId);
      const game = await gameModel.findById(req.body.gameId);
  
      if (!user || !game) {
        return res.status(404).json({ error: 'Usuario o juego no encontrado' });
      }
  
      // Verificar si el juego está en el inventario del usuario
      const isInInventory = user.inventory.some(item => item.equals(game._id));
  
      if (!isInInventory) {
        return res.status(400).json({ error: 'El juego NO está en el inventario del usuario' });
      }
  
      // Eliminar el juego del inventario del usuario
      user.inventory = user.inventory.filter(item => !item.equals(game._id));
      await user.save();
  
      res.status(200).json({ message: 'Juego borrado con éxito', user });
    } catch (error) {
      console.error('Error al borrar el juego:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
  

export {getInventory,buyGame,deleteGame};
