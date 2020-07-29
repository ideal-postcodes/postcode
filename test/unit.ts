import { assert } from "chai";
import * as Postcode from "../lib/index";
import { loadFixtures, TestMethod } from "./util/helper";

const { match, toNormalised, replace } = Postcode;

const testMethod: TestMethod = (options) => {
  const { tests, method } = options;
  tests.forEach(({ base, expected }) => {
    const p = Postcode.parse(base);
    assert.equal(p[method], expected);
  });
};

describe("Postcode#Valid", async () => {
  it("should return true for postcodes that look correct", async () => {
    const { tests } = await loadFixtures("validation.json");
    tests.forEach(({ base, expected }) => {
      const p = Postcode.parse(base);
      assert.equal(p.valid, Boolean(expected));
    });
  });
});

describe("Postcode normalisation", () => {
  it("should correctly normalise postcodes", async () => {
    const { tests } = await loadFixtures("normalisation.json");
    testMethod({ method: "postcode", tests });
  });

  it("should return null if invalid postcode", () => {
    assert.isNull(Postcode.parse("Definitly bogus").postcode);
  });
});

describe("Postcode.validOutcode", () => {
  it("should return true for valid outcodes", async () => {
    const { tests } = await loadFixtures("outcodes.json");
    tests.forEach(({ expected }) =>
      assert.isTrue(Postcode.validOutcode(expected))
    );
  });

  it("should return false for invalid outcode", () => {
    const invalidOutcodes = ["BOGUS", "Hello there", "12345"];
    invalidOutcodes.forEach((code) =>
      assert.isFalse(Postcode.validOutcode(code))
    );
  });
});

describe("Incode parsing", () => {
  it("should correctly parse incodes", async () => {
    const { tests } = await loadFixtures("incodes.json");
    testMethod({ method: "incode", tests });
  });

  it("should return null if invalid postcode", () => {
    assert.isNull(Postcode.parse("Definitly bogus").incode);
  });
});

describe("Outcode parsing", () => {
  it("should correctly parse outcodes", async () => {
    const { tests } = await loadFixtures("outcodes.json");
    testMethod({ method: "outcode", tests });
  });

  it("should return null if invalid postcode", () => {
    assert.isNull(Postcode.parse("Definitly bogus").outcode);
  });
});

describe("Area parsing", () => {
  it("should correctly parse areas", async () => {
    const { tests } = await loadFixtures("areas.json");
    testMethod({ method: "area", tests });
  });

  it("should return null if invalid postcode", () => {
    assert.isNull(Postcode.parse("Definitely bogus").area);
  });
});

describe("District parsing", () => {
  it("should correctly parse districts", async () => {
    const { tests } = await loadFixtures("districts.json");
    testMethod({ method: "district", tests });
  });

  it("should return null if invalid postcode", () => {
    assert.isNull(Postcode.parse("Definitely bogus").district);
  });
});

describe("Sub-district parsing", () => {
  it("should correctly parse sub-districts", async () => {
    const { tests } = await loadFixtures("sub-districts.json");
    testMethod({ method: "subDistrict", tests });
  });

  it("should return null if invalid postcode", () => {
    assert.isNull(Postcode.parse("Definitely bogus").subDistrict);
  });
});

describe("Sector parsing", () => {
  it("should correctly parse sectors", async () => {
    const { tests } = await loadFixtures("sectors.json");
    testMethod({ method: "sector", tests });
  });

  it("should return null if invalid postcode", () => {
    assert.isNull(Postcode.parse("Definitely bogus").sector);
  });
});

describe("Unit parsing", () => {
  it("should correctly parse units", async () => {
    const { tests } = await loadFixtures("units.json");
    testMethod({ method: "unit", tests });
  });

  it("should return null if invalid postcode", () => {
    assert.isNull(Postcode.parse("Definitely bogus").unit);
  });
});

describe("match", () => {
  it("returns matching postcodes", () => {
    const corpus = `SW1A2Aa is the residence of the Prime Minister. SW1a 2AB is the residence of her no.2. SW1A   1AA is where the queen lives. They are located in the SW1A outcode`;
    const result = match(corpus);
    assert.deepEqual(result, ["SW1A2Aa", "SW1a 2AB", "SW1A   1AA"]);
    assert.deepEqual(result.map(toNormalised), [
      "SW1A 2AA",
      "SW1A 2AB",
      "SW1A 1AA",
    ]);
  });

  it("returns an empty array if no match", () => {
    const corpus = `SW1 NW1 E1 E2`;
    assert.deepEqual(match(corpus), []);
  });
});

describe("replace", () => {
  it("replaces text and returns matching postcodes", () => {
    const corpus = `SW1A2Aa is the residence of the Prime Minister. SW1a 2AB is the residence of her no.2. SW1A   1AA is where the queen lives. They are located in the SW1A outcode`;
    const { match, result } = replace(corpus);
    assert.deepEqual(match, ["SW1A2Aa", "SW1a 2AB", "SW1A   1AA"]);
    assert.equal(
      result,
      ` is the residence of the Prime Minister.  is the residence of her no.2.  is where the queen lives. They are located in the SW1A outcode`
    );
  });

  it("replaces postcode with custom string", () => {
    const corpus = `SW1A2Aa is the residence of the Prime Minister. SW1a 2AB is the residence of her no.2. SW1A   1AA is where the queen lives. They are located in the SW1A outcode`;
    const replaceWith = "POSTCODE";
    const { match, result } = replace(corpus, replaceWith);
    assert.deepEqual(match, ["SW1A2Aa", "SW1a 2AB", "SW1A   1AA"]);
    assert.equal(
      result,
      `POSTCODE is the residence of the Prime Minister. POSTCODE is the residence of her no.2. POSTCODE is where the queen lives. They are located in the SW1A outcode`
    );
  });

  it("returns an empty array if no match", () => {
    const corpus = `SW1 NW1 E1 E2`;
    const { match, result } = replace(corpus);
    assert.deepEqual(match, []);
    assert.deepEqual(result, corpus);
  });
});
