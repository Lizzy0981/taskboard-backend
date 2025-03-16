const express = require('express');
const router = express.Router();
const {
  createTask,
  getListTasks,
  getTask,
  updateTask,
  deleteTask
} = require('../controllers/taskController');
const { protect, checkBoardRole } = require('../middleware/auth');

router.post('/list/:listId', protect, checkBoardRole(['Creador', 'Colaborador']), createTask);
router.get('/list/:listId', protect, checkBoardRole(['Creador', 'Colaborador', 'Observador']), getListTasks);
router.get('/:taskId', protect, checkBoardRole(['Creador', 'Colaborador', 'Observador']), getTask);
router.put('/:taskId', protect, checkBoardRole(['Creador', 'Colaborador']), updateTask);
router.delete('/:taskId', protect, checkBoardRole(['Creador', 'Colaborador']), deleteTask);

module.exports = router;