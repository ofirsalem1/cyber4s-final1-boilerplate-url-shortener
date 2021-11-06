// Create a error handeling middleware in ./src/middleware/errorHandler.js dir to handle server errors:

// 404 for not found pokemons
// 403 for releasing an uncaught pokemon, or catching an already caught pokemon
// 500 for server errors
// 401 for unauthenticated user request (pokemon requests missing the username header)

function errorHandler(err, req, res, next) {
  if (!err.status) {
    return res.status(500).send({ error: "internal server error" });
  }
  return res.status(err.status).send(err.message);
}

module.exports = { errorHandler };
