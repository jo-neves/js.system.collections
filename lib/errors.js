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
    define( 'errors', [], factory );

  } else if ( typeof module === 'object' && module.exports ) {
    // CommonJS.
    module.exports['Errors'] = factory();

  } else {
    // Browser.
    root.Errors = factory();
  }
} )( typeof global !== 'undefined' ? global : this.window || this.global, function () {

  class Errors {
    static get existingKey() { throw new Error( 'An item with the same key has already been added.' ); };

    static get noTypeProvided() { throw new Error( 'No type provided on Collection instantiation.' ); };

    static get notInteger() { throw new Error( `The value is not an integer` ); };

    static wrongType( type ) { throw new Error( `The value is not from the same type as the List<${type}>` ); };

    static get codeEmpty() { return '&C-EMPTY'; };
  }

  return Errors;
} );
