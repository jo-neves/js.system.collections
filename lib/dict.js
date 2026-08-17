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
    define( 'Dict', ['CollectionBase', 'errors'], factory );

  } else if ( typeof module === 'object' && module.exports ) {
    // CommonJS (Node.js).
    const lib = require( './js.system.collections' );
    module.exports['Dict'] = factory( lib['CollectionBase'], lib['Errors'] );

  } else {
    // Browser.
    root.Dict = factory( root.CollectionBase, root.Errors );
  }
} )( typeof global !== 'undefined' ? global : this.window || this.global, function ( CollectionBase, Errors ) {

  class Dict extends CollectionBase {
    /**
     * Optimized dictionary of key-value pairs.
     *
     * @param { number } initialSize
     * Optional.
     * Integer representing the initial size of the dictionary.
     * Minimum and defualt is 32.
     */
    constructor( initialSize ) {
      super( true, 'any' );

      this.clearSafeIfNeed = false;
      this.____currentLength = 0;
      this.____prime = 7;

      if ( initialSize === undefined ) {
        initialSize = this.defaultSize;
      }

      if ( !Number.isInteger( initialSize ) ) {
        throw new Error( Errors.notInteger );

      } else if ( !initialSize || initialSize < this.defaultSize ) {
        this.____currentSize = this.defaultSize;

      } else if ( initialSize % 2 !== 0 ) {
        this.____currentSize = initialSize + 1;

      } else {
        this.____currentSize = initialSize;
      }
    }

    get defaultSize() {
      return 32;
    }

    get count() {
      return this.____currentLength;
    }

    /**
     * Returns an array with all the dictionary's values.
     * O(n)
     *
     * @returns { any[] }
     */
    getAllValues() {
      let allValues = [];

      this.forEachValue( ( value ) => {
        if ( !value ) {
          return;
        }

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

        if ( !item ) {
          return;
        }

        allKeys.push( item[0] );
      } );

      return allKeys;
    }

    /**
     * Returns the current hashed key of an item or false if not found.
     * ~O(1)
     *
     * @param { number | string } key
     *
     * @returns { any | undefined } The value or undefined.
     */
    getHashedKey( key ) {
      const hashedIndexVal = this.getIndexVal( key );

      if ( !hashedIndexVal ) {
        return undefined;
      }

      return hashedIndexVal[0];
    }

    /**
     * Returns the value by key (volatile) or false if not found.
     * ~O(1)
     *
     * @param { number | string } key
     *
     * @returns { any | undefined } The value or undefined.
     */
    getValue( key ) {
      const hashedIndexVal = this.getIndexVal( key );

      if ( !hashedIndexVal ) {
        return undefined;
      }

      return hashedIndexVal[1];
    }

    /**
     * ~O(1)
     *
     * @param { number | string } key
     *
     * @returns { bool }
     */
    containsKey( key ) {
      return this.getIndexVal( key ) !== undefined;
    }

    /**
     * ~O(1)
     *
     * @param { number | string } key
     *
     * @returns { [number, any] | undefined } [index, value]
     */
    getIndexVal( key ) {
      // Keys are compared by their string identity (5 and '5' are the same
      // key), consistent with how DictionaryObj's plain-object storage
      // already behaves and with how ____normalizeKey hashes them.
      const stringKey = String( key );
      const normalizedKey = this.____normalizeKey( key );
      let hashedKey = this.____hashKey( normalizedKey );
      let currentDictKey = this.____keyAt( hashedKey );

      if ( currentDictKey === undefined ) {
        return undefined;
      }

      if ( currentDictKey === stringKey ) {
        return [hashedKey, this.elements[hashedKey][1]];
      }

      // Bounded by ____currentSize: a slot can only ever be revisited once
      // every full cycle, and if a key is absent from a table with no
      // untouched (undefined) slot left, no probe would otherwise terminate.
      for ( let i = 0; i < this.____currentSize; ++i ) {
        hashedKey = this.____doubleHashKey( normalizedKey, i );
        currentDictKey = this.____keyAt( hashedKey );

        if ( currentDictKey === stringKey ) {
          return [hashedKey, this.elements[hashedKey][1]];

        } else if ( currentDictKey === undefined ) {
          return undefined;
        }
      }

      return undefined;
    }

    /**
     * O(1), worst case O(n)
     *
     * @param { string | number } key
     * @param { any } value
     *
     * @returns { number | false } The new index or false.
     */
    add( key, value ) {
      if ( this.____currentLength === this.____currentSize ) {
        this.____currentSize *= 2;
        this.____rehashTable();
      }

      const newHashedKey = this.____generateNewHashedIndex( key );

      if ( newHashedKey === null ) {
        return false;
      }

      this.____set( newHashedKey, key, value );
      ++this.____currentLength;
      return newHashedKey;
    }

    /**
     * Removes an item from the Dictionary with the provided key.
     * O(1), worst case O(n)
     *
     * @param { string | number } key
     *
     * @return { number | false } The index or false.
     */
    remove( key ) {
      const hashedIndex = this.getHashedKey( key );

      if ( this.__isNullUndefinedOrFalse( hashedIndex ) ) {
        return false;
      }

      if ( this.____currentLength === this.____currentSize / 4 ) {
        this.____currentSize /= 2;
        this.____rehashTable();
      }

      this.____setAsRemoved( this.getHashedKey( key ) );
      --this.____currentLength;
      return hashedIndex;
    }

    /**
     * Updates an item in the Dictionary with the provided key.
     * ~O(1)
     *
     * @param { string | number } key
     * @param { any } newValue
     *
     * @return { bool }
     */
    update( key, newValue ) {
      const hashedIndex = this.getHashedKey( key );

      if ( this.__isNullUndefinedOrFalse( hashedIndex ) ) {
        return false;
      }

      this.____set( hashedIndex, key, newValue );
      return hashedIndex;
    }

    /**
     * O(n)
     *
     * @param {any} Callback
     */
    forEachValue( Callback ) {
      this.__forEach( ( item ) => {

        if ( !item ) {
          return item;
        }

        Callback( item[1] );
      } );
    }

    ____set( index, key, value ) {
      this.elements[index] = [key, value];
    }

    ____setAsRemoved( index ) {
      this.elements[index] = false;
    }

    ____isEmptyHashSlot( hashedKey ) {
      // elem is set to false when removed.
      return this.__isNullUndefinedOrFalse( this.elements[hashedKey] );
    }

    ____keyAt( index ) {
      const item = this.elements[index];
      return item ? String( item[0] ) : item;
    }

    /**
     * Normalizes the key based on its string representation, so that a
     * numeric key (e.g. 5) hashes identically to its string form ('5') -
     * keeping key identity consistent with ____keyAt()'s string comparison.
     *
     * @param { number | string } key
     *
     * @returns { number | false }
     */
    ____normalizeKey( key ) {
      if ( typeof ( key ) !== 'number' && typeof ( key ) !== 'string' ) {
        return false;
      }

      const stringKey = String( key );
      let normalizedKey = 0;

      for ( let i = 0; i < stringKey.length; ++i ) {
        normalizedKey = this.__combineNumbers( normalizedKey, stringKey.charCodeAt( i ) );
      }

      return normalizedKey;
    }

    /**
     * ~O(1)
     *
     * @param { string | number } key
     */
    ____generateNewHashedIndex( key ) {
      const normalizedKey = this.____normalizeKey( key );

      if ( normalizedKey === false ) {
        return null;
      }

      let hashedKey = this.____hashKey( normalizedKey );

      if ( this.____isEmptyHashSlot( hashedKey ) ) {
        return hashedKey;
      }

      // add() always resizes before this runs, guaranteeing a free slot
      // exists; the bound is a safety net against an unbounded probe loop.
      for ( let i = 0; i < this.____currentSize; ++i ) {
        hashedKey = this.____doubleHashKey( normalizedKey, i );

        if ( this.____isEmptyHashSlot( hashedKey ) ) {
          return hashedKey;
        }
      }

      return null;
    }

    /**
     *
     * @param { number } normalizedKey
     */
    ____hashKey( normalizedKey ) {
      return normalizedKey % this.____currentSize;
    }

    /**
     * (private)
     *
     * ____currentSize is always a power of two (it only ever doubles or
     * halves), so the probe step must be odd to be coprime with it -
     * otherwise the double-hashing probe sequence only cycles through a
     * subset of the table's slots and can loop forever even when free
     * slots exist elsewhere.
     *
     * @param { number } normalizedKey
     */
    ____hashKeyWithPrime( normalizedKey ) {
      return ( this.____prime - ( normalizedKey % this.____prime ) ) | 1;
    }

    /**
     * (private)
     *
     * To avoid many collisions.
     *
     * @param { number } normalizedKey
     * @param { number } probeIndex
     */
    ____doubleHashKey( normalizedKey, probeIndex ) {
      return (
        this.____hashKey( normalizedKey ) +
        ( probeIndex * this.____hashKeyWithPrime( normalizedKey ) )
      ) % this.____currentSize;
    }

    /**
     * (private)
     *
     * O(n) | O(2n)
     */
    ____rehashTable() {
      const hashtableBK = this.elements;

      if ( this.clearSafeIfNeed ) {
        this.clearSafe();

      } else {
        this.clear();
      }

      this.____currentLength = 0;

      let thisKey;
      let hashedKey;

      for ( let i = 0; i < hashtableBK.length; ++i ) {
        if ( !hashtableBK[i] ) {
          continue;
        }

        thisKey = hashtableBK[i][0];
        hashedKey = this.____generateNewHashedIndex( thisKey );

        this.____set( hashedKey, thisKey, hashtableBK[i][1] );
        ++this.____currentLength;
      }
    }
  }

  return Dict;
} );
