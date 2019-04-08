/* tslint:disable:no-invalid-this */

import { assert } from "chai";
import { createReadStream } from "fs";
import { parse } from "csv";
import { resolve } from "path";
import { createGunzip } from "zlib";

const TIMEOUT = 60000;
const PC_LENGTH = 7;

import Postcode from "../lib/index";

describe("Exhaustive postcode test", () => {
  const testData = [];

  before(function(done) {
    this.timeout(TIMEOUT);
    console.log(
      "Loading in complete array of postcodes (this might take a while)..."
    );
    const inputFile = resolve(__dirname, "./data/postcodes.csv.gz");
    createReadStream(inputFile)
      .pipe(createGunzip())
      .pipe(parse({ delimiter: "," }))
      .on("data", data => testData.push(data[0]))
      .on("error", done)
      .on("end", done);
  });

  describe("Postcode#Valid", () => {
    it("should all be valid", function(done) {
      this.timeout(TIMEOUT);
      testData.forEach(postcode => {
        const p = new Postcode(postcode);
        assert.isTrue(p.valid(), `Expected ${postcode} to be valid`);
      });
      done();
    });
  });

  describe("Postcode normalisation", () => {
    it("should not throw and provide consistant normalised postcode", function(done) {
      this.timeout(TIMEOUT);
      testData.forEach(postcode => {
        const p = new Postcode(postcode);
        const downcasePostcode = new Postcode(postcode.toLowerCase());
        const unspacedPostcode = new Postcode(postcode.replace(/\s/, ""));
        if (postcode.length === PC_LENGTH) {
          // Since this isn't normalised in dataset, best we can do is see if normalised data matches
          assert.equal(p.normalise(), downcasePostcode.normalise());
          assert.equal(p.normalise(), unspacedPostcode.normalise());
        } else {
          // Any space indicates incode/outcode
          assert.equal(p.normalise(), postcode.replace(/\s*/, " "));
          assert.equal(
            downcasePostcode.normalise(),
            postcode.replace(/\s*/, " ")
          );
          assert.equal(
            unspacedPostcode.normalise(),
            postcode.replace(/\s*/, " ")
          );
        }
      });
      done();
    });
  });

  describe("Incode parsing", () => {
    it("should return the correct incode", function(done) {
      this.timeout(TIMEOUT);
      testData.forEach(postcode => {
        const p = new Postcode(postcode);
        const downcasePostcode = new Postcode(postcode.toLowerCase());
        const unspacedPostcode = new Postcode(postcode.replace(/\s/, ""));

        if (postcode.length === PC_LENGTH) {
          // Since this isn't normalised in dataset, best we can do is see if normalised data matches
          assert.equal(p.incode(), downcasePostcode.incode());
          assert.equal(p.incode(), unspacedPostcode.incode());
        } else {
          // Any space indicates incode/outcode
          const testIncode = postcode.match(/.*\s/)[0].replace(/\s/, "");
          assert.equal(p.incode(), testIncode);
          assert.equal(downcasePostcode.incode(), testIncode);
          assert.equal(unspacedPostcode.incode(), testIncode);
        }
      });
      done();
    });
  });

  describe("Outcode parsing", () => {
    it("should return the correct outcode", function(done) {
      this.timeout(TIMEOUT);
      testData.forEach(postcode => {
        const p = new Postcode(postcode);
        const downcasePostcode = new Postcode(postcode.toLowerCase());
        const unspacedPostcode = new Postcode(postcode.replace(/\s/, ""));
        if (postcode.length === PC_LENGTH) {
          // Since this isn't normalised in dataset, best we can do is see if normalised data matches
          assert.equal(p.outcode(), downcasePostcode.outcode());
          assert.equal(p.outcode(), unspacedPostcode.outcode());
        } else {
          // Any space indicates incode/outcode
          const testIncode = postcode.match(/\s.*/)[0].replace(/\s/, "");
          assert.equal(p.outcode(), testIncode);
          assert.equal(downcasePostcode.outcode(), testIncode);
          assert.equal(unspacedPostcode.outcode(), testIncode);
        }
      });
      done();
    });
  });
  describe("Area parsing", () => {
    it("should return the correct area", function(done) {
      this.timeout(TIMEOUT);
      testData.forEach(postcode => {
        const p = new Postcode(postcode);
        const downcasePostcode = new Postcode(postcode.toLowerCase());
        const unspacedPostcode = new Postcode(postcode.replace(/\s/, ""));
        if (postcode.length === PC_LENGTH) {
          // Since this isn't normalised in dataset, best we can do is see if normalised data matches
          assert.equal(p.area(), downcasePostcode.area());
          assert.equal(p.area(), unspacedPostcode.area());
        } else {
          // Any space indicates incode/outcode
          const testArea = postcode.match(/\s.*/)[0].replace(/\s/, "");
          assert.equal(p.area(), testArea);
          assert.equal(downcasePostcode.area(), testArea);
          assert.equal(unspacedPostcode.area(), testArea);
        }
      });
      done();
    });
  });
  describe("District parsing", () => {
    it("should return the correct district", function(done) {
      this.timeout(TIMEOUT);
      testData.forEach(postcode => {
        const p = new Postcode(postcode);
        const downcasePostcode = new Postcode(postcode.toLowerCase());
        const unspacedPostcode = new Postcode(postcode.replace(/\s/, ""));
        if (postcode.length === PC_LENGTH) {
          // Since this isn't normalised in dataset, best we can do is see if normalised data matches
          assert.equal(p.district(), downcasePostcode.district());
          assert.equal(p.district(), unspacedPostcode.district());
        } else {
          // Any space indicates incode/outcode
          const testDistrict = postcode.match(/\s.*/)[0].replace(/\s/, "");
          assert.equal(p.district(), testDistrict);
          assert.equal(downcasePostcode.district(), testDistrict);
          assert.equal(unspacedPostcode.district(), testDistrict);
        }
      });
      done();
    });
  });
  describe("Sub-district parsing", () => {
    it("should return the correct sub-district", function(done) {
      this.timeout(TIMEOUT);
      testData.forEach(postcode => {
        const p = new Postcode(postcode);
        const downcasePostcode = new Postcode(postcode.toLowerCase());
        const unspacedPostcode = new Postcode(postcode.replace(/\s/, ""));
        if (postcode.length === PC_LENGTH) {
          // Since this isn't normalised in dataset, best we can do is see if normalised data matches
          assert.equal(p.subDistrict(), downcasePostcode.subDistrict());
          assert.equal(p.subDistrict(), unspacedPostcode.subDistrict());
        } else {
          // Any space indicates incode/outcode
          const testSubDistrict = postcode.match(/\s.*/)[0].replace(/\s/, "");
          assert.equal(p.subDistrict(), testSubDistrict);
          assert.equal(downcasePostcode.subDistrict(), testSubDistrict);
          assert.equal(unspacedPostcode.subDistrict(), testSubDistrict);
        }
      });
      done();
    });
  });
  describe("Sector parsing", () => {
    it("should return the correct sector", function(done) {
      this.timeout(TIMEOUT);
      testData.forEach(postcode => {
        const p = new Postcode(postcode);
        const downcasePostcode = new Postcode(postcode.toLowerCase());
        const unspacedPostcode = new Postcode(postcode.replace(/\s/, ""));
        if (postcode.length === PC_LENGTH) {
          // Since this isn't normalised in dataset, best we can do is see if normalised data matches
          assert.equal(p.sector(), downcasePostcode.sector());
          assert.equal(p.sector(), unspacedPostcode.sector());
        } else {
          // Any space indicates incode/outcode
          const testSector = postcode.match(/\s.*/)[0].replace(/\s/, "");
          assert.equal(p.sector(), testSector);
          assert.equal(downcasePostcode.sector(), testSector);
          assert.equal(unspacedPostcode.sector(), testSector);
        }
      });
      done();
    });
  });
  describe("Unit parsing", () => {
    it("should return the correct unit", function(done) {
      this.timeout(TIMEOUT);
      testData.forEach(postcode => {
        const p = new Postcode(postcode);
        const downcasePostcode = new Postcode(postcode.toLowerCase());
        const unspacedPostcode = new Postcode(postcode.replace(/\s/, ""));
        if (postcode.length === PC_LENGTH) {
          // Since this isn't normalised in dataset, best we can do is see if normalised data matches
          assert.equal(p.unit(), downcasePostcode.unit());
          assert.equal(p.unit(), unspacedPostcode.unit());
        } else {
          // Any space indicates incode/outcode
          const testUnit = postcode.match(/\s.*/)[0].replace(/\s/, "");
          assert.equal(p.unit(), testUnit);
          assert.equal(downcasePostcode.unit(), testUnit);
          assert.equal(unspacedPostcode.unit(), testUnit);
        }
      });
      done();
    });
  });
});

/* tslint:disable:no-invalid-this */
