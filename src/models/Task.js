const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('Pendiente', 'En Progreso', 'Completada'),
    defaultValue: 'Pendiente'
  },
  priority: {
    type: DataTypes.ENUM('Baja', 'Media', 'Alta', 'Urgente'),
    defaultValue: 'Media'
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  position: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  listId: {  // Añadir esta columna
    type: DataTypes.UUID,
    allowNull: false
  },
  createdBy: {  // Añadir esta columna
    type: DataTypes.UUID,
    allowNull: true
  },
  assignedTo: {  // Añadir esta columna
    type: DataTypes.UUID,
    allowNull: true
  }
});

module.exports = Task;