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