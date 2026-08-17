# Changelog

&nbsp;

#### v1.8.0 - 17/08/2026

- Shipped `Stack` as a public export (`index.js`, `dist/`), fixing its broken module wrapper (a double `require()`) and its `push`/`pop`/`peek`/`peekAll` methods, which referenced a non-existent `this.____elements` instead of `this.elements`.
- `Dict`: fixed numeric keys (e.g. `0`) being completely unreachable, and any numeric key becoming permanently unreachable after a resize (grow/shrink), because keys hashed differently as numbers vs. their string form used internally.
- `Dict`: fixed a possible infinite loop/hang in the double-hashing probe (the probe step could be even against a power-of-two table size, letting the probe cycle miss free slots); added bounded probing as a safety net.
- `Dict`: `remove()` no longer triggers a shrink/rehash when the key being removed doesn't exist.
- `Dict`: internal key/value storage switched from per-entry objects to `[key, value]` tuples, removing an `Object.keys()`/`Object.values()` allocation on every lookup, insert, remove and iteration.
- `List`: `remove( index )` was calling a non-existent method and always threw; `add()`/`update()` threw a `ReferenceError` instead of the documented type error on a type mismatch; `.last` returned `undefined` instead of `false` on an empty list; `.get( index )` returned `false` for legitimately-stored falsy values (e.g. `0`).
- `Dictionary`: `updateByIndex()` and `getByKey()` no longer swallow real errors behind a `try`/`catch` that was only masking a `ReferenceError`-class bug; `.lastValue` returns `false` (rather than throwing internally and relying on `catch`) on an empty `Dictionary`.
- `DictionaryObj`: `update()` on a non-existing key, and `remove()` on a non-existing key, no longer desync `.count` from the real number of entries; removed an implicit global variable leak in `forEachValue()`.
- Added regression tests for all of the above; re-enabled the previously fully-commented-out `Stack` spec.

&nbsp;

#### v1.7.3 11/12/2020

- Small improvement on the `Dict` hashing system.

&nbsp;

#### v1.7.2 10/12/2020

- Fix on the `Dict`, that reduces the probability of hash collisions on string keys that have the same letters, like palindromes for example.

&nbsp;

#### v1.7.1 - 06/09/2020

- Added more methods to the `DictionaryObj`.
- Added tests to the `DictionaryObj`.
- Multiple fixes to the `DictionaryObj`.

&nbsp;

#### v1.7.0 - 06/09/2020

- Added a new lightweight implementation of a dictionary, `DictionaryObj`.
- Small fix of bug that didn't made possible deletion and update of index 0.
    This was due to, in those methods, it was being checked if the searched
    return value was falsy (0 inclusive), instead of checking for undefined,
    null or false.

&nbsp;

#### v1.6.0 - 03/09/2020

- Added another implementation of a dictionary, `Dict`, with ~O(1) search instead of O(n).
- Multiple internal refactorings.
- Updated the API docs.

&nbsp;

#### v1.5.0 - 15/04/2020

- Added UMD compatibility support (AMD not tested).
- Added tests to the List and Dictionary.
- Multiple internal fixes (undefineds and exeptions) and refactorings.

&nbsp;

#### v1.4.0 - 06/04/2020

- Fix on the the method "updateByIndex" of the Dictionary.
- Added the method "removeByIndex( index )" to the Dictionary.
- Added the method "containsKey( key )" to the Dictionary.
- Small internal refactorings and fixes.

&nbsp;

#### v1.3.0 - 19/12/2019

- Added the getAllKeys() method.

&nbsp;

#### v1.2.0 - 6/05/2019

- Added the update(index, value) method to the List.
- Added the contains(value) method to the List.
- Multiple refactorings.

&nbsp;

#### v1.1.0 - 26/04/2019

- Fixed the Dictionary getByKey and findIndexOfKey methods according to the new benchmarks. Big performance improvement;
- Added the removeFirst() and removeLast() methods to the Collection class (common methods).

&nbsp;

#### v1.0.0 - 06/03/2019

- Remove from beta.

&nbsp;

#### v1.0.0-beta.3 - 06/03/2019

- Name change to publish on npm ("collections-js" -> "js.system.collections");
- Other fixes.

&nbsp;

#### v1.0.0-beta.2 - 06/03/2019

- Some fixes to make collections-js compatible for use on Node.js;
- Added some temporary tests.

&nbsp;

#### v1.0.0-beta.1 - 05/03/2019

- Migration from <https://github.com/joao-neves95/Exercises_Challenges_Courses/blob/master/JavaScript/Collections.js>
