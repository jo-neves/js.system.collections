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
    define( 'dictionary', ['collection', 'errors'], factory );

  } else if ( typeof module === 'object' && module.exports ) {
    // CommonJS (Node.js).
    const lib = require( './js.system.collections' );
    module.exports['Dictionary'] = factory( lib['Collection'], lib['Errors'] );

  } else {
    // Browser.
    root.Dictionary = factory( root.Collection, root.Errors );
  }
} )( typeof global !== 'undefined' ? global : this.window || this.global, function ( Collection, Errors ) {

  class Dictionary extends Collection {
    /**
     * Dictionary of key-value pairs.
     * In order to have array-like features, this dictionary implementation
     * is O(n), linear.
     * You are probably looking for Dict or DictionaryObj.
     *
     * @param { Boolean } uniqueKeys
     * Optional.
     * Whether the keys should be unique or not.
     * Update: I have no idea why I thought this was a good idea.
     * @default { false }
     */
    constructor( uniqueKeys = false ) {
      super( uniqueKeys, 'any' );
    }

    getAllValues() {
      let allValues = [];

      this.forEachValue( ( value ) => {
        allValues.push( value );
      } );

      return allValues;
    }

    /**
     * Returns an array with all the dictionary's keys.
     * O(n)
     *
     * @returns { any[] }
     */
    getAllKeys() {
      const allKeys = [];

      this.__forEach( ( item ) => {
        allKeys.push( Object.keys( item )[0] );
      } );

      return allKeys;
    }

    /**
     * Returns the last element of the Dictionary or false.
     * O(1)
     *
     * @returns { any }
     */
    get lastValue() {
      const last = this.__last;

      if ( last === undefined ) {
        return false;
      }

      return Object.values( last )[0];
    }

    /**
     * O(n)
     *
     * @param { any } key
     *
     * @returns { boolean }
     */
    containsKey( key ) {
      return this.findIndexOfKey( key ) !== false;
    }

    /**
     * O(n)
     *
     * @param { any } key
     * @param { any } value
     */
    add( key, value ) {
      if ( this.uniqueKeys ) {
        if ( this.containsKey( key ) ) {
          throw new Error( Errors.existingKey );
        }
      }

      this.____push( { [key]: value } );
    }

    /**
     * Removes an item from the Dictioary by index.
     * O(1)
     *
     * @param { number } index
     */
    removeByIndex( index ) {
      this.____splice( index );
      return true;
    }

    /**
     * Removes an item from the Dictionary with the provided key.
     * O(n)
     *
     * @param { any } key
     *
     * @return { bool }
     */
    remove( key ) {
      const index = this.findIndexOfKey( key );

      if ( index === false ) {
        return false;
      }

      this.____splice( index );
      return true;
    }

    /*
     * Updates an item in the Dictionary with the provided key.
     * O(n)
     *
     * @param { any } key
     * @param { any } newValue
     *
     * @return { bool }
     */
    updateByKey( key, newValue ) {
      const index = this.findIndexOfKey( key );

      if ( index === false ) {
        return false;
      }

      return this.updateByIndex( index, newValue );
    }

    /**
     * Updates an item in the Dictionary with the provided index.
     * O(1)
     *
     * @param { any } key
     * @param { any } newValue
     *
     * @returns { bool }
     */
    updateByIndex( idx, newValue ) {
      const item = this.elements[idx];

      if ( item === undefined || item === null ) {
        return false;
      }

      item[Object.keys( item )[0]] = newValue;
      return true;
    }

    /**
     * Get a value with its index. Returns an array with the values.
     * O(1)
     *
     * @param { number } index
     *
     * @returns { any | false }
     */
    getByIndex( index ) {
      const element = this.elements[index];

      if ( element === undefined || element === null ) {
        return false;
      }

      return Object.values( element )[0];
    }

    /**
     * Get a key with its index.
     * O(1)
     *
     * @param { number } index
     *
     * @returns { any | false }
     */
    getKeyByIndex( index ) {
      const item = this.elements[index];

      if ( item === undefined || item === null ) {
        return false;
      }

      return Object.keys( item )[0];
    }

    /**
     * Returns the value by key or false if not found.
     * O(n)
     *
     * @param { any } key
     *
     * @returns { any | false }
     */
    getByKey( key ) {
      const elementAndIndex = this.____getElementAndIndexByKey( key );

      if ( elementAndIndex === false ) {
        return false;
      }

      return Object.values( elementAndIndex[1] )[0];
    }

    /**
     * Returns the index of the provided key, or false if not found.
     * O(n)
     *
     * @param {any} key
     *
     * @returns { number | false }
     */
    findIndexOfKey( key ) {
      const elementAndIndex = this.____getElementAndIndexByKey( key );

      if ( elementAndIndex === false ) {
        return false;
      }

      return elementAndIndex[0];
    }

    /**
     * O(n)
     *
     * @param {any} Callback
     */
    forEachValue( Callback ) {
      this.__forEach( ( item ) => {
        Callback( Object.values( item )[0] );
      } );
    }

    /**
     * (private)
     * Returns an array with the index and the respective key-value pair object, or false in case it does not find the provided key.
     * O(n)
     *
     * [index<number>, keyValuePair<object>]
     *
     * @param { any } key
     *
     * @returns { Object | false }
     */
    ____getElementAndIndexByKey( key ) {
      let currKeyValPair;

      for ( let i = 0; i < this.elements.length; i++ ) {
        currKeyValPair = this.elements[i];

        if ( Object.keys( currKeyValPair )[0] === key ) {
          return [i, currKeyValPair];
        }
      }

      return false;
    }

  }

  return Dictionary;
} );
