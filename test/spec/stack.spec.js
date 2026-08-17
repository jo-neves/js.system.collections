/*
 * Copyright (c) 2019-2026 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
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
