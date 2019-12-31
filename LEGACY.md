### Legacy API

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

```javascript
Postcode.validOutcode(outcode)
```
