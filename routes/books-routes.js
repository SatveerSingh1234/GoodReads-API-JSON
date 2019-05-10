const booksController = require('../controllers/books-controller');

exports.routesConfig = function (app) {
    app.get('/authorbooks/:authorid/:page', [
        booksController.getBooksByAuthor
    ]);
};