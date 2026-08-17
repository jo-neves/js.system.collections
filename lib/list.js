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
    define( 'list', ['collection', 'errors'], factory );

  } else if ( typeof module === 'object' && module.exports ) {
    // CommonJS.
    const lib = require( './js.system.collections' );
    module.exports['List'] = factory( lib['Collection'], lib['Errors'] );

  } else {
    // Browser.
    root.List = factory( root.Collection, root.Errors );
  }
} )( typeof global !== 'undefined' ? global : this.window || this.global, function ( Collection, Errors ) {

  /**
   * @typedef { List }
   * @extends Collection
   * */
  class List extends Collection {
    /**
     *
     * The Type of the list.
     * @param {String} type
     * ('string' | 'number' | 'int' | 'float' | 'boolean' | 'any')
     * Default: 'any'.
     */
    constructor( type ) {
      super( false, type );
    }

    /**
     * Returns the last element of the List or false.
     *
     * @returns { any }
     */
    get last() {
      const last = this.__last;
      return last === undefined ? false : last;
    }

    /**
     * Add a new item to the List<T>.
     * @param { any } value
     */
    add( value ) {
      const canPush = this.__isCorrectType( value );

      if ( canPush === false ) {
        throw Errors.wrongType( this.type );
      }

      return this.____push( value );
    }

    update( index, value ) {
      const canPush = this.__isCorrectType( value );

      if ( canPush === false ) {
        throw Errors.wrongType( this.type );
      }

      this.elements[index] = value;
    }

    /**
     * Returns true if the List contains the value, or false if it does not.
     *
     * @param {any} value
     */
    contains( value ) {
      return this.elements.includes( value );
    }

    /**
     * Remove an new item from the List<T> by index.
     * @param {Number} index
     */
    remove( index ) {
      this.____splice( index );
    }

    forEach( Callback ) {
      this.__forEach( ( item ) => {
        Callback( item );
      } );
    }
  }

  return List;
} );
