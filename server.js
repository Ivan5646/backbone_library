// Module dependencies.
var application_root = __dirname,
    express = require( 'express' ), //Web framework
    path = require( 'path' ), //Utilities for dealing with file paths
    mongoose = require( 'mongoose' ); //MongoDB integration
//Create server
var app = express();
// Configure server
app.configure( function() {
  app.use( express.bodyParser() ); //parses request body and populates request.body
  app.use( express.methodOverride() ); //checks request.body for HTTP method overrides
  app.use( app.router ); //perform route lookup based on URL and HTTP method
  app.use( express.static( path.join( application_root, 'site') ) ); //Where to serve static content
  app.use( express.errorHandler({ dumpExceptions: true, showStack: true })); //Show all errors in development
});
//Start server
var port = 4711;
app.listen( port, function() {
  console.log( 'Express server listening on port %d in %s mode',
  port, app.settings.env );
});
// Routes. We define routes by using app followed by one of the HTTP verbs get, put, post, and delete.
app.get( '/api', function( request, response ) {
  response.send( 'Library API is running' );
});
//Get a list of all books
app.get( '/api/books', function( request, response ) {
  return BookModel.find( function( err, books ) { //  p.110. What is .find() anyway? js function?
    if( !err ) {
      return response.send( books );
    } else {
      return console.log( err );
    }
  });
});
//Insert a new book. POST route.
app.post( '/api/books', function( request, response ) { // this saves a book to db (returning an id). How does it work?
  var book = new BookModel({
    title: request.body.title,
    author: request.body.author,
    releaseDate: request.body.releaseDate
  });
  book.save( function( err ) { // what is save()
    if( !err ) {
      return console.log( 'created' );
    } else {
      return console.log( err );
    }
  });
  return response.send( book );
});
//Get a single book by id
app.get( '/api/books/:id', function( request, response ) {
  return BookModel.findById( request.params.id, function( err, book ) { // http://mongoosejs.com/docs/api.html#model_Model.findById
    if( !err ) {
      return response.send( book );
    } else {
      return console.log( err );
    }
  });
});
//Update a book. p. 114
app.put( '/api/books/:id', function( request, response ) {
  console.log( 'Updating book ' + request.body.title );
  return BookModel.findById( request.params.id, function( err, book ) {
    book.title = request.body.title;
    book.author = request.body.author;
    book.releaseDate = request.body.releaseDate;
    return book.save( function( err ) {
      if( !err ) {
        console.log( 'book updated' );
      } else {
        console.log( err );
      }
      return response.send( book );
    });
  });
});
//Delete a book
app.delete( '/api/books/:id', function( request, response ) {
  console.log( 'Deleting book with id: ' + request.params.id );
  return BookModel.findById( request.params.id, function( err, book ) {
    return book.remove( function( err ) {
      if( !err ) {
        console.log( 'Book removed' );
      return response.send( '' );
      } else {
        console.log( err );
      }
    });
  });
});

//Connect to database
mongoose.connect( 'mongodb://localhost/library_database' );
//Schemas
var Book = new mongoose.Schema({ // like a table?
  title: String,
  author: String,
  releaseDate: Date
});
//Models
var BookModel = mongoose.model( 'Book', Book ); // var Model = mongoose.model('Model', schema);




