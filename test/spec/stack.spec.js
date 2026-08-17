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

const { Stack } = require( '../../dist/js.system.collections.js' );

describe( 'The Stack', function () {

  beforeAll( function () {
    global.myStack = new Stack();
  } );

  it( 'push multiple values', function () {
    global.myStack.push( '1' );
    global.myStack.push( '2' );
    global.myStack.push( '3' );
    expect( global.myStack ).toBeDefined();
    expect( global.myStack.length ).toEqual( 3 );
    expect( global.myStack.peekAll().length ).toEqual( 3 );
  } );

  it( 'peek the most recent element', function () {
    expect( global.myStack.peek() ).toBeDefined();
    expect( global.myStack.peek() ).toEqual( '3' );
    // peek() should not remove the element.
    expect( global.myStack.length ).toEqual( 3 );
  } );

  it( 'pop the most recent element', function () {
    const mostRecentElem = global.myStack.pop();
    expect( mostRecentElem ).toEqual( '3' );

    expect( global.myStack.length ).toEqual( 2 );
    expect( global.myStack.peekAll().length ).toEqual( 2 );
    expect( global.myStack.peek() ).toEqual( '2' );
  } );

  it( 'should return the empty code when peeking/popping an empty stack', function () {
    const emptyStack = new Stack();
    expect( emptyStack.peek() ).toEqual( '&C-EMPTY' );
    expect( emptyStack.pop() ).toEqual( '&C-EMPTY' );
  } );

  afterAll( function () {
    global.myStack = null;
    global.myStack = undefined;
  } );

} );
