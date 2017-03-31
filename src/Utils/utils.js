import axios from "axios";

function tryRequest ( request ) {

   try {

     axios( request );

   } catch ( error ) {

       console.log( error );

   }

}

function showSettings ( ) {

    let settings =document.querySelector( ".settings" );

    settings.classList.toggle( "show-settings" );

}

function removeHelp () {
       
   let helperClass = this.state.helperClass;
   if ( helperClass.length < 10 ) {
       	this.setState( { helperClass: helperClass + " " + "removed" } );
   }
}

function inputsChange ( e ) {

        this.setState( {
	    [e.target.type]: e.target.value
        } );
}


export { tryRequest, showSettings, removeHelp, inputsChange };
