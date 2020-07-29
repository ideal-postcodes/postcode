/* tslint:disable:no-invalid-this */

import { assert } from "chai";
import { createReadStream } from "fs";
import csvParse from "csv-parse";
import { resolve } from "path";
import { createGunzip } from "zlib";

const TIMEOUT = 60000;
const PC_LENGTH = 7;

import { parse } from "../lib/index";

type CsvRecord = [string];

describe("Exhaustive postcode test", () => {
  const postcodes: string[] = [];

  before(function (done) {
    this.timeout(TIMEOUT);
    console.log(
      "Loading in complete array of postcodes (this might take a while)..."
    );
    const inputFile = resolve(__dirname, "./data/postcodes.csv.gz");
    createReadStream(inputFile)
      .pipe(createGunzip())
      .pipe(csvParse({ delimiter: "," }))
      .on("data", (data: CsvRecord) => postcodes.push(data[0]))
      .on("error", done)
      .on("end", done);
  });

  describe(".valid", () => {
    it("should all be valid", function () {
      this.timeout(TIMEOUT);
      postcodes.forEach((postcode) => {
        const p = parse(postcode);
        assert.isTrue(p.valid, `Expected ${postcode} to be valid`);
      });
    });
  });

  describe("Postcode normalisation", () => {
    it("should not throw and provide consistant normalised postcode", function () {
      this.timeout(TIMEOUT);
      postcodes.forEach((postcode) => {
        const p = parse(postcode);
        const downcasePostcode = parse(postcode.toLowerCase());
        const unspacedPostcode = parse(postcode.replace(/\s/, ""));
        if (postcode.length === PC_LENGTH) {
          // Since this isn't normalised in dataset, best we can do is see if normalised data matches
          assert.equal(p.postcode, downcasePostcode.postcode);
          assert.equal(p.postcode, unspacedPostcode.postcode);
        } else {
          // Any space indicates incode/outcode
          assert.equal(p.postcode, postcode.replace(/\s*/, " "));
          assert.equal(downcasePostcode.postcode, postcode.replace(/\s*/, " "));
          assert.equal(unspacedPostcode.postcode, postcode.replace(/\s*/, " "));
        }
      });
    });
  });

  describe("Incode parsing", () => {
    it("should return the correct incode", function () {
      this.timeout(TIMEOUT);
      postcodes.forEach((postcode) => {
        const p = parse(postcode);
        const downcasePostcode = parse(postcode.toLowerCase());
        const unspacedPostcode = parse(postcode.replace(/\s/, ""));

        if (postcode.length === PC_LENGTH) {
          // Since this isn't normalised in dataset, best we can do is see if normalised data matches
          assert.equal(p.incode, downcasePostcode.incode);
          assert.equal(p.incode, unspacedPostcode.incode);
        } else {
          // Any space indicates incode/outcode
          const match = postcode.match(/.*\s/);
          if (match === null) throw new Error("null detected");
          const testIncode = match[0].replace(/\s/, "");
          assert.equal(p.incode, testIncode);
          assert.equal(downcasePostcode.incode, testIncode);
          assert.equal(unspacedPostcode.incode, testIncode);
        }
      });
    });
  });

  describe("Outcode parsing", () => {
    it("should return the correct outcode", function () {
      this.timeout(TIMEOUT);
      postcodes.forEach((postcode) => {
        const p = parse(postcode);
        const downcasePostcode = parse(postcode.toLowerCase());
        const unspacedPostcode = parse(postcode.replace(/\s/, ""));
        if (postcode.length === PC_LENGTH) {
          // Since this isn't normalised in dataset, best we can do is see if normalised data matches
          assert.equal(p.outcode, downcasePostcode.outcode);
          assert.equal(p.outcode, unspacedPostcode.outcode);
        } else {
          // Any space indicates incode/outcode
          const match = postcode.match(/\s.*/);
          if (match === null) throw new Error("null detected");
          const testIncode = match[0].replace(/\s/, "");
          assert.equal(p.outcode, testIncode);
          assert.equal(downcasePostcode.outcode, testIncode);
          assert.equal(unspacedPostcode.outcode, testIncode);
        }
      });
    });
  });
  describe("Area parsing", () => {
    it("should return the correct area", function () {
      this.timeout(TIMEOUT);
      postcodes.forEach((postcode) => {
        const p = parse(postcode);
        const downcasePostcode = parse(postcode.toLowerCase());
        const unspacedPostcode = parse(postcode.replace(/\s/, ""));
        if (postcode.length === PC_LENGTH) {
          // Since this isn't normalised in dataset, best we can do is see if normalised data matches
          assert.equal(p.area, downcasePostcode.area);
          assert.equal(p.area, unspacedPostcode.area);
        } else {
          // Any space indicates incode/outcode
          const match = postcode.match(/\s.*/);
          if (match === null) throw new Error("null detected");
          const testArea = match[0].replace(/\s/, "");
          assert.equal(p.area, testArea);
          assert.equal(downcasePostcode.area, testArea);
          assert.equal(unspacedPostcode.area, testArea);
        }
      });
    });
  });
  describe("District parsing", () => {
    it("should return the correct district", function () {
      this.timeout(TIMEOUT);
      postcodes.forEach((postcode) => {
        const p = parse(postcode);
        const downcasePostcode = parse(postcode.toLowerCase());
        const unspacedPostcode = parse(postcode.replace(/\s/, ""));
        if (postcode.length === PC_LENGTH) {
          // Since this isn't normalised in dataset, best we can do is see if normalised data matches
          assert.equal(p.district, downcasePostcode.district);
          assert.equal(p.district, unspacedPostcode.district);
        } else {
          // Any space indicates incode/outcode
          const match = postcode.match(/\s.*/);
          if (match === null) throw new Error("null detected");
          const testDistrict = match[0].replace(/\s/, "");
          assert.equal(p.district, testDistrict);
          assert.equal(downcasePostcode.district, testDistrict);
          assert.equal(unspacedPostcode.district, testDistrict);
        }
      });
    });
  });
  describe("Sub-district parsing", () => {
    it("should return the correct sub-district", function () {
      this.timeout(TIMEOUT);
      postcodes.forEach((postcode) => {
        const p = parse(postcode);
        const downcasePostcode = parse(postcode.toLowerCase());
        const unspacedPostcode = parse(postcode.replace(/\s/, ""));
        if (postcode.length === PC_LENGTH) {
          // Since this isn't normalised in dataset, best we can do is see if normalised data matches
          assert.equal(p.subDistrict, downcasePostcode.subDistrict);
          assert.equal(p.subDistrict, unspacedPostcode.subDistrict);
        } else {
          // Any space indicates incode/outcode
          const match = postcode.match(/\s.*/);
          if (match === null) throw new Error("null detected");
          const testSubDistrict = match[0].replace(/\s/, "");
          assert.equal(p.subDistrict, testSubDistrict);
          assert.equal(downcasePostcode.subDistrict, testSubDistrict);
          assert.equal(unspacedPostcode.subDistrict, testSubDistrict);
        }
      });
    });
  });
  describe("Sector parsing", () => {
    it("should return the correct sector", function () {
      this.timeout(TIMEOUT);
      postcodes.forEach((postcode) => {
        const p = parse(postcode);
        const downcasePostcode = parse(postcode.toLowerCase());
        const unspacedPostcode = parse(postcode.replace(/\s/, ""));
        if (postcode.length === PC_LENGTH) {
          // Since this isn't normalised in dataset, best we can do is see if normalised data matches
          assert.equal(p.sector, downcasePostcode.sector);
          assert.equal(p.sector, unspacedPostcode.sector);
        } else {
          // Any space indicates incode/outcode
          const match = postcode.match(/\s.*/);
          if (match === null) throw new Error("null detected");
          const testSector = match[0].replace(/\s/, "");
          assert.equal(p.sector, testSector);
          assert.equal(downcasePostcode.sector, testSector);
          assert.equal(unspacedPostcode.sector, testSector);
        }
      });
    });
  });
  describe("Unit parsing", () => {
    it("should return the correct unit", function () {
      this.timeout(TIMEOUT);
      postcodes.forEach((postcode) => {
        const p = parse(postcode);
        const downcasePostcode = parse(postcode.toLowerCase());
        const unspacedPostcode = parse(postcode.replace(/\s/, ""));
        if (postcode.length === PC_LENGTH) {
          // Since this isn't normalised in dataset, best we can do is see if normalised data matches
          assert.equal(p.unit, downcasePostcode.unit);
          assert.equal(p.unit, unspacedPostcode.unit);
        } else {
          // Any space indicates incode/outcode
          const match = postcode.match(/\s.*/);
          if (match === null) throw new Error("null detected");
          const testUnit = match[0].replace(/\s/, "");
          assert.equal(p.unit, testUnit);
          assert.equal(downcasePostcode.unit, testUnit);
          assert.equal(unspacedPostcode.unit, testUnit);
        }
      });
    });
  });
});

/* tslint:disable:no-invalid-this */
