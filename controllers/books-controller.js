const config = require('../common/config/env.config');
const axios = require('axios');
var parseString = require('xml2js').parseString;

exports.getBooksByAuthor = (req, res) => {
    const apiUrl = `${config.apiAuthorBooksUrl}${req.params.authorid}?format=xml&key=${config.apiSecretKey}&page=${req.params.page}`;
    axios.get(apiUrl)
        .then(response => {
            try {
                parseString(response.data, function (err, result) {
                    var outputResponse = {
                        authorid: req.params.authorid,
                        name: result.GoodreadsResponse.author[0].name,
                        start: result.GoodreadsResponse.author[0].books[0].$.start,
                        end: result.GoodreadsResponse.author[0].books[0].$.end,
                        total: result.GoodreadsResponse.author[0].books[0].$.total,
                        books: [],
                    };

                    var books = result.GoodreadsResponse.author[0].books[0].book;
                    for (var i = 0; i < books.length; i++) {
                        outputResponse.books.push(
                            {
                                isbnId: books[i].isbn[0],
                                image_url: books[i].image_url[0],
                                title: books[i].title[0],
                                link: books[i].link[0],
                                publication_year: books[i].publication_year[0],
                                publication_month: books[i].publication_month[0]
                            }
                        )
                    }
                    res.status(200).send(outputResponse);
                });
            } catch (err) {
                console.log(err);
                res.status(501).send(outputResponse);
            }
        })
        .catch(error => {
            res.status(501).send(error);
        });
};
