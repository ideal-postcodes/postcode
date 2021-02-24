<h1 align="center">
  <img src="https://img.ideal-postcodes.co.uk/Postcode.js%20Logo@3x.png" alt="Postcode.js">
</h1>

> Validate & parse UK postcodes

![CI](https://github.com/ideal-postcodes/postcode/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/ideal-postcodes/postcode/branch/master/graph/badge.svg)](https://codecov.io/gh/ideal-postcodes/postcode)
[![Dependencies](https://david-dm.org/ideal-postcodes/postcode.svg)](https://david-dm.org/ideal-postcodes/postcode)
[![Release](https://github.com/ideal-postcodes/postcode/workflows/Release/badge.svg)](https://github.com/ideal-postcodes/postcode/actions)

[![Size](https://img.shields.io/bundlephobia/minzip/postcode.svg?style=flat)](https://bundlephobia.com/result?p=postcode)
[![Downloads](https://img.shields.io/npm/dm/postcode.svg)](https://www.npmjs.com/package/postcode)
[![Try postcode on RunKit](https://badge.runkitcdn.com/postcode.svg)](https://npm.runkit.com/postcode)

Utility methods for UK Postcodes, including validating the shape of a postcode, extracting postcode elements (like incodes, outcodes, areas and [more](#Definitions)).

Tested against ~1.7 million postcodes on ONSPD.

## Features

- [Check](#validate) whether a postcode conforms to the [correct format](https://en.wikipedia.org/wiki/Postcodes_in_the_United_Kingdom#Formatting)
- [Single purpose static methods](#static-methods)
- Tested against a list of ~1.7 million postcodes listed on ONS Postcode Directory
- [Extract](#parse) useful elements of a postcode like incode, outcode, sector
- Tree-shakeable
![Postcode Components](https://img.ideal-postcodes.co.uk/uk-postcode-components.gif)

## Links

- [GitHub Repository](https://github.com/ideal-postcodes/openapi)
- [API Documentation](https://postcodejs.ideal-postcodes.dev)
- [Try postcode.js on RunKit](https://npm.runkit.com/postcode)
- [Postcode element definitions](#definitions)
- [Notes](#notes)
- [NPM Package](https://www.npmjs.com/package/postcode)

## Guides

- [UK Postcode Format](https://ideal-postcodes.co.uk/guides/uk-postcode-format). An overview of the UK postcode format and its constituent parts
- [Postcode Validation](https://ideal-postcodes.co.uk/guides/postcode-validation). An overview of the many approaches to postcode validation and the tradeoffs

## Getting Started

### Installation

```bash
npm install postcode
```

### Validate

```javascript
import { isValid } from "postcode";

isValid("AA1 1AB"); // => true
```

### Parse

Pass a string to `parse`. This will return a valid or invalid postcode instance which can be easily destructured.

#### Valid Postcode

`ValidPostcode` type definition

```javascript
import { parse } from "postcode";

const {
  postcode,    // => "SW1A 2AA"
  outcode,     // => "SW1A"
  incode,      // => "2AA"
  area,        // => "SW"
  district,    // => "SW1"
  unit,        // => "AA"
  sector,      // => "SW1A 2"
  subDistrict, // => "SW1A"
  valid,       // => true
} = parse("Sw1A     2aa");
```

#### Invalid Postcode

`InvalidPostcode` type definition

```javascript
const {
  postcode,    // => null
  outcode,     // => null
  incode,      // => null
  area,        // => null
  district,    // => null
  unit,        // => null
  sector,      // => null
  subDistrict, // => null
  valid,       // => false
} = parse("    Oh no, ):   ");
```

#### Type Guard

The TypeScript compiler can infer if you have a valid postcode type from `parse` by checking the `valid` attribute

```javascript
import { parse } from "postcode";

const postcode = parse("SW1A 2AA");

if (postcode.valid) {
  // `postcode` adheres to the `ValidPostcode` interface
  processString(postcode.outcode.toLowerCase()); // TypeScript compiler knows `outcode` to be a string
  processString(postcode.subDistrict.toLowerCase()); // And it will throw errors on common gotchas (e.g. subdistrict can be `null` on a valid postcode)
} else {
  // `postcode` adheres to the `InvalidPostcode` interface
  processInvalidPostcode(postcode);
}
```

#### Valid Postcode Object

| Postcode | .outcode | .incode | .area | .district | .subDistrict | .sector | .unit |
|----------|----------|---------|-------|-----------|--------------|---------|-------|
| AA9A 9AA | AA9A     | 9AA     | AA    | AA9       | AA9A         | AA9A 9  | AA    |
| A9A 9AA  | A9A      | 9AA     | A     | A9        | A9A          | A9A 9   | AA    |
| A9 9AA   | A9       | 9AA     | A     | A9        | `null`       | A9 9    | AA    |
| A99 9AA  | A99      | 9AA     | A     | A99       | `null`       | A99 9   | AA    |
| AA9 9AA  | AA9      | 9AA     | AA    | AA9       | `null`       | AA9 9   | AA    |
| AA99 9AA | AA99     | 9AA     | AA    | AA99      | `null`       | AA99 9  | AA    |

### Exported Methods

If you're just after a single value, you can import a single method.


#### Validation

```javascript
isValid("Sw1A 2aa"); // => true
```

#### Formatting

```javascript
import {
  toNormalised,
  toOutcode,
  toIncode,
  toArea,
  toDistrict,
  toSubDistrict,
  toSector,
  toUnit,
} from "postcode";

toNormalised("Sw1A 2aa");  // => "SW1A 2AA"
toOutcode("Sw1A 2aa");     // => "SW1A"
toIncode("Sw1A 2aa");      // => "2AA"
toArea("Sw1A 2aa");        // => "AA"
toDistrict("Sw1A 2aa");    // => "SW1"
toSubDistrict("Sw1A 2aa"); // => "SW1A"
toSector("Sw1A 2aa");      // => "SW1A 2"
toUnit("Sw1A 2aa");        // => "AA"
```

#### Fix

`fix` Attempts to correct and clean up a postcode without validating by replacing commonly misplaced characters (e.g. mixing up `0` and `"O"`, `1` and `"I"`). This method will also uppercase and fix spacing. The original input is returned if it cannot be reliably fixed.

```javascript
fix("SWIA 2AA") => "SW1A 2AA" // Corrects I to 1
fix("SW1A 21A") => "SW1A 2IA" // Corrects 1 to I
fix("SW1A OAA") => "SW1A 0AA" // Corrects O to 0
fix("SW1A 20A") => "SW1A 2OA" // Corrects 0 to O

// Other effects
fix(" SW1A  2AO") => "SW1A 2AO" // Properly spaces
fix("SW1A 2A0") => "SW1A 2AO" // 0 is coerced into "0"
```

Aims to be used in conjunction with parse to make postcode entry more forgiving:

```javascript
const { inward } = parse(fix("SW1A 2A0")); // inward = "2AO"
```

If the input is not deemed fixable, the original string will be returned

```javascript
fix("12a") => "12a"
```

#### Extract & Replace

`match`. Retrieve valid postcodes in a body of text

```javascript
const matches = match("The PM and her no.2 live at SW1A2aa and SW1A 2AB"); // => ["SW1A2aa", "SW1A 2AB"]

// Perform transformations like normalisation using `.map` and `toNormalised`
matches.map(toNormalised); // => ["SW1A 2AA", "SW1A 2AB"]
matches.map(toOutcode); // => ["SW1A", "SW1A"]

// No matches yields empty array
match("Some London outward codes are SW1A, NW1 and E1"); // => []
```

`replace`. Replace postcodes in a body of text, returning the updated corpus and any matching postcodes

```javascript
const { match, result } = replace("The PM and her no.2 live at SW1A2AA and SW1A 2AB");
// => match: ["SW1A2AA", "SW1A 2AB"]
// => result: "The PM and her no.2 live at  and "

// Add custom replacement
replace("The PM lives at SW1A 2AA", "Downing Street");
// => { match: ["SW1A 2AA"], result: "The PM lives at Downing Street" };

// No match
replace("Some London outward codes are SW1A, NW1 and E1");
// => { match: [], result: "Some London outward codes are SW1A, NW1 and E1" }
```

## Version 5.0.0

5.0.0 brings changes which allows for better treeshaking and interopability with ES Modules. It also deprecates legacy class based APIs in favour of single purpose methods.

### Breaking Changes

- `postcode` no longer exports a class. Legacy `new Postcode()` functionality has been removed. Methods attached to `Postcode` are all available as named exports.
- `postcode` no longer uses default exports. All exports are named. E.g.
```javascript
// In <= 4.0.0
import Postcode from "postcode";
Postcode.parse("SW1A 2AA");

// In >= 5.0.0
import { parse } from "postcode";
parse("SW1A 2AA");
```

In many cases, migration can be achieved by changing `import Postcode from "postcode"` to `import * as Postcode from "postcode"`, however this gives up treeshaking advantages.

### New Features

- `postcode` now exports a ES Module build
- Exports regular expressions
- `match` accepts a string and returns all valid postcodes
- `replace` accepts a string and replaces valid postcodes with an optional second argument. Default replacement text is empty string `""`

## Definitions

[See the postcode format guide](https://ideal-postcodes.co.uk/guides/uk-postcode-format/) for a glossary of postcode component terms.

## Notes

Postcodes cannot be validated just with a regular expression (however complex). True postcode validation requires having a full list of postcodes to check against. Relying on a regex will produce false postives/negatives.

[See the postcode validation guide](https://ideal-postcodes.co.uk/guides/postcode-validation) for an overview of the approaches and tradeoffs associated with postcode validation.

## Testing

```bash
npm test
```

## License

MIT

Contains Ordnance Survey Data © Crown Copyright & Database Right
