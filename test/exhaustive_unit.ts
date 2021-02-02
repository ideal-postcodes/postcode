/* tslint:disable:no-invalid-this */

import { assert } from "chai";
import axios from "axios";

const TIMEOUT = 60000;

import { parse } from "../lib/index";

const url = "https://data.ideal-postcodes.co.uk/postcodes.csv";

describe("Exhaustive postcode test", () => {
  let postcodes: string[] = [];

  before(async function () {
    this.timeout(TIMEOUT);
    console.log(
      "Retrieving latest postcode dataset from https://data.ideal-postcodes.co.uk"
    );
    const response = await axios({ url });
    postcodes = response.data
      .split(/\r\n|\r|\n/)
      .map((p: string) => p.trim())
      .filter((p: string) => p !== "GIR 0AA");
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
        // Since this isn't normalised in dataset, best we can do is see if normalised data matches
        assert.equal(p.postcode, downcasePostcode.postcode);
        assert.equal(p.postcode, unspacedPostcode.postcode);
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
        // Since this isn't normalised in dataset, best we can do is see if normalised data matches
        assert.equal(p.incode, downcasePostcode.incode);
        assert.equal(p.incode, unspacedPostcode.incode);
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
        // Since this isn't normalised in dataset, best we can do is see if normalised data matches
        assert.equal(p.outcode, downcasePostcode.outcode);
        assert.equal(p.outcode, unspacedPostcode.outcode);
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
        // Since this isn't normalised in dataset, best we can do is see if normalised data matches
        assert.equal(p.area, downcasePostcode.area);
        assert.equal(p.area, unspacedPostcode.area);
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
        // Since this isn't normalised in dataset, best we can do is see if normalised data matches
        assert.equal(p.district, downcasePostcode.district);
        assert.equal(p.district, unspacedPostcode.district);
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
        // Since this isn't normalised in dataset, best we can do is see if normalised data matches
        assert.equal(p.subDistrict, downcasePostcode.subDistrict);
        assert.equal(p.subDistrict, unspacedPostcode.subDistrict);
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
        assert.equal(p.sector, downcasePostcode.sector);
        assert.equal(p.sector, unspacedPostcode.sector);
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
        // Since this isn't normalised in dataset, best we can do is see if normalised data matches
        assert.equal(p.unit, downcasePostcode.unit);
        assert.equal(p.unit, unspacedPostcode.unit);
      });
    });
  });
});

/* tslint:disable:no-invalid-this */
