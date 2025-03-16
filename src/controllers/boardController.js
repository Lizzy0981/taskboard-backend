const { Board, BoardMember, List, Task, User } = require('../models');
const { Op } = require('sequelize');

// Crear un tablero
exports.createBoard = async (req, res) => {
  try {
    const { name, description } = req.body;

    const board = await Board.create({
      name,
      description
    });

    // Asignar al usuario como creador del tablero
    await BoardMember.create({
      boardId: board.id,
      userId: req.user.id,
      role: 'Creador'
    });

    res.status(201).json({
      success: true,
      data: board
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

// Obtener todos los tableros del usuario
exports.getMyBoards = async (req, res) => {
  try {
    // Encontrar todos los tableros donde el usuario es miembro
    const boards = await Board.findAll({
      include: [{
        model: User,
        where: { id: req.user.id },
        attributes: [], // No incluir datos del usuario
        through: { attributes: ['role'] }
      }],
      attributes: ['id', 'name', 'description', 'createdAt']
    });

    res.status(200).json({
      success: true,
      count: boards.length,
      data: boards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

// Obtener un tablero específico
exports.getBoard = async (req, res) => {
  try {
    const { boardId } = req.params;

    const board = await Board.findByPk(boardId, {
      include: [
        {
          model: List,
          include: [Task]
        },
        {
          model: User,
          through: { attributes: ['role'] },
          attributes: ['id', 'username', 'email']
        }
      ]
    });

    if (!board) {
      return res.status(404).json({
        success: false,
        message: 'Tablero no encontrado'
      });
    }

    res.status(200).json({
      success: true,
      data: board
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

// Actualizar un tablero
exports.updateBoard = async (req, res) => {
  try {
    const { boardId } = req.params;
    const { name, description } = req.body;

    const board = await Board.findByPk(boardId);

    if (!board) {
      return res.status(404).json({
        success: false,
        message: 'Tablero no encontrado'
      });
    }

    board.name = name || board.name;
    board.description = description !== undefined ? description : board.description;

    await board.save();

    res.status(200).json({
      success: true,
      data: board
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

// Eliminar un tablero
exports.deleteBoard = async (req, res) => {
  try {
    const { boardId } = req.params;

    const board = await Board.findByPk(boardId);

    if (!board) {
      return res.status(404).json({
        success: false,
        message: 'Tablero no encontrado'
      });
    }

    await board.destroy();

    res.status(200).json({
      success: true,
      message: 'Tablero eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

// Añadir miembro al tablero
exports.addBoardMember = async (req, res) => {
  try {
    const { boardId } = req.params;
    const { email, role } = req.body;

    // Verificar si el tablero existe
    const board = await Board.findByPk(boardId);
    if (!board) {
      return res.status(404).json({
        success: false,
        message: 'Tablero no encontrado'
      });
    }

    // Buscar al usuario por email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'Usuario no encontrado'
      });
    }

    // Verificar si ya es miembro
    const existingMember = await BoardMember.findOne({
      where: {
        boardId,
        userId: user.id
      }
    });

    if (existingMember) {
      return res.status(400).json({
        success: false,
        message: 'El usuario ya es miembro de este tablero'
      });
    }

    // Añadir miembro con el rol especificado
    const validRoles = ['Creador', 'Colaborador', 'Observador'];
    const memberRole = validRoles.includes(role) ? role : 'Colaborador';

    const boardMember = await BoardMember.create({
      boardId,
      userId: user.id,
      role: memberRole
    });

    res.status(201).json({
      success: true,
      data: {
        id: boardMember.id,
        role: boardMember.role,
        user: {
          id: user.id,
          username: user.username,
          email: user.email
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

// Actualizar rol de miembro
exports.updateMemberRole = async (req, res) => {
  try {
    const { boardId, userId } = req.params;
    const { role } = req.body;

    // Verificar roles válidos
    const validRoles = ['Creador', 'Colaborador', 'Observador'];
    if (!validRoles.includes(role)) {
      return res.status(400).json({
        success: false,
        message: 'Rol inválido'
      });
    }

    // Buscar al miembro
    const boardMember = await BoardMember.findOne({
      where: {
        boardId,
        userId
      }
    });

    if (!boardMember) {
      return res.status(404).json({
        success: false,
        message: 'Miembro no encontrado en este tablero'
      });
    }

    // No permitir cambiar el rol del creador original
    if (boardMember.role === 'Creador' && role !== 'Creador') {
      return res.status(400).json({
        success: false,
        message: 'No se puede cambiar el rol del creador original del tablero'
      });
    }

    boardMember.role = role;
    await boardMember.save();

    res.status(200).json({
      success: true,
      data: boardMember
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

// Eliminar miembro de tablero
exports.removeBoardMember = async (req, res) => {
  try {
    const { boardId, userId } = req.params;

    // Buscar al miembro
    const boardMember = await BoardMember.findOne({
      where: {
        boardId,
        userId
      }
    });

    if (!boardMember) {
      return res.status(404).json({
        success: false,
        message: 'Miembro no encontrado en este tablero'
      });
    }

    // No permitir eliminar al creador original
    if (boardMember.role === 'Creador') {
      return res.status(400).json({
        success: false,
        message: 'No se puede eliminar al creador original del tablero'
      });
    }

    await boardMember.destroy();

    res.status(200).json({
      success: true,
      message: 'Miembro eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};