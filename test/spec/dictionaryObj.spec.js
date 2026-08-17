/*
 * Copyright (c) 2019-2026 João Pedro Martins Neves - All Rights Reserved.
 *
 * js.system.collections is licensed under the MIT license,
 * located in the root of this project, under the name "LICENSE.md".
 *
 */

const { DictionaryObj } = require( '../../dist/js.system.collections.js' );
// const { Dictionary } = require( '../../index.js' );

describe( 'The DictionaryObj', function () {

  beforeAll( function () {
    global.myDict = new DictionaryObj();
  } );

  it( 'should add values', function () {
    expect( global.myDict.add( 'one', 'This is one.' ) ).not.toBeFalse();
    expect( global.myDict.add( 'two', 'This is two.' ) ).not.toBeFalse();
    expect( global.myDict.add( 'three', 'This is three.' ) ).not.toBeFalse();

    expect( global.myDict ).toBeDefined();
    expect( global.myDict ).not.toBeFalse();
    expect( global.myDict.count ).toBe( 3 );
  } );

  it( 'should find items by key', function () {

    const itemThreeRealValue = 'This is three.';
    const valOfThree = global.myDict.getValue( 'three' );
    expect( valOfThree ).toBe( itemThreeRealValue );

    const itemFourRealValue = 'This id four.';
    global.myDict.add( 'four', itemFourRealValue );

    expect( global.myDict.containsKey( 'four' ) ).toBeTrue();
    expect( global.myDict.containsKey( '$$$$$€€€€€€$$$$$' ) ).toBeFalse();

    const itemThreeVal = global.myDict.getValue( 'three' );
    expect( itemThreeVal ).toBeDefined();
    expect( itemThreeVal ).toBe( itemThreeRealValue );

    const itemFourVal = global.myDict.getValue( 'four' );
    expect( itemFourVal ).toBeDefined();
    expect( itemFourVal ).toBe( itemFourRealValue );

    const itemOneRealValue = 'This is one.';
    const itemOneVal = global.myDict.getValue( 'one' );
    expect( itemOneVal ).toBeDefined();
    expect( itemOneVal ).toBe( itemOneRealValue );

    const allKeys = global.myDict.getAllKeys();
    expect( allKeys.length ).toBe( 4 );
    expect( global.myDict.count ).toBe( 4 );
  } );

  it( 'should update item values', function () {
    const newTwoValue = 'This is two v2.';
    global.myDict.update( 'two', newTwoValue );

    const newTwoSearchedValue = global.myDict.getValue( 'two' );
    expect( newTwoSearchedValue ).toBeDefined();
    expect( newTwoSearchedValue ).toBe( newTwoValue );

    const newThreeValue = 'This is three v2.';
    global.myDict.update( 'three', newThreeValue );
    const newThreeSearchedValue = global.myDict.getValue( 'three' );
    expect( newThreeSearchedValue ).toBeDefined();
    expect( newThreeSearchedValue ).toBe( newThreeValue );
  } );

  it( 'should remove items', function () {
    global.myDict.remove( 'two' );

    const allValues = global.myDict.getAllValues();

    expect( allValues.length ).toBe( 3 );
    expect( global.myDict.count ).toBe( 3 );

    const itemTwoVal = global.myDict.getValue( 'two' );
    expect( itemTwoVal ).toBeUndefined();

  } );

  it( 'should clear all values', function () {
    global.myDict.clear();

    const allValues = global.myDict.getAllValues();
    expect( allValues.length ).toBe( 0 );
    expect( global.myDict.count ).toBe( 0 );
  } );

  const addBulk = () => {
    const numOfItems = 42;

    expect( global.myDict.count ).toBe( 0 );

    for ( let i = 0; i < numOfItems; ++i ) {
      global.myDict.add(
        'ITEM_' + i.toString(),
        i + ( Math.random() * ( ( Math.random() * 10 ) + ( Math.random() * 10 ) ) )
      );
    }

    const allValues = global.myDict.getAllValues();

    expect( allValues.length ).toBe( numOfItems );
    expect( global.myDict.count ).toBe( numOfItems );
  };

  it( 'should add a lot of items', function () {
    addBulk();
  } );

  it( 'should clear all values safely', function () {
    global.myDict.clear();
    const allValues = global.myDict.getAllValues();
    expect( allValues.length ).toBe( 0 );
    expect( global.myDict.count ).toBe( 0 );
  } );

  it( 'should remove all items by key', function () {
    const numOfItems = 42;
    addBulk();

    for ( let i = 0; i < numOfItems; ++i ) {
      expect( global.myDict.remove( 'ITEM_' + i.toString() ) ).not.toBeFalse();
    }

    const allValues = global.myDict.getAllValues();
    expect( allValues.length ).toBe( 0 );
    expect( global.myDict.count ).toBe( 0 );
  } );

  afterAll( function () {
    global.myDict = null;
    global.myDict = undefined;
  } );

} );

describe( 'The DictionaryObj edge cases', function () {

  it( 'should treat update() on a non-existing key as an insert and count it once', function () {
    const dict = new DictionaryObj();
    dict.add( 'a', 1 );

    dict.update( 'b', 2 );

    expect( dict.count ).toBe( 2 );
    expect( dict.getValue( 'b' ) ).toBe( 2 );
  } );

  it( 'should not corrupt the count when removing a non-existing key', function () {
    const dict = new DictionaryObj();
    dict.add( 'a', 1 );

    expect( dict.remove( 'does-not-exist' ) ).toBeFalse();
    expect( dict.count ).toBe( 1 );
    expect( dict.getValue( 'a' ) ).toBe( 1 );
  } );

} );
