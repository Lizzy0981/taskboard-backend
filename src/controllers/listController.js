const { List, Board, Task } = require('../models');

// Crear una lista
exports.createList = async (req, res) => {
  try {
    const { boardId } = req.params;
    const { name } = req.body;

    // Verificar si el tablero existe
    const board = await Board.findByPk(boardId);
    if (!board) {
      return res.status(404).json({
        success: false,
        message: 'Tablero no encontrado'
      });
    }

    // Obtener la posición más alta actual
    const maxPositionList = await List.findOne({
      where: { boardId },
      order: [['position', 'DESC']]
    });
    
    const position = maxPositionList ? maxPositionList.position + 1 : 0;

    // Crear lista
    const list = await List.create({
      name,
      position,
      boardId
    });

    res.status(201).json({
      success: true,
      data: list
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

// Obtener listas de un tablero
exports.getBoardLists = async (req, res) => {
  try {
    const { boardId } = req.params;

    // Verificar si el tablero existe
    const board = await Board.findByPk(boardId);
    if (!board) {
      return res.status(404).json({
        success: false,
        message: 'Tablero no encontrado'
      });
    }

    // Obtener listas con sus tareas
    const lists = await List.findAll({
      where: { boardId },
      include: [Task],
      order: [
        ['position', 'ASC'],
        [Task, 'position', 'ASC']
      ]
    });

    res.status(200).json({
      success: true,
      count: lists.length,
      data: lists
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

// Actualizar una lista
exports.updateList = async (req, res) => {
  try {
    const { listId } = req.params;
    const { name, position } = req.body;

    const list = await List.findByPk(listId);

    if (!list) {
      return res.status(404).json({
        success: false,
        message: 'Lista no encontrada'
      });
    }

    list.name = name || list.name;
    if (position !== undefined) {
      list.position = position;
    }

    await list.save();

    res.status(200).json({
      success: true,
      data: list
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

// Eliminar una lista
exports.deleteList = async (req, res) => {
  try {
    const { listId } = req.params;

    const list = await List.findByPk(listId);

    if (!list) {
      return res.status(404).json({
        success: false,
        message: 'Lista no encontrada'
      });
    }

    await list.destroy();

    res.status(200).json({
      success: true,
      message: 'Lista eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};
