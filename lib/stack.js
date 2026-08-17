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
