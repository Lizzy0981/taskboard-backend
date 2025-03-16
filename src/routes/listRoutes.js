const express = require('express');
const router = express.Router();
const {
  createList,
  getBoardLists,
  updateList,
  deleteList
} = require('../controllers/listController');
const { protect, checkBoardRole } = require('../middleware/auth');
const { Board, List } = require('../models'); 

router.post('/board/:boardId', protect, checkBoardRole(['Creador', 'Colaborador']), createList);
router.get('/board/:boardId', protect, checkBoardRole(['Creador', 'Colaborador', 'Observador']), getBoardLists);
router.put('/:listId', protect, checkBoardRole(['Creador', 'Colaborador']), updateList);
router.delete('/:listId', protect, checkBoardRole(['Creador']), deleteList);

// Ruta temporal para crear listas (sin verificación de roles)
router.post('/board/:boardId/bypass', protect, async (req, res) => {
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
    console.error('Error al crear lista:', error);
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
});

module.exports = router;