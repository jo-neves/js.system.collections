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
    define( 'Stack', ['CollectionBase', 'errors'], factory );

  } else if ( typeof module === 'object' && module.exports ) {
    // CommonJS.
    const lib = require( './js.system.collections' );
    module.exports['Stack'] = factory( lib['CollectionBase'], lib['Errors'] );

  } else {
    // Browser.
    root.Stack = factory( root.CollectionBase, root.Errors );
  }
} )( typeof global !== 'undefined' ? global : this.window || this.global, function ( CollectionBase, Errors ) {

  class Stack extends CollectionBase {

    constructor() {
      super();
    }

    /**
     * Sets the top element.
     *
     * @param {*} value
     * @memberof Stack
     */
    push( value ) {
      this.____push( value );
    }

    /**
     * Pops the most recent element and returns it (top).
     *
     * @param {*} value
     * @returns
     * @memberof Stack
     */
    pop() {
      if ( this.length === 0 ) {
        return Errors.codeEmpty;
      }

      return this.elements.pop();
    }

    /**
     * Returns the most recent element (top).
     *
     * @returns
     * @memberof Stack
     */
    peek() {
      if ( this.length === 0 ) {
        return Errors.codeEmpty;
      }

      return this.elements[this.length - 1];
    }

    /**
     * Returns all elements in an array.
     *
     * @returns
     * @memberof Stack
     */
    peekAll() {
      return this.elements;
    }

  }

  return Stack;
} );
