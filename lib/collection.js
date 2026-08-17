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

( function ( root, factory ) {
  if ( typeof define === 'function' && define.amd ) {
    // AMD.
    define( 'collection', ['CollectionBase', 'errors'], factory );

  } else if ( typeof module === 'object' && module.exports ) {
    // CommonJS.
    const lib = require( './js.system.collections' );
    module.exports['Collection'] = factory( lib['CollectionBase'], lib['Errors'] );

  } else {
    // Browser.
    root.Collection = factory( root.CollectionBase, root.Errors );
  }
} )( typeof global !== 'undefined' ? global : this.window || this.global, function ( CollectionBase, Errors ) {

  class Collection extends CollectionBase {
    constructor( uniqueKeys = false, type = 'any' ) {
      super( uniqueKeys, type );
    }

    /**
     * (private)
     */
    get __last() {
      return this.elements[this.length - 1];
    }

    /**
     * Get all elements from the Collection.
     * For Dictionary is best to use .getAllValues()
     *
     * Returns elements[]
     */
    getAll() {
      return this.elements;
    }

    /**
     * Get an item from the Collection by index.
     * In of beeing a Dictionary it will retun an object containing the key and value ( { key: value } )
     *
     * @param { number | false } index
     */
    get( index ) {
      const element = this.elements[index];
      return element === undefined ? false : element;
    }

    removeFirst() {
      this.____splice( 0 );
    }

    removeLast() {
      this.____splice( this.length - 1 );
    }

    /**
      * (private)
      * No checks. For private class use.
      * @param {Number} index
      */
    ____splice( index, quantity = 1 ) {
      this.elements.splice( index, quantity );
    }
  }

  return Collection;
} );
