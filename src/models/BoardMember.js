const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BoardMember = sequelize.define('BoardMember', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  boardId: {  // Añadir esta columna
    type: DataTypes.UUID,
    allowNull: false
  },
  userId: {   // Añadir esta columna
    type: DataTypes.UUID,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('Creador', 'Colaborador', 'Observador'),
    defaultValue: 'Colaborador',
    allowNull: false
  }
});

module.exports = BoardMember;