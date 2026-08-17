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

const { Dictionary } = require( '../../dist/js.system.collections.js' );
// const { Dictionary } = require( '../../index.js' );

describe( 'The Dictionary', function () {

  beforeAll( function () {
    global.myDict = new Dictionary( true );
  } );

  it( 'should add values', function () {
    global.myDict.add( 'one', 'This is one.' );
    global.myDict.add( 'two', 'This is two.' );
    global.myDict.add( 'three', 'This is three.' );

    expect( global.myDict ).toBeDefined();
    expect( global.myDict.length ).toBe( 3 );
    expect( global.myDict.isEmpty ).toBeFalse();
  } );

  it( 'should find items by key and index', function () {
    const indexOfThree = global.myDict.findIndexOfKey( 'three' );
    expect( indexOfThree ).toBe( 2 );

    const itemThree = global.myDict.getByKey( 'three' );

    const itemFourValue = 'This id four.';
    global.myDict.add( 'four', itemFourValue );
    const itemThreeByIndex = global.myDict.getByIndex( 2 );
    expect( itemThreeByIndex ).toBeDefined();
    const itemFourByIndex = global.myDict.getByIndex( 3 );
    expect( itemFourByIndex ).toBeDefined();
    expect( itemFourByIndex ).toBe( itemFourValue );

    const allKeys = global.myDict.getAllKeys();
    expect( allKeys[2] ).toBe( 'three' );
    expect( allKeys.length ).toBe( 4 );
  } );

  it( 'should update item values', function () {
    const newTwoValue = 'This is two v2.';
    global.myDict.updateByIndex( 1, newTwoValue );
    expect( global.myDict.getByIndex( 1 ) ).toBe( newTwoValue );

    const newThreeValue = 'This is two v3.';
    global.myDict.updateByKey( 'two', newThreeValue );
    expect( global.myDict.getByKey( 'two' ) ).toBe( newThreeValue );
  } );

  it( 'should remove items', function () {
    global.myDict.removeFirst();
    global.myDict.removeLast();
    const allValues = global.myDict.getAllValues();
    expect( allValues.length ).toBe( 2 );
    expect( global.myDict.getAllKeys()[0] ).toBe( 'two' );

    global.myDict.removeByIndex( 0 );
    expect( global.myDict.getAllValues().length ).toBe( 1 );
  } );

  it( 'should NOT add items with an existing key', function () {
    let error = false;

    try {
      global.myDict.add( 'three', 'This is three AGAIN.' );

    } catch ( e ) {
      error = true;
    }

    expect( error ).toBeTrue();
  } );

  afterAll( function () {
    global.myDict = null;
    global.myDict = undefined;
  } );

} );

describe( 'The Dictionary edge cases', function () {

  it( 'should return false for .lastValue on an empty Dictionary', function () {
    const dict = new Dictionary();
    expect( dict.lastValue ).toBeFalse();
  } );

  it( 'should return false from updateByIndex() for an out-of-range index', function () {
    const dict = new Dictionary();
    dict.add( 'one', 1 );

    expect( dict.updateByIndex( 99, 'new value' ) ).toBeFalse();
  } );

} );
