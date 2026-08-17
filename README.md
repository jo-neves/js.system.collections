# js.system.collections

[![npm](https://img.shields.io/npm/v/js.system.collections.svg)](https://www.npmjs.com/package/js.system.collections)
[![LICENSE](https://img.shields.io/npm/l/js.system.collections.svg)](https://github.com/jo-neves/js.system.collections/blob/master/LICENSE.md)

Vanilla JavaScript ES collections inspired by .NET for Node.js and the browser.

&nbsp;

## Getting Started

### Install with NPM

```js
npm i js.system.collections
```

or

```js
npm install js.system.collections
```

### Import on the browser

```js
<script src="path-to-dist-folder/js.system.collections.min.js"></script>
```

or

```js
<script src="https://cdn.jsdelivr.net/gh/joao-neves95/js.system.collections/dist/js.system.collections.min.js"></script>
```

or

```js
<script src="https://raw.githubusercontent.com/joao-neves95/js.system.collections/master/dist/js.system.collections.min.js"></script>
```

#### Use from the browser (using the `window` object)

```js
const myDict = new Dictionary( true );
```

#### Use with CommonJS (For environments that support `module.exports`, like Node.js)

```js
// Pointing to node_modules/ (Node.js), or dist/
const { Dictionary, List } = require( 'js.system.collections' );

const myList = new List( 'any' );
const myStringList = new List( 'string' );
```

#### Use with TypeScript

Type declarations are bundled (`index.d.ts`, referenced via `package.json`'s `types` field) — no `@types/` package needed. `List`, `Dict`, `Dictionary`, `DictionaryObj` and `Stack` are all generic:

```ts
import { List, Dict } from 'js.system.collections';

const myList = new List<number>( 'int' );
myList.add( 42 );

const myDict = new Dict<string, number>();
myDict.add( 'answer', 42 );
```

&nbsp;

## API <a name="api-index"></a>

1. [List](#list)
2. [Dict](#dict)
3. [Dictionary](#dictionary)
4. [DictionaryObj](#dictionaryObj)
5. [Stack](#stack)

[^API](#api-index)

#### **List( type )** <a name="list"></a>

```js
  /**
  * @param {String} type The Type of the list.
  * ('string' | 'number' | 'int' | 'float' | 'boolean' | 'any')
  * Default: 'any'.
  */
  List(type)
```

- **length**

  ```js
  .length
  ```

- **clear()**

  ```js
  /**
   * Sets the array storage value to null and creates a new one.
   * ~O(1)
   */
  .clear()
  ```

- **clearSafe()**

  ```js
  /**
   * Pops every element of the array storage,
   * maintaining the same underling array store.
   * O(n)
   */
  .clearSafe()
  ```

- **last**

    ```js
    /**
        * Returns the last element of the List or false.
        *
        * @returns { any }
        */
    .last
    ```

- **getAll()**

    ```js
    /**
     * Get all elements from the Collection.
     * For Dictionary is best to use .getAllValues()
     *
     * Returns elements[]
     */
    .getAll()
    ```

- **get( index )**

    ```js
    /**
     * Get an item from the Collection by index.
     * In of beeing a Dictionary it will retun an object containing the key and value ( { key: value } )
     *
     * @param { number | false } index
     */
    .get( index )
    ```

- **contains( value )**

    ```js
    /**
     * Returns true if the List contains at least one value,
     * or false if it does not.
     *
     * @param {any} value
     */
    .contains( value )
    ```

- **add( value )**

    ```js
    /**
      * Add a new item to the List<T>.
      * @param { any } value
      */
    .add( value )
    ```

- **update( index, value )**

    ```js
    /**
      * Update an item by index.
      *
      * @param { any } value
      */
    .update( index, value )
    ```

- **remove( index )**

    ```js
    /**
     * Remove an new item from the List<T> by index.
     *
     * @param { Number } index
     */
    .remove( index )
    ```

- **removeFirst()**

  ```js
  .removeFirst()
  ```

- **removeLast()**

  ```js
  .removeLast()
  ```

- **forEach( index )**

  ```js
  /**
   * Remove an new item from the List<T> by index.
   *
   * @param { Function } Callback f(item)
   */
  .forEach( Callback )
  ```

[^API](#api-index)

#### **Dict( initialSize )** <a name="dict"></a>

```js
/**
 * Optimized dictionary of key-value pairs.
 *
 * @param { number } initialSize
 * Optional.
 * Integer representing the initial size of the dictionary.
 * Minimum and defualt is 32.
 */
```

- **count**

  ```js
  /**
   * The count of actual items.
   * O(1)
   */
  .count
  ```

- **length**

  ```js
  /**
   * The current length of the underlying hashtable.
   * O(1)
   */
  .length
  ```

- **clear()**

  ```js
  /**
   * Sets the array storage value to null and creates a new one.
   * ~O(1)
   */
  .clear()
  ```

- **clearSafe()**

  ```js
  /**
   * Pops every element of the array storage,
   * maintaining the same underling array store.
   * O(n)
   */
  .clearSafe()
  ```

- **getAllValues()**

  ```js
  /**
   * Returns an array with all the dictionary's values.
   * O(n)
   *
   * @returns { any[] }
   */
  .getAllValues()
  ```

- **getAllKeys()**

  ```js
  /**
   * Returns an array with all the dictionary's keys.
   * O(n)
   *
   * @returns { any[] }
   */
  .getAllKeys()
  ```

- **getHashedKey( key )**

  ```js
  /**
   * Returns the current hashed key of an item or false if not found.
   * ~O(1)
   *
   * @param { number | string } key
   *
   * @returns { any | undefined } The value or undefined.
   */
  .getHashedKey( key )
  ```

- **getValue( key )**

  ```js
  /**
   * Returns the value by key (volatile) or false if not found.
   * ~O(1)
   *
   * @param { number | string } key
   *
   * @returns { any | undefined } The value or undefined.
   */
  .getValue( key )
  ```

- **getIndexVal( key )**

  ```js
  /**
   * ~O(1)
   *
   * @param { number | string } key
   *
   * @returns { [number, any] | undefined } [index, value]
   */
  .getIndexVal( key )
  ```

- **containsKey( key )**

  ```js
  /**
   * ~O(1)
   *
   * @param { number | string } key
   *
   * @returns { bool }
   */
  .containsKey( key )
  ```

- **add( key, value )**

  ```js
  /**
   * O(1), worst case O(n)
   *
   * @param { string | number } key
   * @param { any } value
   *
   * @returns { number | false } The new index or false.
   */
  .add( key, value )
  ```

- **remove( key )**

  ```js
  /**
   * Removes an item from the Dictionary with the provided key.
   * O(1), worst case O(n)
   *
   * @param { string | number } key
   *
   * @return { number | false } The index or false.
   */
  .remove( key )
  ```

- **update( key, newValue )**

  ```js
  /**
   * Updates an item in the Dictionary with the provided key.
   * ~O(1)
   *
   * @param { string | number } key
   * @param { any } newValue
   *
   * @return { bool }
   */
  .update( key, newValue )
  ```

- **forEachValue( Callback )**

  ```js
  /**
   * O(n)
   *
   * @param { Function } Callback (value)
   */
  .forEachValue( Callback )
  ```

[^API](#api-index)

#### **Dictionary( uniqueKeys = false )** <a name="dictionary"></a>

```js
/**
 * Dictionary of key-value pairs.
 * In order to have array-like features, this dictionary implementation
 * is O(n), linear.
 * You are probably looking for Dict or DictionaryObj.
 *
 * @param { Boolean } uniqueKeys
 * Optional.
 * Whether the keys should be unique or not.
 * @default { false }
 */
```

- **length**

  ```js
  .length
  ```

- **clear()**

  ```js
  /**
   * Sets the array storage value to null and creates a new one.
   * ~O(1)
   */
  .clear()
  ```

- **clearSafe()**

  ```js
  /**
   * Pops every element of the array storage,
   * maintaining the same underling array store.
   * O(n)
   */
  .clearSafe()
  ```

- **getAllValues()**

  ```js
  .getAllValues()
  ```

- **getAllKeys()**

  ```js
  /**
   * Returns an array with all the dictionary's keys.
   * O(n)
   *
   * @returns { any[] }
   */
  .getAllKeys()
  ```

- **lastValue**

  ```js
  /**
   * Returns the last element of the Dictionary or false.
   * O(1)
   *
   * @returns { any[] }
   */
  .lastValue
  ```

- **containsKey( key )**

  ```js
  /**
   * O(n)
   *
   * @param { any } key
   *
   * @returns { boolean }
   */
  .containsKey( key )
  ```

- **getByIndex( index )**

  ```js
  /**
   * Get a value with its index. Returns an array with the values.
   * O(1)
   *
   * @param { number } index
   *
   * @returns { any | false }
   */
  .getByIndex( index )
  ```

- **getKeyByIndex( index )**

  ```js
  /**
   * Get a key by its index.
   * O(1)
   *
   * @param { number } index
   *
   * @returns { any | false }
   */
  .getKeyByIndex( index )
  ```

- **getByKey( key )**

  ```js
  /**
   * Returns the value by key or false if not found.
   * O(n)
   *
   * @param { any } key
   *
   * @returns { any | false }
   */
  .getByKey( key )
  ```

- **findIndexOfKey( key )**

  ```js
  /**
   * Returns the index of the provided key, or false if not found.
   * O(n)
   *
   * @param {any} key
   *
   * @returns { number | false }
   */
  .findIndexOfKey( key )
  ```

- **add( key, value )**

  ```js
  /**
   * O(n)
   *
   * @param { any } key
   * @param { any } value
   */
  .add( key, value )
  ```

- **removeFirst()**

  ```js
  .removeFirst()
  ```

- **removeLast()**

  ```js
  .removeLast()
  ```

- **removeByIndex( index )**

  ```js
  /**
   * Removes an item from the Dictioary by index.
   * O(1)
   *
   * @param { number } index
   */
  .removeByIndex( index )
  ```

- **remove( key )**

  ```js
  /**
   * Removes an item from the Dictionary with the provided key.
   * O(n)
   *
   * @param { any } key
   *
   * @return { bool }
   */
  .remove( key )
  ```

- **updateByKey( key, newValue )**

  ```js
  /**
   * Updates an item in the Dictionary with the provided key.
   * O(n)
   *
   * @param { any } key
   * @param { any } newValue
   *
   * @return { bool }
   */
  .updateByKey( key, newValue )
  ```

- **updateByIndex( idx, newValue )**

  ```js
  /**
   * Updates an item in the Dictionary with the provided index.
   * O(1)
   *
   * @param { any } key
   * @param { any } newValue
   *
   * @returns { bool }
   */
  .updateByIndex( idx, newValue )
  ```

- **forEachValue( Callback )**

  ```js
  /**
   * O(n)
   *
   * @param { Function } Callback (value)
   */
  .forEachValue( Callback )
  ```

[^API](#api-index)

#### DictionaryObj <a name="dictionaryObj"></a>

```js
/**
 * A lightweight implementation of a dictionary, based on an object.
 * The time complexity is dependent on the vendor's browser engine.
```

- **count**

  ```js
  .count
  ```

- **clear()**

  ```js
  .clear()
  ```

- **get( key )**

  ```js
  .get( key )
  ```

- **getValue( key )**

  ```js
  /**
   * Same as .get( key ).
   */
  .get( key )
  ```

- **containsKey( key )**

  ```js
  .containsKey( key )
  ```

- **getAllKeys()**

  ```js
  .getAllKeys()
  ```

- **getAllValues()**

  ```js
  .getAllValues()
  ```

- **add( key, value )**

  ```js
  .add( key, value )
  ```

- **update( key, value )**

  ```js
  .update( key, value )
  ```

- **remove( key )**

  ```js
  /**
   * Removes an item from the DictionaryObj with the provided key.
   *
   * @param { any } key
   *
   * @returns { boolean }
   */
  .remove( key )
  ```

- **forEachValue( Callback )**

  ```js
  .forEachValue( Callback )
  ```

[^API](#api-index)

#### Stack <a name="stack"></a>

```js
/**
 * A simple LIFO (last-in, first-out) stack.
 */
```

- **length**

  ```js
  .length
  ```

- **isEmpty**

  ```js
  .isEmpty
  ```

- **clear()**

  ```js
  /**
   * Sets the array storage value to null and creates a new one.
   * ~O(1)
   */
  .clear()
  ```

- **clearSafe()**

  ```js
  /**
   * Pops every element of the array storage,
   * maintaining the same underling array store.
   * O(n)
   */
  .clearSafe()
  ```

- **push( value )**

  ```js
  /**
   * Sets the top element.
   *
   * @param { any } value
   */
  .push( value )
  ```

- **pop()**

  ```js
  /**
   * Pops the most recent element and returns it (top),
   * or Errors.codeEmpty ('&C-EMPTY') if the stack is empty.
   *
   * @returns { any }
   */
  .pop()
  ```

- **peek()**

  ```js
  /**
   * Returns the most recent element (top) without removing it,
   * or Errors.codeEmpty ('&C-EMPTY') if the stack is empty.
   *
   * @returns { any }
   */
  .peek()
  ```

- **peekAll()**

  ```js
  /**
   * Returns all elements in an array, bottom to top.
   *
   * @returns { any[] }
   */
  .peekAll()
  ```

[^API](#api-index)
