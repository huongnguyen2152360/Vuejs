"use strict"

module.exports = function (app) {
  console.log('routes vao`');
  app.use('/api/board', require('./api/board'));
  // app.use('/api/todo', require('./api/todo'))

  app.route("/:url(api)/*").get(function (req, res) {
    res.status(200).json({
      message: "Todo ~"
    });
  });

  app.route("/*").get(function (req, res) {
    res.status(200).json({
      message: "Todo ~"
    });
  });
}

