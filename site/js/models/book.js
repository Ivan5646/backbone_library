var app = app || {};
app.Book = Backbone.Model.extend({
  defaults: {
    coverImage: 'img/placeholder.jpg',
    title: 'No title',
    author: 'Unknown',
    releaseDate: 'Unknown',
    keywords: 'None'
  },
  parse: function( response ) { // alows backbone know that a book was deleted in db... p. 119
    response.id = response._id;
    return response;
  }
});