# Postcodes

Utility methods for UK Postcodes

## Getting Started

Install with `npm install postcode`

Create an instance of Postcode to perform utility methods, like so

```
var Postcode = require("postcode");

var postcode = new Postcode("id11qd");
```

Perform simple validations, parsing and normalisation

```
postcode.valid()      // => True
postcode.outcode()    // => "ID1"
postcode.incode()     // => "1QD"
postcode.normalise()  // => "ID1 1QD"
```

## Testing

```npm test```

## Note on Postcode Validation

Postcodes cannot be validated just using just a regular expression. Proper postcode validation requires having a full list of postcodes to check against. 

Please do not solely rely on a regex to check postcodes or you're bound to get false postives/negatives.

## License

MIT