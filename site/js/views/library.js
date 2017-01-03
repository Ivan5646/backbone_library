var app = app || {};
  app.LibraryView = Backbone.View.extend({
  el: '#books',
  // in the initialize function we accept an array of data that we pass to the app.Library constructor. We’ll use this to populate our collection with some sample data so that we can see everything is working correctly.
  initialize: function( initialBooks ) { // what is passed in initialBooks?
    this.collection = new app.Library( initialBooks ); // remove initialBooks? p. 117
    this.collection.fetch({reset: true}); // NEW (Frontend). Fetches a model?
    this.render();
    this.listenTo( this.collection, 'add', this.renderBook ); // make the view render again when a new model is added
    this.listenTo( this.collection, 'reset', this.render ); // NEW (Frontend).
  },
  // render library by rendering each book in its collection
  render: function() {
    this.collection.each(function( item ) {
    this.renderBook( item );
    }, this );
  },
  // render a book by creating a BookView and appending the element it renders to the library's element
  renderBook: function( item ) {
    var bookView = new app.BookView({
    model: item
    });
    this.$el.append( bookView.render().el );
  },
  events:{
  'click #add':'addBook'
  },
  addBook: function( e ) { // adding a new book using the form
    e.preventDefault();
    var formData = {};

    $( '#addBook div' ).children( 'input' ).each( function( i, el ) {
      if( $( el ).val() != '' ){
        if( el.id === 'keywords' ) {
          formData[ el.id ] = [];
          _.each( $( el ).val().split( ' ' ), function( keyword ) {
          formData[ el.id ].push({ 'keyword': keyword });
          });
        } else if( el.id === 'releaseDate' ) {
          formData[ el.id ] = $( '#releaseDate' ).datepicker( 'getDate' ).getTime();
        } else {
          formData[ el.id ] = $( el ).val();
        }
      }
      // Clear input field value
      $( el ).val('');
    });
    this.collection.create( formData ); // allow save new books to db after form submission 
  }
});