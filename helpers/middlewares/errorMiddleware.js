const { StatusCodes } = require('http-status-codes'); 

const conflictError = (err, res) => {
  if (err.statusCode === 'conflict') {
    return res.status(StatusCodes.CONFLICT).json({ message: err.message });
  }
};

const unauthorizedError = (err, res) => {
  if (err.statusCode === 'unauthorized') {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: err.message });
  }
};

const notFoundError = (err, res) => {
  if (err.statusCode === 'not_found') {
    return res.status(StatusCodes.NOT_FOUND).json({ message: err.message });
  }
};

const badRequestError = (err, res) => {
  if (err.statusCode === 'bad_request') {
    return res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
  }
};

const errorMiddleware = (err, _req, res, _next) => {
  if (err.statusCode) {
    badRequestError(err, res);
    conflictError(err, res);
    unauthorizedError(err, res);
    notFoundError(err, res);
  } else {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json([err.message, 'teste']);
  }
};

module.exports = errorMiddleware;
