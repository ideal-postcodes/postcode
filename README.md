[![Build Status](https://travis-ci.org/cblanc/postcode.js.png)](https://travis-ci.org/cblanc/postcode.js) 
[![Dependency Status](https://gemnasium.com/cblanc/postcode.js.png)](https://gemnasium.com/cblanc/postcode.js)

# Postcodes

Utility methods for UK Postcodes.

Included is a test suite that tests against all postcodes listed in the Ordnance Survey's postcode dataset as of January 2014. 

## Getting Started

Install with `npm install postcode`

Create an instance of Postcode to perform utility methods, like so

```javascript
var Postcode = require("postcode");

var postcode = new Postcode("po167gz");
```

Perform simple validations, parsing and normalisation

```javascript
postcode.valid()      // => True

postcode.normalise()  // => "PO16 7GZ"

postcode.outcode()    // => "PO16"

postcode.incode()     // => "7GZ"

postcode.area()				// => "PO"

postcode.sector()			// => "PO16 7"

postcode.unit()				// => "GZ"
```

Misc. Class Methods include

```
Postcode.validOutcode(outcode)
```

## Definitions

### Outcode (#outcode)

The outward code is the part of the postcode before the single space in the middle. It is between two and four characters long. A few outward codes are non-geographic, not divulging where mail is to be sent. Examples of outward codes include "L1", "W1A", "RH1", "RH10" or "SE1P".

### Inward Code (#inward)

The inward part is the part of the postcode after the single space in the middle. It is three characters long. The inward code assists in the delivery of post within a postal district. Examples of inward codes include "0NY", "7GZ", "7HF", or "8JQ".

### Postcode Area (#area)

The postcode area is part of the outward code. The postcode area is between one and two characters long and is all letters. Examples of postcode areas include "L" for Liverpool, "RH" for Redhill and "EH" Edinburgh. A postal area may cover a wide area, for example "RH" covers north Sussex, (which has little to do with Redhill historically apart from the railway links), and "BT" (Belfast) covers the whole of Northern Ireland.

### Postcode Sector (#sector)

The postcode sector is made up of the postcode district, the single space, and the first character of the inward code. It is between four and six characters long (including the single space). Examples of postcode sectors include "SW1W 0", "PO16 7", "GU16 7", or "L1 8", "CV1 4".

### Postcode Unit (#unit)

The postcode unit is two characters added to the end of the postcode sector. Each postcode unit generally represents a street, part of a street, a single address, a group of properties, a single property, a sub-section of the property, an individual organisation or (for instance Driver and Vehicle Licensing Agency) a subsection of the organisation. The level of discrimination is often based on the amount of mail received by the premises or business. Examples of postcode units include "SW1W 0NY", "PO16 7GZ", "GU16 7HF", or "L1 8JQ".

Source: [Wikipedia](http://en.wikipedia.org/wiki/Postcodes_in_the_United_Kingdom#Formatting)

## Testing

```npm test```

## Note on Postcode Validation

Postcodes cannot be validated just with a regular expression. Proper postcode validation requires having a full list of postcodes to check against. Relying on a regex will produce false postives/negatives.

A complete list of Postcodes can be obtained from the ONS Postcode Directory, which is updated every 3 months.

## License

MIT

Contains Ordnance Survey Data © Crown Copyright & Database Right 2014