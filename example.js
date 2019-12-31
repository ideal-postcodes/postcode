const { parse, isValid, toOutcode } = require("postcode");

// Quickly sanity check postcode
console.log(isValid("SW1A 2AA"));

// Extract outward code
console.log(toOutcode("SW1A 2AA"));

// Parse postcode to access different parts
const postcode = parse("Sw1a 2AA");
