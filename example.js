const Postcode = require("postcode");

const postcode = new Postcode("ec1v9lb");

postcode.valid();
postcode.normalise();

postcode.outcode();
postcode.incode();
postcode.area();
postcode.district();
postcode.subDistrict();
postcode.sector();
postcode.unit();
