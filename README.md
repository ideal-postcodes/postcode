<h1 align="center">
  <img src="https://img.ideal-postcodes.co.uk/Postcode.js%20Logo@3x.png" alt="Postcode.js">
</h1>

> Validate & parse UK postcodes

[![CircleCI](https://circleci.com/gh/ideal-postcodes/postcode.svg?style=svg)](https://circleci.com/gh/ideal-postcodes/postcode)
[![Coverage Status](https://coveralls.io/repos/github/ideal-postcodes/postcode/badge.svg?branch=master)](https://coveralls.io/github/ideal-postcodes/postcode?branch=master) 
![Dependencies](https://img.shields.io/david/ideal-postcodes/postcode.svg?style=flat)
![Size](https://img.shields.io/bundlephobia/min/postcode.svg?style=flat)
![Downloads](https://img.shields.io/npm/dm/postcode.svg)
[![Try postcode on RunKit](https://badge.runkitcdn.com/postcode.svg)](https://npm.runkit.com/postcode)

Utility methods for UK Postcodes, including validating the shape of a postcode, extracting postcode elements (like incodes, outcodes, areas and [more](#Definitions)).

Tested against ~1.7 million postcodes on ONSPD.

## Features

- [Check](#Validate) whether a postcode conforms to the [correct format](https://en.wikipedia.org/wiki/Postcodes_in_the_United_Kingdom#Formatting)
- [Extract](#Extract) useful elements of a postcode like incode, outcode, sector
- [Single purpose static methods](#Static Methods)
- Tested against a list of ~1.7 million postcodes listed on ONS Postcode Directory

## Links

- [API Documentation](https://ideal-postcodes.github.io/postcode/)
- [Try postcode.js on RunKit](https://npm.runkit.com/postcode)
- [Postcode element definitions](#Definitions)
- [Caveat on postcode validation](#Note on Postcode Validation)

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
Postcode.isValid("AA1 1AB"); # => true
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

### Older API

Below documents the old validation API, which continues to be supported.

Create an instance of Postcode to perform utility methods, like so:

```javascript
const Postcode = require("postcode");

const postcode = new Postcode("ec1v9lb");
```

Perform simple validations, parsing and normalisation

```javascript
postcode.valid()        // => true
postcode.normalise()    // => "EC1V 9LB"

postcode.outcode()      // => "EC1V"
postcode.incode()       // => "9LB"
postcode.area()         // => "EC"
postcode.district()     // => "EC1"
postcode.subDistrict()  // => "EC1V"
postcode.sector()       // => "EC1V 9"
postcode.unit()         // => "LB"
```

### Method Overview

| Postcode | .outcode() | .incode() | .area() | .district() | .subDistrict() | .sector() | .unit() |
|----------|------------|-----------|---------|-------------|----------------|-----------|---------|
| AA9A 9AA | AA9A       | 9AA       | AA      | AA9         | AA9A           | AA9A 9    | AA      |
| A9A 9AA  | A9A        | 9AA       | A       | A9          | A9A            | A9A 9     | AA      |
| A9 9AA   | A9         | 9AA       | A       | A9          | null           | A9 9      | AA      |
| A99 9AA  | A99        | 9AA       | A       | A99         | null           | A99 9     | AA      |
| AA9 9AA  | AA9        | 9AA       | AA      | AA9         | null           | AA9 9     | AA      |
| AA99 9AA | AA99       | 9AA       | AA      | AA99        | null           | AA99 9    | AA      |

### Misc. Class Methods include

```
Postcode.validOutcode(outcode)
```

## Definitions

### Outcode

The outward code is the part of the postcode before the single space in the middle. It is between two and four characters long. A few outward codes are non-geographic, not divulging where mail is to be sent. Examples of outward codes include "L1", "W1A", "RH1", "RH10" or "SE1P".

### Incode

The inward part is the part of the postcode after the single space in the middle. It is three characters long. The inward code assists in the delivery of post within a postal district. Examples of inward codes include "0NY", "7GZ", "7HF", or "8JQ".

### Area

The postcode area is part of the outward code. The postcode area is between one and two characters long and is all letters. Examples of postcode areas include "L" for Liverpool, "RH" for Redhill and "EH" Edinburgh. A postal area may cover a wide area, for example "RH" covers north Sussex, (which has little to do with Redhill historically apart from the railway links), and "BT" (Belfast) covers the whole of Northern Ireland.

### District

The district code is part of the outward code. It is between two and four characters long. It does not include the trailing letter found in some outcodes. Examples of district codes include "L1", "W1", "RH1", "RH10" or "SE1".

### Sub-District

The sub-district code is part of the outward code. It is often not present, only existing in particularly high density London districts. It is between three and four characters long. It does include the trailing letter omitted from the district. Examples of sub-district codes include "W1A", "EC1A", "NW1W", "E1W" or "SE1P".

Note: for outcodes not ending with a letter, `subDistrict` will return `null`. For example:

```js
new Postcode("SW1A 1AA").subDistrict()  // => SW1A
new Postcode("E1W 1LD").subDistrict()   // => E1W
new Postcode("PO16 7GZ").subDistrict()  // => null
new Postcode("B5 5NY").subDistrict()    // => null
```

### Sector

The postcode sector is made up of the postcode district, the single space, and the first character of the inward code. It is between four and six characters long (including the single space). Examples of postcode sectors include "SW1W 0", "PO16 7", "GU16 7", or "L1 8", "CV1 4".

### Unit

The postcode unit is two characters added to the end of the postcode sector. Each postcode unit generally represents a street, part of a street, a single address, a group of properties, a single property, a sub-section of the property, an individual organisation or (for instance Driver and Vehicle Licensing Agency) a subsection of the organisation. The level of discrimination is often based on the amount of mail received by the premises or business. Examples of postcode units include "NY" (from "SW1W 0NY"), "GZ" (from "PO16 7GZ"), "HF" (from "GU16 7HF"), or "JQ" (from "L1 8JQ").

## Note on Postcode Validation

Postcodes cannot be validated just with a regular expression. Proper postcode validation requires having a full list of postcodes to check against. Relying on a regex will produce false postives/negatives.

A complete list of Postcodes can be obtained from the ONS Postcode Directory, which is updated every 3 months.

## Testing

```bash
npm test
```

## License

MIT

Contains Ordnance Survey Data © Crown Copyright & Database Right
