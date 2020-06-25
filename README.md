<h1 align="center">
  <img src="https://img.ideal-postcodes.co.uk/Postcode.js%20Logo@3x.png" alt="Postcode.js">
</h1>

> Validate & parse UK postcodes

![CI](https://github.com/ideal-postcodes/postcode/workflows/CI/badge.svg)
[![codecov](https://codecov.io/gh/ideal-postcodes/postcode/branch/master/graph/badge.svg)](https://codecov.io/gh/ideal-postcodes/postcode)
[![Dependencies](https://david-dm.org/ideal-postcodes/postcode.svg)](https://david-dm.org/ideal-postcodes/postcode)
[![Size](https://img.shields.io/bundlephobia/min/postcode.svg?style=flat)](https://bundlephobia.com/result?p=postcode)
[![Downloads](https://img.shields.io/npm/dm/postcode.svg)](https://www.npmjs.com/package/postcode)
[![Release](https://github.com/ideal-postcodes/postcode/workflows/Release/badge.svg)](https://github.com/ideal-postcodes/postcode/actions)
[![Try postcode on RunKit](https://badge.runkitcdn.com/postcode.svg)](https://npm.runkit.com/postcode)

Utility methods for UK Postcodes, including validating the shape of a postcode, extracting postcode elements (like incodes, outcodes, areas and [more](#Definitions)).

Tested against ~1.7 million postcodes on ONSPD.

## Features

- [Check](#validate) whether a postcode conforms to the [correct format](https://en.wikipedia.org/wiki/Postcodes_in_the_United_Kingdom#Formatting)
- [Single purpose static methods](#static-methods)
- Tested against a list of ~1.7 million postcodes listed on ONS Postcode Directory
- [Extract](#parse) useful elements of a postcode like incode, outcode, sector
![Postcode Components](https://img.ideal-postcodes.co.uk/uk-postcode-components.gif)

## Links

- [GitHub Repository](https://github.com/ideal-postcodes/openapi)
- [API Documentation](https://postcodejs.ideal-postcodes.dev)
- [Try postcode.js on RunKit](https://npm.runkit.com/postcode)
- [Postcode element definitions](#definitions)
- [Caveat on postcode validation](#note-on-postcode-Validation)
- [NPM Package](https://www.npmjs.com/package/postcode)

## Guides

- [UK Postcode Format](https://ideal-postcodes.co.uk/guides/uk-postcode-format). An overview of the UK postcode format and its constituent parts
- [Postcode Validation](https://ideal-postcodes.co.uk/guides/postcode-validation). An overview of the many approaches to postcode validation and the tradeoffs

## Getting Started

### Installation

```bash
npm install postcode
```

### Wield

```javascript
import Postcode from "postcode";
```

### Validate

```javascript
Postcode.isValid("AA1 1AB"); // => true
```

### Parse

Pass a string to `Postcode.parse`. This will return a valid or invalid postcode instance which can be easily destructured.

#### Valid Postcode

```
const {
  normalised,  // => "SW1A 2AA"
  outcode,     // => "SW1A"
  incode,      // => "2AA"
  area,        // => "SW"
  district,    // => "SW1"
  unit,        // => "AA"
  sector,      // => "SW1A 2"
  subDistrict, // => "SW1A"
  valid,       // => true
} = Postcode.parse("Sw1A     2aa");
```

#### Invalid postcode

```
const {
  normalised,  // => null
  outcode,     // => null
  incode,      // => null
  area,        // => null
  district,    // => null
  unit,        // => null
  sector,      // => null
  subDistrict, // => null
  valid,       // => false
} = Postcode.parse("    Oh no, ):   ");
```

#### Accessor Overview

| Postcode | .outcode | .incode | .area | .district | .subDistrict | .sector | .unit |
|----------|----------|---------|-------|-----------|--------------|---------|-------|
| AA9A 9AA | AA9A     | 9AA     | AA    | AA9       | AA9A         | AA9A 9  | AA    |
| A9A 9AA  | A9A      | 9AA     | A     | A9        | A9A          | A9A 9   | AA    |
| A9 9AA   | A9       | 9AA     | A     | A9        | `null`       | A9 9    | AA    |
| A99 9AA  | A99      | 9AA     | A     | A99       | `null`       | A99 9   | AA    |
| AA9 9AA  | AA9      | 9AA     | AA    | AA9       | `null`       | AA9 9   | AA    |
| AA99 9AA | AA99     | 9AA     | AA    | AA99      | `null`       | AA99 9  | AA    |

### Static Methods

If you're just after a single value, you would be better served by calling a static method on `Postcode`.

```javascript
Postcode.isValid("Sw1A 2aa");      // => true

Postcode.toNormalised("Sw1A 2aa");  // => "SW1A 2AA"
Postcode.toOutcode("Sw1A 2aa");     // => "SW1A"
Postcode.toIncode("Sw1A 2aa");      // => "2AA"
Postcode.toArea("Sw1A 2aa");        // => "AA"
Postcode.toDistrict("Sw1A 2aa");    // => "SW1"
Postcode.toSubDistrict("Sw1A 2aa"); // => "SW1A"
Postcode.toSector("Sw1A 2aa");      // => "SW1A 2"
Postcode.toUnit("Sw1A 2aa");        // => "AA"
```

### Legacy API

The legacy object based API is documented in [LEGACY.md](LEGACY.md)

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
