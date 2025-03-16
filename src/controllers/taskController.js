const { Task, List, User } = require('../models');

// Crear una tarea
exports.createTask = async (req, res) => {
  try {
    const { listId } = req.params;
    const { title, description, status, priority, dueDate, assignedTo } = req.body;

    // Verificar si la lista existe
    const list = await List.findByPk(listId);
    if (!list) {
      return res.status(404).json({
        success: false,
        message: 'Lista no encontrada'
      });
    }

    // Obtener la posición más alta actual
    const maxPositionTask = await Task.findOne({
      where: { listId },
      order: [['position', 'DESC']]
    });
    
    const position = maxPositionTask ? maxPositionTask.position + 1 : 0;

    // Crear tarea
    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      position,
      listId,
      createdBy: req.user.id,
      assignedTo: assignedTo || null
    });

    // Si se asignó a alguien, verificar que existe
    if (assignedTo) {
      const assignee = await User.findByPk(assignedTo);
      if (!assignee) {
        return res.status(404).json({
          success: false,
          message: 'Usuario asignado no encontrado'
        });
      }
    }

    res.status(201).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

// Obtener tareas de una lista
exports.getListTasks = async (req, res) => {
  try {
    const { listId } = req.params;

    // Verificar si la lista existe
    const list = await List.findByPk(listId);
    if (!list) {
      return res.status(404).json({
        success: false,
        message: 'Lista no encontrada'
      });
    }

    // Obtener tareas
    const tasks = await Task.findAll({
      where: { listId },
      include: [
        {
          model: User,
          as: 'Creator',
          attributes: ['id', 'username', 'email']
        },
        {
          model: User,
          as: 'Assignee',
          attributes: ['id', 'username', 'email']
        }
      ],
      order: [['position', 'ASC']]
    });

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

// Obtener una tarea específica
exports.getTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByPk(taskId, {
      include: [
        {
          model: User,
          as: 'Creator',
          attributes: ['id', 'username', 'email']
        },
        {
          model: User,
          as: 'Assignee',
          attributes: ['id', 'username', 'email']
        }
      ]
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

// Actualizar una tarea
exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status, priority, dueDate, listId, position, assignedTo } = req.body;

    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada'
      });
    }

    // Actualizar campos
    task.title = title || task.title;
    task.description = description !== undefined ? description : task.description;
    
    if (status) {
      const validStatuses = ['Pendiente', 'En Progreso', 'Completada'];
      task.status = validStatuses.includes(status) ? status : task.status;
    }
    
    if (priority) {
      const validPriorities = ['Baja', 'Media', 'Alta', 'Urgente'];
      task.priority = validPriorities.includes(priority) ? priority : task.priority;
    }
    
    if (dueDate !== undefined) {
      task.dueDate = dueDate;
    }
    
    if (listId) {
      // Verificar si la lista existe
      const list = await List.findByPk(listId);
      if (!list) {
        return res.status(404).json({
          success: false,
          message: 'Lista de destino no encontrada'
        });
      }
      task.listId = listId;
    }
    
    if (position !== undefined) {
      task.position = position;
    }
    
    if (assignedTo !== undefined) {
      // Si es null, desasignar
      if (assignedTo === null) {
        task.assignedTo = null;
      } else {
        // Verificar que el usuario existe
        const assignee = await User.findByPk(assignedTo);
        if (!assignee) {
          return res.status(404).json({
            success: false,
            message: 'Usuario asignado no encontrado'
          });
        }
        task.assignedTo = assignedTo;
      }
    }

    await task.save();

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

// Eliminar una tarea
exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;

    const task = await Task.findByPk(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada'
      });
    }

    await task.destroy();

    res.status(200).json({
      success: true,
      message: 'Tarea eliminada correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

// Mover una tarea entre listas (cambiar listId y position)
exports.moveTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { listId, position } = req.body;

    // Verificar que la tarea existe
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada'
      });
    }

    // Verificar que la lista destino existe
    if (listId) {
      const list = await List.findByPk(listId);
      if (!list) {
        return res.status(404).json({
          success: false,
          message: 'Lista de destino no encontrada'
        });
      }
    }

    // Actualizar listId y position
    if (listId) task.listId = listId;
    if (position !== undefined) task.position = position;
    
    await task.save();

    // Recalcular posiciones si es necesario
    if (listId && position !== undefined) {
      // Obtener todas las tareas de la lista destino excepto la movida
      const tasksInList = await Task.findAll({
        where: { 
          listId, 
          id: { [Op.ne]: taskId } 
        },
        order: [['position', 'ASC']]
      });
      
      // Reordenar las tareas para acomodar la nueva posición
      let currentPosition = 0;
      for (const t of tasksInList) {
        if (currentPosition === position) currentPosition++;
        t.position = currentPosition;
        await t.save();
        currentPosition++;
      }
    }

    res.status(200).json({
      success: true,
      data: await Task.findByPk(taskId)
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

// Asignar una tarea a un usuario
exports.assignTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { userId } = req.body;

    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada'
      });
    }

    // Si userId es null, estamos desasignando
    if (userId === null) {
      task.assignedTo = null;
    } else {
      // Verificar que el usuario existe
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'Usuario no encontrado'
        });
      }
      task.assignedTo = userId;
    }

    await task.save();

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};

// Cambiar estado de una tarea
exports.updateTaskStatus = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'El estado es requerido'
      });
    }

    const validStatuses = ['Pendiente', 'En Progreso', 'Completada'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Estado inválido. Debe ser uno de: ' + validStatuses.join(', ')
      });
    }

    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({
        success: false,
        message: 'Tarea no encontrada'
      });
    }

    task.status = status;
    await task.save();

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error en el servidor',
      error: error.message
    });
  }
};