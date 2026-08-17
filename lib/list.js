/*
 * Copyright (c) 2019-2026 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
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
