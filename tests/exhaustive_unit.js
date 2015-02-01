var assert = require("chai").assert,
		fs = require("fs"),
		csv = require("csv"),
		path = require("path"),
		zlib = require("zlib"),
		dataDir = path.join(__dirname, "./data"),
		Postcode = require(path.join(__dirname, "../index"));

describe("Exhaustive postcode test", function () {
	var gunzip, input, output, testData, testResult,
			inputFile = path.join(dataDir, "postcodes.csv.gz"),
			outputFile = path.join(dataDir, "postcodes.csv");

	before(function (done) {
		this.timeout(60000);
		gunzip = zlib.createGunzip();
		input = fs.createReadStream(inputFile);
		output = fs.createWriteStream(outputFile);
		input.pipe(gunzip).pipe(output);
		input.on("end", function () {
			console.log("Loading in complete array of postcodes (this might take a while)...");
			csv().from.path(outputFile).to.array(function (data, count) {
				testData = data;
				done();
			});
		});
	});

	after(function (done) {
		fs.unlink(outputFile, done);
	});

	describe("Postcode#Valid", function () {
		it ("should all be valid", function (done) {
			this.timeout(60000);
			testData.forEach(function (testPostcode) {
				var pc = testPostcode[0],
						postcode = new Postcode(testPostcode[0]);
				assert.isTrue(postcode.valid(), "Expected " + testPostcode[0] +" to be valid");
			});
			done();
		});
	});
	describe("Postcode normalisation", function () {
		it ("should not throw and provide consistant normalised postcode", function (done) {
			this.timeout(60000);
			testData.forEach(function (testPostcode) {
				var pc = testPostcode[0],
						postcode = new Postcode(pc),
						downcasePostcode = new Postcode(pc.toLowerCase()),
						unspacedPostcode = new Postcode(pc.replace(/\s/, ""));
				if (pc.length === 7) {
					// Since this isn't normalised in dataset, best we can do is see if normalised data matches
					assert.equal(postcode.normalise(), downcasePostcode.normalise());
					assert.equal(postcode.normalise(), unspacedPostcode.normalise());
				} else {
					// Any space indicates incode/outcode
					assert.equal(postcode.normalise(), pc.replace(/\s*/, " "));
					assert.equal(downcasePostcode.normalise(), pc.replace(/\s*/, " "));
					assert.equal(unspacedPostcode.normalise(), pc.replace(/\s*/, " "));
				}
			});
			done();
		});
	});
	describe("Incode parsing", function () {
		it("should return the correct incode", function (done) {
			this.timeout(60000);
			testData.forEach(function (testPostcode) {
				var pc = testPostcode[0],
						postcode = new Postcode(pc),
						downcasePostcode = new Postcode(pc.toLowerCase()),
						unspacedPostcode = new Postcode(pc.replace(/\s/, "")),
						testIncode;
				if (pc.length === 7) {
					// Since this isn't normalised in dataset, best we can do is see if normalised data matches
					assert.equal(postcode.incode(), downcasePostcode.incode());
					assert.equal(postcode.incode(), unspacedPostcode.incode());
				} else {
					// Any space indicates incode/outcode
					testIncode = pc.match(/.*\s/)[0].replace(/\s/, "");
					assert.equal(postcode.incode(), testIncode);
					assert.equal(downcasePostcode.incode(), testIncode);
					assert.equal(unspacedPostcode.incode(), testIncode);
				}
			});
			done();
		});
	});
	describe("Outcode parsing", function () {
		it("should return the correct outcode", function (done) {
			this.timeout(60000);
			testData.forEach(function (testPostcode) {
				var pc = testPostcode[0],
						postcode = new Postcode(pc),
						downcasePostcode = new Postcode(pc.toLowerCase()),
						unspacedPostcode = new Postcode(pc.replace(/\s/, "")),
						testIncode;
				if (pc.length === 7) {
					// Since this isn't normalised in dataset, best we can do is see if normalised data matches
					assert.equal(postcode.outcode(), downcasePostcode.outcode());
					assert.equal(postcode.outcode(), unspacedPostcode.outcode());
				} else {
					// Any space indicates incode/outcode
					testIncode = pc.match(/\s.*/)[0].replace(/\s/, "");
					assert.equal(postcode.outcode(), testIncode);
					assert.equal(downcasePostcode.outcode(), testIncode);
					assert.equal(unspacedPostcode.outcode(), testIncode);
				}
			});
			done();
		});
	});
	describe("Area parsing", function () {
		it("should return the correct area", function (done) {
			this.timeout(60000);
			testData.forEach(function (testPostcode) {
				var pc = testPostcode[0],
						postcode = new Postcode(pc),
						downcasePostcode = new Postcode(pc.toLowerCase()),
						unspacedPostcode = new Postcode(pc.replace(/\s/, "")),
						testArea;
				if (pc.length === 7) {
					// Since this isn't normalised in dataset, best we can do is see if normalised data matches
					assert.equal(postcode.area(), downcasePostcode.area());
					assert.equal(postcode.area(), unspacedPostcode.area());
				} else {
					// Any space indicates incode/outcode
					testArea = pc.match(/\s.*/)[0].replace(/\s/, "");
					assert.equal(postcode.area(), testArea);
					assert.equal(downcasePostcode.area(), testArea);
					assert.equal(unspacedPostcode.area(), testArea);
				}
			});
			done();
		});
	});
	describe("Sector parsing", function () {
		it("should return the correct sector", function (done) {
			this.timeout(60000);
			testData.forEach(function (testPostcode) {
				var pc = testPostcode[0],
						postcode = new Postcode(pc),
						downcasePostcode = new Postcode(pc.toLowerCase()),
						unspacedPostcode = new Postcode(pc.replace(/\s/, "")),
						testSector;
				if (pc.length === 7) {
					// Since this isn't normalised in dataset, best we can do is see if normalised data matches
					assert.equal(postcode.sector(), downcasePostcode.sector());
					assert.equal(postcode.sector(), unspacedPostcode.sector());
				} else {
					// Any space indicates incode/outcode
					testSector = pc.match(/\s.*/)[0].replace(/\s/, "");
					assert.equal(postcode.sector(), testSector);
					assert.equal(downcasePostcode.sector(), testSector);
					assert.equal(unspacedPostcode.sector(), testSector);
				}
			});
			done();
		});
	});
	describe("Unit parsing", function () {
		it("should return the correct unit", function (done) {
			this.timeout(60000);
			testData.forEach(function (testPostcode) {
				var pc = testPostcode[0],
						postcode = new Postcode(pc),
						downcasePostcode = new Postcode(pc.toLowerCase()),
						unspacedPostcode = new Postcode(pc.replace(/\s/, "")),
						testUnit;
				if (pc.length === 7) {
					// Since this isn't normalised in dataset, best we can do is see if normalised data matches
					assert.equal(postcode.unit(), downcasePostcode.unit());
					assert.equal(postcode.unit(), unspacedPostcode.unit());
				} else {
					// Any space indicates incode/outcode
					testUnit = pc.match(/\s.*/)[0].replace(/\s/, "");
					assert.equal(postcode.unit(), testUnit);
					assert.equal(downcasePostcode.unit(), testUnit);
					assert.equal(unspacedPostcode.unit(), testUnit);
				}
			});
			done();
		});
	});
});
