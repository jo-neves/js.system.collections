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
    define( 'CollectionBase', ['errors'], factory );

  } else if ( typeof module === 'object' && module.exports ) {
    // CommonJS.
    module.exports['CollectionBase'] = factory( require( './js.system.collections' )['Errors'] );

  } else {
    // Browser.
    root.CollectionBase = factory( root.Errors );
  }
} )( typeof global !== 'undefined' ? global : this.window || this.global, function ( Errors ) {

  class CollectionBase {

    constructor( uniqueKeys = false, type = 'any' ) {
      this.elements = [];
      this.uniqueKeys = uniqueKeys;

      if ( !type ) throw Errors.noTypeProvided;
      this.type = type;
    }

    get length() {
      return this.elements.length;
    }

    get isEmpty() {
      return this.length === 0;
    }

    /**
     * Sets the array storage value to null and creates a new one.
     * ~O(1)
     *
     */
    clear() {
      this.elements = [];

      if ( this.____currentLength !== undefined ) {
        this.____currentLength = 0;
      }
    }

    /**
     * Pops every element of the array storage,
     * maintaining the same underling array store.
     * O(n)
     *
     */
    clearSafe() {
      while ( this.elements.length ) {
        this.elements.pop();
      }

      if ( this.____currentLength !== undefined ) {
        this.____currentLength = 0;
      }
    }

    /**
     * (private)
     */
    __forEach( Callback ) {
      for ( let i = 0; i < this.elements.length; ++i ) {
        Callback( this.elements[i], i );
      }
    }

    /**
     * (private)
     * No type safety. For private class use.
     * @param {Type} value
     */
    ____push( value ) {
      this.elements.push( value );
    }

    /**
     * (private)
     * @param {any} value
     */
    __isCorrectType( value ) {
      switch ( this.type ) {
        case 'any':
          return true;
        case 'int':
          return this.__isInt( value );
        case 'float':
          return this.__isFloat( value );
        // Used for primitive types.
        // 'string' | 'number' | 'boolean'
        default:
          return typeof value === this.type;
      }
    }

    /**
     * (private)
     * @param {Number} value
     */
    __isInt( value ) {
      if ( typeof value !== 'number' ) {
        return false;
      }

      return value % 1 === 0;
    }

    /**
     * (private)
     * @param {Number} value
     */
    __isFloat( value ) {
      if ( typeof value !== 'number' ) {
        return false;
      }

      return value % 1 !== 0;
    }

    __isNullOrUndefined( value ) {
      return value === null || value === undefined;
    }

    __isNullUndefinedOrFalse( value ) {
      return this.__isNullOrUndefined( value ) || value === false;
    }

    __combineNumbers( left, right ) {
      let rightLength = 1;

      while ( rightLength <= right ) {
        rightLength *= 10;
      }

      return left * rightLength + right;
    }

  }

  return CollectionBase;
} );
