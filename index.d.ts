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

export type ListType = 'string' | 'number' | 'int' | 'float' | 'boolean' | 'any';

/**
 * A typed, array-backed list.
 * `type` is only checked at runtime; the generic parameter is for
 * compile-time convenience and isn't itself validated against `type`.
 */
export class List<T = any> {
  constructor( type?: ListType );

  readonly length: number;
  readonly isEmpty: boolean;

  /** Returns the last element of the List, or `false` if it's empty. */
  readonly last: T | false;

  /** Sets the array storage value to null and creates a new one. ~O(1) */
  clear(): void;
  /** Pops every element of the array storage, maintaining the same underlying array store. O(n) */
  clearSafe(): void;
  /** Get all elements from the List. */
  getAll(): T[];
  /** Get an item from the List by index, or `false` if out of range. */
  get( index: number ): T | false;
  /** Add a new item to the List. Throws if `value` doesn't match `type`. */
  add( value: T ): void;
  /** Update an item by index. Throws if `value` doesn't match `type`. */
  update( index: number, value: T ): void;
  /** Returns true if the List contains the value, or false if it does not. */
  contains( value: T ): boolean;
  /** Remove an item from the List by index. */
  remove( index: number ): void;
  removeFirst(): void;
  removeLast(): void;
  forEach( callback: ( item: T, index: number ) => void ): void;
}

/**
 * Dictionary of key-value pairs, array-backed. O(n), linear.
 * You are probably looking for Dict or DictionaryObj.
 */
export class Dictionary<TKey = any, TValue = any> {
  constructor( uniqueKeys?: boolean );

  readonly length: number;
  readonly isEmpty: boolean;

  /** Returns the last element of the Dictionary, or `false` if it's empty. O(1) */
  readonly lastValue: TValue | false;

  clear(): void;
  clearSafe(): void;
  /** Get all key-value pair objects from the Dictionary. */
  getAll(): Array<Record<string, TValue>>;
  /** Get an item from the Dictionary by index: an object containing the key and value ({ key: value }), or `false` if out of range. */
  get( index: number ): Record<string, TValue> | false;
  /** Returns an array with all the dictionary's values. O(n) */
  getAllValues(): TValue[];
  /** Returns an array with all the dictionary's keys. O(n) */
  getAllKeys(): TKey[];
  /** O(n) */
  containsKey( key: TKey ): boolean;
  /** O(n). Throws if `uniqueKeys` is set and `key` already exists. */
  add( key: TKey, value: TValue ): void;
  removeFirst(): void;
  removeLast(): void;
  /** Removes an item from the Dictionary by index. O(1) */
  removeByIndex( index: number ): boolean;
  /** Removes an item from the Dictionary with the provided key. O(n) */
  remove( key: TKey ): boolean;
  /** Updates an item in the Dictionary with the provided key. O(n) */
  updateByKey( key: TKey, newValue: TValue ): boolean;
  /** Updates an item in the Dictionary with the provided index. O(1) */
  updateByIndex( index: number, newValue: TValue ): boolean;
  /** Get a value by its index, or `false` if out of range. O(1) */
  getByIndex( index: number ): TValue | false;
  /** Get a key by its index, or `false` if out of range. O(1) */
  getKeyByIndex( index: number ): TKey | false;
  /** Returns the value by key, or `false` if not found. O(n) */
  getByKey( key: TKey ): TValue | false;
  /** Returns the index of the provided key, or `false` if not found. O(n) */
  findIndexOfKey( key: TKey ): number | false;
  /** O(n) */
  forEachValue( callback: ( value: TValue ) => void ): void;
}

/**
 * Hash-table dictionary of key-value pairs, with ~O(1) search.
 * Only `string` and `number` keys are supported.
 */
export class Dict<TKey extends string | number = string, TValue = any> {
  /**
   * @param initialSize Optional. Integer representing the initial size of
   * the dictionary. Minimum and default is 32.
   */
  constructor( initialSize?: number );

  readonly length: number;
  readonly isEmpty: boolean;
  /** Minimum and default table size (32). */
  readonly defaultSize: number;
  /** The count of actual items. O(1) */
  readonly count: number;

  clear(): void;
  clearSafe(): void;
  /** Returns an array with all the dictionary's values. O(n) */
  getAllValues(): TValue[];
  /** Returns an array with all the dictionary's keys. O(n) */
  getAllKeys(): TKey[];
  /** Returns the current hashed index of an item, or `undefined` if not found. ~O(1) */
  getHashedKey( key: TKey ): number | undefined;
  /** Returns the value by key, or `undefined` if not found. ~O(1) */
  getValue( key: TKey ): TValue | undefined;
  /** ~O(1) */
  containsKey( key: TKey ): boolean;
  /** ~O(1) */
  getIndexVal( key: TKey ): [number, TValue] | undefined;
  /** O(1), worst case O(n). Returns the new index, or `false` on failure. */
  add( key: TKey, value: TValue ): number | false;
  /** Removes an item with the provided key. O(1), worst case O(n). Returns the index, or `false` if not found. */
  remove( key: TKey ): number | false;
  /** Updates an item with the provided key. ~O(1). Returns the index, or `false` if not found. */
  update( key: TKey, newValue: TValue ): number | false;
  /** O(n) */
  forEachValue( callback: ( value: TValue ) => void ): void;
}

/**
 * A lightweight dictionary implementation backed by a plain object.
 * Time complexity is dependent on the vendor's JS engine.
 */
export class DictionaryObj<TValue = any> {
  constructor();

  /** The count of actual items. */
  readonly count: number;

  clear(): void;
  get( key: string | number ): TValue | undefined;
  /** Same as `.get( key )`. */
  getValue( key: string | number ): TValue | undefined;
  containsKey( key: string | number ): boolean;
  getAllKeys(): string[];
  getAllValues(): TValue[];
  add( key: string | number, value: TValue ): void;
  /** Updates the key if it exists, otherwise inserts it. */
  update( key: string | number, value: TValue ): void;
  /** Returns `true` if the key was removed, `false` if it didn't exist. */
  remove( key: string | number ): boolean;
  forEachValue( callback: ( value: TValue ) => void ): void;
}

/** A simple LIFO (last-in, first-out) stack. */
export class Stack<T = any> {
  constructor();

  readonly length: number;
  readonly isEmpty: boolean;

  clear(): void;
  clearSafe(): void;
  /** Sets the top element. */
  push( value: T ): void;
  /** Pops the most recent element and returns it (top), or `'&C-EMPTY'` if the stack is empty. */
  pop(): T | '&C-EMPTY';
  /** Returns the most recent element (top) without removing it, or `'&C-EMPTY'` if the stack is empty. */
  peek(): T | '&C-EMPTY';
  /** Returns all elements in an array, bottom to top. */
  peekAll(): T[];
}
