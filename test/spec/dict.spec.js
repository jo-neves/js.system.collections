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

const { Dict } = require( '../../dist/js.system.collections.js' );
// const { Dictionary } = require( '../../index.js' );

describe( 'The Dict', function () {

  beforeAll( function () {
    global.myDict = new Dict();
  } );

  it( 'should add values', function () {
    expect( global.myDict.add( 'one', 'This is one.' ) ).not.toBeFalse();
    expect( global.myDict.add( 'two', 'This is two.' ) ).not.toBeFalse();
    expect( global.myDict.add( 'three', 'This is three.' ) ).not.toBeFalse();

    expect( global.myDict ).toBeDefined();
    expect( global.myDict ).not.toBeFalse();
    expect( global.myDict.count ).toBe( 3 );
    expect( global.myDict.____currentLength ).toBe( 3 );
    expect( global.myDict.isEmpty ).toBeFalse();
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
    expect( global.myDict.____currentLength ).toBe( 4 );
    expect( global.myDict.____currentSize ).toBe( global.myDict.defaultSize );
  } );

  it( 'should update item values', function () {
    const newTwoValue = 'This is two v2.';
    expect( global.myDict.update( 'two', newTwoValue ) ).not.toBeFalse();

    const newTwoSearchedValue = global.myDict.getValue( 'two' );
    expect( newTwoSearchedValue ).toBeDefined();
    expect( newTwoSearchedValue ).toBe( newTwoValue );

    const newThreeValue = 'This is three v2.';
    expect( global.myDict.update( 'three', newThreeValue ) ).not.toBeFalse();
    const newThreeSearchedValue = global.myDict.getValue( 'three' );
    expect( newThreeSearchedValue ).toBeDefined();
    expect( newThreeSearchedValue ).toBe( newThreeValue );
  } );

  it( 'should remove items', function () {
    global.myDict.remove( 'two' );

    const allValues = global.myDict.getAllValues();
    expect( allValues.length ).toBe( 3 );
    expect( global.myDict.count ).toBe( 3 );
    expect( global.myDict.____currentLength ).toBe( 3 );

    const itemTwoVal = global.myDict.getValue( 'two' );
    expect( itemTwoVal ).toBeUndefined();

  } );

  it( 'should clear all values', function () {
    global.myDict.clear();

    const allValues = global.myDict.getAllValues();
    expect( allValues.length ).toBe( 0 );
    expect( global.myDict.count ).toBe( 0 );
    expect( global.myDict.____currentLength ).toBe( 0 );
  } );

  const addBulk = () => {
    const numOfItems = 42;

    expect( global.myDict.count ).toBe( 0 );

    for ( let i = 0; i < numOfItems; ++i ) {
      expect(
        global.myDict.add(
          'ITEM_' + i.toString(),
          i + ( Math.random() * ( ( Math.random() * 10 ) + ( Math.random() * 10 ) ) )
        )
      ).not.toBeFalse();
    }

    const allValues = global.myDict.getAllValues();

    expect( allValues.length ).toBe( numOfItems );
    expect( global.myDict.____currentLength ).toBe( numOfItems );
    expect( global.myDict.____currentSize ).toBe( global.myDict.defaultSize * 2 );
  };

  it( 'should add a lot of items and rehash with no problems', function () {
    addBulk();
  } );

  it( 'should clear all values safely', function () {
    global.myDict.clearSafe();
    const allValues = global.myDict.getAllValues();
    expect( allValues.length ).toBe( 0 );
    expect( global.myDict.count ).toBe( 0 );
    expect( global.myDict.____currentLength ).toBe( 0 );
  } );

  it( 'should remove all items by key and rehash with no problems', function () {
    const numOfItems = 42;
    addBulk();

    for ( let i = 0; i < numOfItems; ++i ) {
      expect( global.myDict.remove( 'ITEM_' + i.toString() ) ).not.toBeFalse();
    }

    const allValues = global.myDict.getAllValues();
    expect( allValues.length ).toBe( 0 );
    expect( global.myDict.____currentLength ).toBe( 0 );
    expect( global.myDict.____currentSize ).toBe( 2 );
  } );

  afterAll( function () {
    global.myDict = null;
    global.myDict = undefined;
  } );

} );

describe( 'The Dict edge cases', function () {

  it( 'should support the numeric key 0 and the empty string key', function () {
    const dict = new Dict();

    expect( dict.add( 0, 'zero-value' ) ).not.toBeFalse();
    expect( dict.add( '', 'empty-key-value' ) ).not.toBeFalse();

    expect( dict.getValue( 0 ) ).toBe( 'zero-value' );
    expect( dict.getValue( '' ) ).toBe( 'empty-key-value' );
  } );

  it( 'should keep numeric keys reachable after a growth rehash', function () {
    const dict = new Dict();
    const numOfItems = 40; // > defaultSize (32), forces a rehash.

    for ( let i = 0; i < numOfItems; ++i ) {
      dict.add( i, 'val' + i );
    }

    for ( let i = 0; i < numOfItems; ++i ) {
      expect( dict.getValue( i ) ).toBe( 'val' + i );
    }
  } );

  it( 'should not corrupt the count when removing a non-existing key', function () {
    const dict = new Dict();
    dict.add( 'one', 1 );

    expect( dict.remove( 'does-not-exist' ) ).toBeFalse();
    expect( dict.count ).toBe( 1 );
    expect( dict.getValue( 'one' ) ).toBe( 1 );
  } );

  it( 'should not hang when looking up a key absent from a heavily churned table', function () {
    const dict = new Dict();

    for ( let i = 0; i < 100; ++i ) {
      dict.add( 'k' + i, i );
      if ( i % 2 === 0 ) {
        dict.remove( 'k' + i );
      }
    }

    expect( dict.getValue( 'does-not-exist' ) ).toBeUndefined();
  } );

} );
