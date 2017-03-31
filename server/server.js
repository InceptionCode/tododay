/* global process, require: true */
require( 'dotenv' ).config();
const express = require( 'express' ),
  expressJWT =require( 'express-jwt' ),
  app =express(),
  cors =require( 'cors' ),
  bodyParser =require( 'body-parser' ),
  knexConfig ={
    client: 'pg',
    debug: true,
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE
    }
  },
  pg =require( 'knex' )( knexConfig ),
  bcrypt =require( 'bcryptjs' ),
  saltRounds =parseInt(process.env.ROUNDS),
  jwt =require( 'jsonwebtoken' ),
  errorHandler = function ( res, { name, message } ) {

    if ( message ) {

      return res.status( name ).send( message );

    } else {

      return res.status( name );

    }

  };
//-------------------------------------------=
app.use(
  bodyParser.json(),
  cors(),
  expressJWT( { secret: process.env.SECRET } )
     .unless( { path: [ '/signup', '/auth' ] } )

  //Check if token is available and if user is authorized.
  
  //Then validate the token and push user to proper "Todo-List".

  //If token is not available block user from proceeding to "Todo-list"
);
app.get( '/todos', function ( req, res ) {

  let query ={
      completed: parseInt( req.query.completed ),
      userid: parseInt( req.query.id ),
    },
    sql =pg( 'user_todos' ).where( query ).select().returning( '*' );

  sql
  .then( result => {

    res.status( 200 ).send( result );

  }, err => {

    res.status( 500 ).send( err );

  } );

} );

const checkUserEmail =( result ) => {

    const message =`Looks like we don\'t have that email.
    If you would like to sign up, click the "Sign Up" button.`,

      error =new Error( message );
    if ( result.length <=0 ) {

      error.name =404;
      throw error;

    } else {

      return result;

    }

  },
  sendToken =function ( { id, email, password, res } ) {

    jwt.sign( { id, email, password }, process.env.SECRET,
    { expiresIn: '14d' }, ( err, token )=> {

      if ( err ) {

        res.status( 500 ).send( err );

      } else {

        res.status( 202 ).send( { token } );

      }

    } );

  },
  confirmSendingToken =function ( { id, email }, password, isMatch, res ) {

    if ( isMatch ) {

      const userInformation ={ id, email, password, res };
      return userInformation;

    } else {

      const message =`Whoops, looks like that's not the right password.
      Relax, take your time, and try again.`,
        error =new Error( message );
      error.name =401;
      throw error;

    }

  };

app.post( '/auth', function ( req, res ) {

  const { email, password } =req.body;

  pg( 'users' ).where( 'email', email ).select()
    .then( result => checkUserEmail( result ) )
    .then( result => ( { isMatch: bcrypt.compareSync( password, result[0].hash ), user: result[0] } ) )
    .then( ( { isMatch, user } ) => confirmSendingToken( user, password, isMatch, res ) )
    .then( userInformation => sendToken( userInformation ) )
    .catch( err => errorHandler( res, err ) );

} );

const addDatabaseUser =function ( email, hash, res ) {

  const user ={ email, hash };
  pg( 'users' ).returning('id').insert( user )
    .then( result => {
      
      let id = result[0];
      sendToken({id, email, hash, res});

    }, error => {
	if ( error ) {

		let message ='UhOh I believe that email already exist. Try signing in.',
		err = new Error( message );
		err.name =400;
		errorHandler( res, err );
	      }

    } );

};

app.post( '/signup', function ( req, res ) {

  const { email, password } =req.body;
  bcrypt.hash( password, saltRounds )
  .then( hash => addDatabaseUser( email, hash, res ) )
  .catch( err => errorHandler( res, err ) );

} );

app.post( '/todos', function ( req, res ) {

  const newTodo ={
    description: req.body.description,
    completed: 0,
    userid: req.body.user_id
  };

  pg( 'user_todos' ).returning( '*' ).insert( newTodo )
      .then( result => {

        res.status( 201 ).send( result );

      }, err => {

        res.status( 500 ).send( err );

      } );

} );

app.delete( '/todos/:deleteId', function ( req, res ) {

  const id =req.params.deleteId;
  pg( 'user_todos' ).where( 'id', id ).del()
    .then( () => {

      res.status( 202 );

    }, err => {

      res.status( 500 ).send( err );

    } );

} );

app.put( '/todos/:updateId', function ( req, res ) {

  const id =req.params.updateId,
    sql =pg( 'user_todos' ).where( 'id', id ).update( req.body );
  sql
    .then( () => {

      res.status( 204 );

    }, err => {

      res.status( 500 ).send( err );

    } );

} );

app.listen(3000);
