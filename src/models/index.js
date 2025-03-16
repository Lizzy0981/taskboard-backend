// src/models/index.js
const User = require('./User');
const Board = require('./Board');
const BoardMember = require('./BoardMember');
const List = require('./List');
const Task = require('./Task');

// Relaciones entre User y Board (muchos a muchos)
User.belongsToMany(Board, { through: BoardMember });
Board.belongsToMany(User, { through: BoardMember });

// Relación entre Board y List (uno a muchos)
Board.hasMany(List, { onDelete: 'CASCADE' });
List.belongsTo(Board);

// Relación entre List y Task (uno a muchos)
List.hasMany(Task, { onDelete: 'CASCADE' });
Task.belongsTo(List);

// Relación entre User y Task (uno a muchos) para el creador
User.hasMany(Task, { as: 'CreatedTasks', foreignKey: 'createdBy' });
Task.belongsTo(User, { as: 'Creator', foreignKey: 'createdBy' });

// Relación entre User y Task (uno a muchos) para asignado
User.hasMany(Task, { as: 'AssignedTasks', foreignKey: 'assignedTo' });
Task.belongsTo(User, { as: 'Assignee', foreignKey: 'assignedTo' });

module.exports = {
  User,
  Board,
  BoardMember,
  List,
  Task
};