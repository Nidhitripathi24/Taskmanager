const Task = require('../models/Task');

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private
const createTask = async (req, res) => {
    try {
        const { title, description, status } = req.body;

        const task = await Task.create({
            title,
            description,
            status: status || 'todo',
            owner: req.user._id
        });

        res.status(201).json(task);
    } catch (err) {
        console.error('Create task error:', err);
        res.status(500).json({ message: 'Server error creating task' });
    }
};

// @desc    Get all tasks for logged in user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
    try {
        const { status, search } = req.query;

        // Build query
        let query = { owner: req.user._id };

        if (status && status !== 'all') {
            query.status = status;
        }

        let tasks = await Task.find(query).sort({ createdAt: -1 });

        // Client-side search is fine, but we can do it server-side too
        if (search) {
            const searchLower = search.toLowerCase();
            tasks = tasks.filter(task =>
                task.title.toLowerCase().includes(searchLower) ||
                (task.description && task.description.toLowerCase().includes(searchLower))
            );
        }

        res.json(tasks);
    } catch (err) {
        console.error('Get tasks error:', err);
        res.status(500).json({ message: 'Server error fetching tasks' });
    }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Make sure user owns this task
        if (task.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to view this task' });
        }

        res.json(task);
    } catch (err) {
        console.error('Get task error:', err);
        res.status(500).json({ message: 'Server error fetching task' });
    }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Make sure user owns this task
        if (task.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to update this task' });
        }

        // Update fields
        task.title = req.body.title || task.title;
        task.description = req.body.description !== undefined ? req.body.description : task.description;
        task.status = req.body.status || task.status;

        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        console.error('Update task error:', err);
        res.status(500).json({ message: 'Server error updating task' });
    }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Make sure user owns this task
        if (task.owner.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: 'Not authorized to delete this task' });
        }

        await task.deleteOne();
        res.json({ message: 'Task removed' });
    } catch (err) {
        console.error('Delete task error:', err);
        res.status(500).json({ message: 'Server error deleting task' });
    }
};

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};
