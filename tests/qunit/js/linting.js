
(function(){
  'use strict';
  
  module( 'PhET core: JSHint' );
  
  unitTestLintFilesMatching( function( src ) {
    return src.indexOf( 'phet-core/js' ) !== -1;
  } );
})();
