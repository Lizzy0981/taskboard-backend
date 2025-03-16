const jwt = require('jsonwebtoken');
const { User, BoardMember, List, Task } = require('../models');
const sequelize = require('../config/database'); 

exports.protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No estás autorizado para acceder a este recurso'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: 'Token inválido o expirado'
    });
  }
};

// Middleware para verificar roles en tableros
exports.checkBoardRole = (requiredRoles) => async (req, res, next) => {
  try {
    // Verificar si el usuario está autenticado
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Usuario no autenticado'
      });
    }

    const userId = req.user.id;
    let boardId = req.params.boardId;
    
    // Si no hay boardId pero hay listId, obtener el boardId de la lista
    if (!boardId && req.params.listId) {
      const list = await List.findByPk(req.params.listId);
      if (!list) {
        return res.status(404).json({
          success: false,
          message: 'Lista no encontrada'
        });
      }
      boardId = list.boardId;
    }
    
    // Si no hay boardId pero hay taskId, obtener el boardId a través de la lista de la tarea
    if (!boardId && req.params.taskId) {
      const task = await Task.findByPk(req.params.taskId);
      if (!task) {
        return res.status(404).json({
          success: false,
          message: 'Tarea no encontrada'
        });
      }
      
      const list = await List.findByPk(task.listId);
      if (!list) {
        return res.status(404).json({
          success: false,
          message: 'Lista no encontrada'
        });
      }
      
      boardId = list.boardId;
    }
    
    // Verificar si el tablero existe
    if (!boardId) {
      return res.status(400).json({
        success: false,
        message: 'ID de tablero no proporcionado'
      });
    }
    
    // Usar el modelo directamente
    const boardMember = await BoardMember.findOne({
      where: { 
        boardId: boardId,
        userId: userId 
      }
    });
    
    if (!boardMember) {
      return res.status(403).json({
        success: false,
        message: 'No tienes acceso a este tablero'
      });
    }
    
    if (requiredRoles && !requiredRoles.includes(boardMember.role)) {
      return res.status(403).json({
        success: false,
        message: `Se requiere el rol de ${requiredRoles.join(' o ')} para esta acción`
      });
    }
    
    req.boardMember = boardMember;
    next();
  } catch (error) {
    console.error('Error en checkBoardRole:', error);
    return res.status(500).json({
      success: false,
      message: 'Error al verificar permisos de tablero',
      error: error.message
    });
  }
};