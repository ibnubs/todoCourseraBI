const express = require('express');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');
const todoRoutes = require('./routes/todoRoutes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// Error Handler (Should be last middleware)
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log('Error:', err.message);
  // Close server & exit process
  server.close(() => process.exit(1));
});

module.exports = app;