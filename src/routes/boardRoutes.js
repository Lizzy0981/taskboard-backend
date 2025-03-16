const express = require('express');
const router = express.Router();
const {
  createBoard,
  getMyBoards,
  getBoard,
  updateBoard,
  deleteBoard,
  addBoardMember,
  updateMemberRole,
  removeBoardMember
} = require('../controllers/boardController');
const { protect, checkBoardRole } = require('../middleware/auth');

router.post('/', protect, createBoard);
router.get('/', protect, getMyBoards);
router.get('/:boardId', protect, checkBoardRole(['Creador', 'Colaborador', 'Observador']), getBoard);
router.put('/:boardId', protect, checkBoardRole(['Creador']), updateBoard);
router.delete('/:boardId', protect, checkBoardRole(['Creador']), deleteBoard);

// Manejo de miembros
router.post('/:boardId/members', protect, checkBoardRole(['Creador']), addBoardMember);
router.put('/:boardId/members/:userId', protect, checkBoardRole(['Creador']), updateMemberRole);
router.delete('/:boardId/members/:userId', protect, checkBoardRole(['Creador']), removeBoardMember);

module.exports = router;