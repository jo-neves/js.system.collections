/*
 * Copyright (c) 2019-2026 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

// const { List } = require( '../../dist/js.system.collections.js' );
const { List } = require( '../../index.js' );

describe( 'The List', function () {

  beforeAll( function () {
    global.myList = new List( 'float' );
  } );

  it( 'should add values', function () {
    expect( global.myList.isEmpty ).toBeTrue();
    global.myList.add( 1.5 );
    global.myList.add( 34.98 );
    global.myList.add( 26.8888 );

    expect( global.myList ).toBeDefined();
    expect( global.myList.length ).toBe( 3 );
    expect( global.myList.isEmpty ).toBeFalse();
  } );

  it( 'should check for values values', function () {
    expect( global.myList.contains( 26.8888 ) ).toBeTrue();
    expect( global.myList.contains( 99.3 ) ).toBeFalse();
  } );

  it( 'should get and find elements', function () {
    expect( global.myList.length ).toBe( 3 );
    global.myList.add( 29.65 );

    expect( global.myList.length ).toBe( 4 );

    expect( global.myList.get( 1 ) ).toBe( 34.98 );
    expect( global.myList.get( 23 ) ).toBeFalse();
  } );

  it( 'should update values', function () {
    global.myList.update( 1, 9.999 );
    expect( global.myList.get( 1 ) ).toBe( 9.999 );
  } );

  it( 'should NOT allow updates with the wrong type', function () {
    let error = false;

    try {
      global.myList.update( 1, 9 );

    } catch ( e ) {
      error = true;
    }

    expect( error ).toBeTrue();
  } );

  it( 'should NOT allow adding items with the wrong type', function () {
    let error = false;

    try {
      global.myList.add( true );

    } catch ( e ) {
      error = true;
    }

    expect( error ).toBeTrue();
  } );

  it( 'should remove items', function () {
    global.myList.removeFirst();
    global.myList.removeLast();

    expect( global.myList.length ).toBe( 2 );
  } );

  afterAll( function () {
    global.myList = null;
    global.myList = undefined;
  } );

} );

describe( 'The List edge cases', function () {

  it( 'should remove an item by index', function () {
    const list = new List( 'int' );
    list.add( 10 );
    list.add( 20 );
    list.add( 30 );

    list.remove( 1 );

    expect( list.length ).toBe( 2 );
    expect( list.getAll() ).toEqual( [10, 30] );
  } );

  it( 'should throw a proper type error, not a ReferenceError, on a type mismatch', function () {
    const list = new List( 'int' );
    let thrown = null;

    try {
      list.add( 'not an int' );

    } catch ( e ) {
      thrown = e;
    }

    expect( thrown ).not.toBeNull();
    expect( thrown instanceof ReferenceError ).toBeFalse();
    expect( thrown.message ).toContain( 'not from the same type' );
  } );

  it( 'should distinguish a stored falsy value from a missing index in get()', function () {
    const list = new List( 'int' );
    list.add( 0 );
    list.add( 5 );

    expect( list.get( 0 ) ).toBe( 0 );
    expect( list.get( 99 ) ).toBeFalse();
  } );

  it( 'should return false for .last on an empty list', function () {
    const list = new List( 'any' );
    expect( list.last ).toBeFalse();
  } );

} );
