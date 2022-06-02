const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({
      error: "malformatted id"
    });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({
      error: error.message
    });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token"
    });
  }

  console.error(error.message);
  next(error);
};

module.exports = {
  errorHandler,
  unknownEndpoint,
};