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

describe("Incode parsing", function () {
	before(function (done) {
		testData = fs.readFile(path.join(dataDir, "incode.json"), function (error, data) {
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
		testData = fs.readFile(path.join(dataDir, "outcode.json"), function (error, data) {
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