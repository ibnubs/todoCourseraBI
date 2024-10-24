const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: Object.values(err.errors).map(error => error.message)
      });
    }
  
    if (err.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid ID format'
      });
    }
  
    res.status(err.status || 500).json({
      success: false,
      error: err.message || 'Internal Server Error'
    });
  };
  
  module.exports = errorHandler;