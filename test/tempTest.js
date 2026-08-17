/*
 * js.system.collections
 * Copyright (C) 2019-2026 João Pedro Martins Neves (shivayl)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 */

let _Dictionary;
let _List;

try {
  // Node.js.
  _Dictionary = require( '../index' ).Dictionary;
  _List = require( '../index' ).List;

} catch ( e ) {
  // Browser.
  _Dictionary = Dictionary;
  _List = List;
}

const runTest = () => {
  // ------------------------------------------------------------------------ //

  // DICTIONARY
  console.log( '// ------------------------------------------------------------------------ //' );
  console.log( 'DICTIONARY' );

  console.debug( 'Create a Dictionary with unique keys.' );
  const myDict = new _Dictionary( true );

  console.debug( 'Is the Dictionay empty?', myDict.isEmpty );

  console.debug( 'Add some items to the neww Dictionary.' );
  myDict.add( 'one', 'This is one.' );
  myDict.add( 'two', 'This is two.' );
  myDict.add( 'three', 'This is three.' );
  console.debug( 'Is the Dictionay empty?', myDict.isEmpty );

  console.debug( myDict.findIndexOfKey( 'three' ) );
  console.debug( myDict.getByKey( 'three' ) );
  console.debug( 'All Keys:', myDict.getAllKeys() );
  console.debug( 'All Values:', myDict.getAllValues() );

  console.debug( 'Update the second element by index:' );
  myDict.updateByIndex( 1, "This is two v2." );
  console.debug( 'Get the second element by index:' );
  console.debug( 'Dictionary[1] =', myDict.getByIndex( 1 ) );

  console.debug( 'Update the second element by key' );
  myDict.updateByKey( "two", "This is two v3." );
  console.debug( 'Get the second element by key' );
  console.debug( myDict.getByKey( "two" ) );

  console.debug( 'Remove the first and last elements from the Collection.' );
  myDict.removeFirst();
  myDict.removeLast();
  console.debug( myDict.getAllValues() );

  console.debug( 'Remove the element from the Collection by index (0).' );
  myDict.removeByIndex( 0 );
  console.debug( myDict.getAllValues() );

  console.debug( 'Give an error now. \nAdd an item with an existing key:' );
  // UNCOMMENT FOR ERROR.
  // myDict.add('two', 'This is two AGAIN.');

  // ------------------------------------------------------------------------ //

  // LIST
  console.log( '// ------------------------------------------------------------------------ //' );
  console.log( 'LIST' );

  console.debug( 'Create a List of floats.' );
  const myList = new _List( 'float' );

  console.debug( 'Is the List empty?', myList.isEmpty );

  console.debug( 'Add some floats to the List.' );
  myList.add( 1.5 );
  myList.add( 34.98 );
  myList.add( 26.8888 );

  console.debug( 'Return true because it contains 26.8888', myList.contains( 26.8888 ) );
  console.debug( 'Return false because it does not contain 99.3', myList.contains( 99.3 ) );

  console.debug( 'Is the List empty?', myList.isEmpty );
  console.debug( myList.getAll() );

  console.debug( 'Get the second element of List by index.' );
  console.debug( myList.get( 1 ) );

  console.debug( 'Update the second element of the List by index with the correct type.' );
  myList.update( 1, 9.999 );
  console.debug( myList.get( 1 ) );
  console.debug( 'Update the second element of the List by index with the wrong type. \nThrow error. \n(uncoment next line).' );
  // Uncomment to throw error.
  // myList.update( 2, 79 );

  console.debug( 'Remove the first and last elements from the Collection.' );
  myList.removeFirst();
  myList.removeLast();
  console.debug( myList.getAll() );

  console.debug( 'Give an error now. \nAdd an integer: \n (uncomment next line)' );
  // UNCOMMENT FOR ERROR.
  // myList.add( 69 );

  console.log( '// ------------------------------------------------------------------------ //' );

  console.log( 'LIST' );

  console.debug( 'Create a List of boleans (test type safety of a primitive types).' );
  const myBooleanList = new _List( 'boolean' );

  console.debug( 'Add some boleans to the List.' );
  myBooleanList.add( true );
  myBooleanList.add( false );
  myBooleanList.add( true );
  console.debug( myBooleanList.getAll() );

  console.debug( 'Give an error now. \nAdd a **string** boolean: \n(uncomment the next line)' );
  // UNCOMMENT FOR ERROR.
  // myBooleanList.add( 'true' );

  console.log( '// ------------------------------------------------------------------------ //' );

  // ------------------------------------------------------------------------ //
};

try {
  if ( process.env !== undefined )
    module.exports = runTest;

} catch ( e ) {
  // continue;
}
