const notFound = (req, res) => {
  res.status(404).json({ message: "Route not found", code: "NOT_FOUND" });
};

const errorHandler = (err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: err.message || "Internal server error",
    code: err.code || "INTERNAL_ERROR",
  });
};

module.exports = {
  notFound,
  errorHandler,
};
