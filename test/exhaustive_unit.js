const assert = require("chai").assert;
const { createReadStream } = require("fs");
const { parse } = require("csv");
const { resolve } = require("path");
const zlib = require("zlib");
const Postcode = require("../index");

describe("Exhaustive postcode test", function() {
  const testData = [];

  before(function(done) {
    this.timeout(60000);
    console.log(
      "Loading in complete array of postcodes (this might take a while)..."
    );
    const inputFile = resolve(__dirname, "./data/postcodes.csv.gz");
    createReadStream(inputFile)
      .pipe(zlib.createGunzip())
      .pipe(parse({ delimiter: "," }))
      .on("data", data => testData.push(data))
      .on("error", done)
      .on("end", done);
  });

  describe("Postcode#Valid", function() {
    it("should all be valid", function(done) {
      this.timeout(60000);
      testData.forEach(function(testPostcode) {
        var pc = testPostcode[0],
          postcode = new Postcode(testPostcode[0]);
        assert.isTrue(
          postcode.valid(),
          "Expected " + testPostcode[0] + " to be valid"
        );
      });
      done();
    });
  });
  describe("Postcode normalisation", function() {
    it("should not throw and provide consistant normalised postcode", function(done) {
      this.timeout(60000);
      testData.forEach(function(testPostcode) {
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
  describe("Incode parsing", function() {
    it("should return the correct incode", function(done) {
      this.timeout(60000);
      testData.forEach(function(testPostcode) {
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
  describe("Outcode parsing", function() {
    it("should return the correct outcode", function(done) {
      this.timeout(60000);
      testData.forEach(function(testPostcode) {
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
  describe("Area parsing", function() {
    it("should return the correct area", function(done) {
      this.timeout(60000);
      testData.forEach(function(testPostcode) {
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
  describe("District parsing", function() {
    it("should return the correct district", function(done) {
      this.timeout(60000);
      testData.forEach(function(testPostcode) {
        var pc = testPostcode[0],
          postcode = new Postcode(pc),
          downcasePostcode = new Postcode(pc.toLowerCase()),
          unspacedPostcode = new Postcode(pc.replace(/\s/, "")),
          testDistrict;
        if (pc.length === 7) {
          // Since this isn't normalised in dataset, best we can do is see if normalised data matches
          assert.equal(postcode.district(), downcasePostcode.district());
          assert.equal(postcode.district(), unspacedPostcode.district());
        } else {
          // Any space indicates incode/outcode
          testDistrict = pc.match(/\s.*/)[0].replace(/\s/, "");
          assert.equal(postcode.district(), testDistrict);
          assert.equal(downcasePostcode.district(), testDistrict);
          assert.equal(unspacedPostcode.district(), testDistrict);
        }
      });
      done();
    });
  });
  describe("Sub-district parsing", function() {
    it("should return the correct sub-district", function(done) {
      this.timeout(60000);
      testData.forEach(function(testPostcode) {
        var pc = testPostcode[0],
          postcode = new Postcode(pc),
          downcasePostcode = new Postcode(pc.toLowerCase()),
          unspacedPostcode = new Postcode(pc.replace(/\s/, "")),
          testSubDistrict;
        if (pc.length === 7) {
          // Since this isn't normalised in dataset, best we can do is see if normalised data matches
          assert.equal(postcode.subDistrict(), downcasePostcode.subDistrict());
          assert.equal(postcode.subDistrict(), unspacedPostcode.subDistrict());
        } else {
          // Any space indicates incode/outcode
          testSubDistrict = pc.match(/\s.*/)[0].replace(/\s/, "");
          assert.equal(postcode.subDistrict(), testSubDistrict);
          assert.equal(downcasePostcode.subDistrict(), testSubDistrict);
          assert.equal(unspacedPostcode.subDistrict(), testSubDistrict);
        }
      });
      done();
    });
  });
  describe("Sector parsing", function() {
    it("should return the correct sector", function(done) {
      this.timeout(60000);
      testData.forEach(function(testPostcode) {
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
  describe("Unit parsing", function() {
    it("should return the correct unit", function(done) {
      this.timeout(60000);
      testData.forEach(function(testPostcode) {
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
