const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  if (process.env.NODE_ENV === "production") {
    const safeMessage =
      statusCode === 500 ? "Internal Server Error" : message;

    return res.status(statusCode).json({
      success: false,
      message: safeMessage,
      errors: err.errors || [],
    });
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [],
  });
};

module.exports = errorMiddleware;
