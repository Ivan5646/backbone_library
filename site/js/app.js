// the entry point of the whole app
var app = app || {};
$(function() {
  $( '#releaseDate' ).datepicker(); // bind a datepicker to our releaseDate field:
  new app.LibraryView();
});

/*var app = app || {};
$(function() {
  var books = [
    { title: 'JavaScript: The Good Parts', author: 'Douglas Crockford',
    releaseDate: '2008', keywords: 'JavaScript Programming' },
    { title: 'The Little Book on CoffeeScript', author: 'Alex MacCaw',
    releaseDate: '2012', keywords: 'CoffeeScript Programming' },
    { title: 'Scala for the Impatient', author: 'Cay S. Horstmann',
    releaseDate: '2012', keywords: 'Scala Programming' },
    { title: 'American Psycho', author: 'Bret Easton Ellis',
    releaseDate: '1991', keywords: 'Novel Splatter' },
    { title: 'Eloquent JavaScript', author: 'Marijn Haverbeke',
    releaseDate: '2011', keywords: 'JavaScript Programming' }
  ];
  new app.LibraryView( books ); // Our app just passes the sample data to a new instance of app.LibraryView that it creates. Since the initialize() constructor in LibraryView invokes the view’s render() method, all the books in the library will be displayed. Since we are passing our entry point as a callback to jQuery (in the form of its $ alias), the function will execute when the DOM is ready. (Generally you pass a model in this view constructor like: new app.LibraryView( model: nameOfTheModel ) )
});*/