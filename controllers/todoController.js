const Todo = require('../models/Todo');
const asyncHandler = require('../middleware/asyncHandler');

// Get all todos
exports.getAllTodos = asyncHandler(async (req, res) => {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.status(200).json({
        success: true,
        data: todos
    });
});

// Create new todo
exports.createTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.create(req.body);
    res.status(201).json({
        success: true,
        data: todo
    });
});

// Get single todo
exports.getTodoById = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
        const error = new Error('Todo not found');
        error.status = 404;
        throw error;
    }
    res.status(200).json({
        success: true,
        data: todo
    });
});

// Update todo
exports.updateTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!todo) {
        const error = new Error('Todo not found');
        error.status = 404;
        throw error;
    }
    res.status(200).json({
        success: true,
        data: todo
    });
});

// Delete todo
exports.deleteTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
        const error = new Error('Todo not found');
        error.status = 404;
        throw error;
    }
    res.status(200).json({
        success: true,
        data: {}
    });
});