# Postcode.js [![Build Status](https://travis-ci.org/ideal-postcodes/postcode.js.svg)](https://travis-ci.org/ideal-postcodes/postcode.js) [![Greenkeeper badge](https://badges.greenkeeper.io/ideal-postcodes/postcode.js.svg)](https://greenkeeper.io/)

Utility methods for UK Postcodes.

Included is a test suite that tests against all postcodes listed in the Ordnance Survey's postcode dataset as of January 2014.

## Getting Started

Install with `npm install postcode`

Create an instance of Postcode to perform utility methods, like so

```javascript
var Postcode = require("postcode");

var postcode = new Postcode("ec1v9lb");
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

Sources:

- https://en.wikipedia.org/wiki/Postcodes_in_the_United_Kingdom#Formatting
- https://en.wikipedia.org/wiki/London_postal_district#Numbered_divisions

## Testing

```npm test```

## Note on Postcode Validation

Postcodes cannot be validated just with a regular expression. Proper postcode validation requires having a full list of postcodes to check against. Relying on a regex will produce false postives/negatives.

A complete list of Postcodes can be obtained from the ONS Postcode Directory, which is updated every 3 months.

## License

MIT

Contains Ordnance Survey Data © Crown Copyright & Database Right 2014
