var assert = require("chai").assert,
		fs = require("fs"),
		path = require("path"),
		dataDir = path.join(__dirname, "/data"),
		Postcode = require(path.join(__dirname, "../index")),
		testData, testResult;

describe("Postcode#Valid", function () {
	before(function (done) {
		testData = fs.readFile(path.join(dataDir, "validation.json"), function (error, data) {
			if (error) throw error;
			testData = JSON.parse(data);
			done();
		});
	});

	it ("should return true for postcodes that look correct", function () {
		testData.tests.forEach(function (elem) {
			assert.equal(new Postcode(elem.base).valid(), elem.expected);
		});
	});
});

describe("Postcode normalisation", function () {
	before(function (done) {
		testData = fs.readFile(path.join(dataDir, "normalisation.json"), function (error, data) {
			if (error) throw error;
			testData = JSON.parse(data);
			done();
		});
	});

	it ("should correctly normalise postcodes", function () {
		testData.tests.forEach(function (elem) {
			assert.equal(new Postcode(elem.base).normalise(), elem.expected);
		})
	});

	it ("should return null if invalid postcode", function () {
		assert.isNull(new Postcode("Definitly bogus").normalise());
	});
});

describe("Postcode.validOutcode", function () {
	it ("should return true for valid outcodes", function (done) {
		testData = fs.readFile(path.join(dataDir, "outcodes.json"), function (error, data) {
			if (error) throw error;
			testData = JSON.parse(data);
			testData.tests.forEach(function (test) {
				assert.isTrue(Postcode.validOutcode(test.expected));
			});
			done();
		});
	});
	it ("should return false for invalid outcode", function (done) {
		var invalidOutcodes = ["BOGUS", "Hello there", "12345"];
		invalidOutcodes.forEach(function (code) {
			assert.isFalse(Postcode.validOutcode(code));
		});
		done();
	});
});

describe("Incode parsing", function () {
	before(function (done) {
		testData = fs.readFile(path.join(dataDir, "incodes.json"), function (error, data) {
			if (error) throw error;
			testData = JSON.parse(data);
			done();
		});
	});	

	it ("should correctly parse incodes", function () {
		testData.tests.forEach(function (elem) {
			assert.equal(new Postcode(elem.base).incode(), elem.expected);
		});
	});

	it ("should return null if invalid postcode", function () {
		assert.isNull(new Postcode("Definitly bogus").incode());
	});
});

describe("Outcode parsing", function () {
	before(function (done) {
		testData = fs.readFile(path.join(dataDir, "outcodes.json"), function (error, data) {
			if (error) throw error;
			testData = JSON.parse(data);
			done();
		});
	});	

	it ("should correctly parse outcodes", function () {
		testData.tests.forEach(function (elem) {
			assert.equal(new Postcode(elem.base).outcode(), elem.expected);
		});
	});
	it ("should return null if invalid postcode", function () {
		assert.isNull(new Postcode("Definitly bogus").outcode());
	});
});

describe("Area parsing", function () {
	before(function (done) {
		testData = fs.readFile(path.join(dataDir, "areas.json"), function (error, data) {
			if (error) throw error;
			testData = JSON.parse(data);
			done();
		});
	});

	it ("should correctly parse areas", function () {
		testData.tests.forEach(function (elem) {
			assert.equal(new Postcode(elem.base).area(), elem.expected);
		});
	});
	it ("should return null if invalid postcode", function () {
		assert.isNull(new Postcode("Definitely bogus").area());
	});
});

describe("District parsing", function () {
	before(function (done) {
		testData = fs.readFile(path.join(dataDir, "districts.json"), function (error, data) {
			if (error) throw error;
			testData = JSON.parse(data);
			done();
		});
	});

	it ("should correctly parse districts", function () {
		testData.tests.forEach(function (elem) {
			assert.equal(new Postcode(elem.base).district(), elem.expected);
		});
	});
	it ("should return null if invalid postcode", function () {
		assert.isNull(new Postcode("Definitely bogus").district());
	});
});

describe("Sub-district parsing", function () {
	before(function (done) {
		testData = fs.readFile(path.join(dataDir, "sub-districts.json"), function (error, data) {
			if (error) throw error;
			testData = JSON.parse(data);
			done();
		});
	});

	it ("should correctly parse sub-districts", function () {
		testData.tests.forEach(function (elem) {
			assert.equal(new Postcode(elem.base).subDistrict(), elem.expected);
		});
	});
	it ("should return null if invalid postcode", function () {
		assert.isNull(new Postcode("Definitely bogus").subDistrict());
	});
});

describe("Sector parsing", function () {
	before(function (done) {
		testData = fs.readFile(path.join(dataDir, "sectors.json"), function (error, data) {
			if (error) throw error;
			testData = JSON.parse(data);
			done();
		});
	});

	it ("should correctly parse sectors", function () {
		testData.tests.forEach(function (elem) {
			assert.equal(new Postcode(elem.base).sector(), elem.expected);
		});
	});
	it ("should return null if invalid postcode", function () {
		assert.isNull(new Postcode("Definitely bogus").sector());
	});
});

describe("Unit parsing", function () {
	before(function (done) {
		testData = fs.readFile(path.join(dataDir, "units.json"), function (error, data) {
			if (error) throw error;
			testData = JSON.parse(data);
			done();
		});
	});

	it ("should correctly parse units", function () {
		testData.tests.forEach(function (elem) {
			assert.equal(new Postcode(elem.base).unit(), elem.expected);
		});
	});
	it ("should return null if invalid postcode", function () {
		assert.isNull(new Postcode("Definitely bogus").unit());
	});
});
