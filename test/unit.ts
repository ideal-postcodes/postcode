import { assert } from "chai";
import Postcode from "../lib/index";
import { loadFixtures, TestMethod } from "./util/helper";

const testMethod: TestMethod = options => {
  const { tests, method } = options;
  tests.forEach(({ base, expected }) => {
    const p = new Postcode(base);
    const result = p[method].call(p);
    assert.equal(result, expected);
  });
};

describe("Postcode#Valid", async () => {
  it("should return true for postcodes that look correct", async () => {
    const { tests } = await loadFixtures("validation.json");
    tests.forEach(({ base, expected }) => {
      const p = new Postcode(base);
      assert.equal(p.valid(), Boolean(expected));
    });
  });
});

describe("Postcode normalisation", () => {
  it("should correctly normalise postcodes", async () => {
    const { tests } = await loadFixtures("normalisation.json");
    testMethod({ method: "normalise", tests });
  });

  it("should return null if invalid postcode", () => {
    assert.isNull(new Postcode("Definitly bogus").normalise());
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
    invalidOutcodes.forEach(code =>
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
    assert.isNull(new Postcode("Definitly bogus").incode());
  });
});

describe("Outcode parsing", () => {
  it("should correctly parse outcodes", async () => {
    const { tests } = await loadFixtures("outcodes.json");
    testMethod({ method: "outcode", tests });
  });

  it("should return null if invalid postcode", () => {
    assert.isNull(new Postcode("Definitly bogus").outcode());
  });
});

describe("Area parsing", () => {
  it("should correctly parse areas", async () => {
    const { tests } = await loadFixtures("areas.json");
    testMethod({ method: "area", tests });
  });

  it("should return null if invalid postcode", () => {
    assert.isNull(new Postcode("Definitely bogus").area());
  });
});

describe("District parsing", () => {
  it("should correctly parse districts", async () => {
    const { tests } = await loadFixtures("districts.json");
    testMethod({ method: "district", tests });
  });

  it("should return null if invalid postcode", () => {
    assert.isNull(new Postcode("Definitely bogus").district());
  });
});

describe("Sub-district parsing", () => {
  it("should correctly parse sub-districts", async () => {
    const { tests } = await loadFixtures("sub-districts.json");
    testMethod({ method: "subDistrict", tests });
  });

  it("should return null if invalid postcode", () => {
    assert.isNull(new Postcode("Definitely bogus").subDistrict());
  });
});

describe("Sector parsing", () => {
  it("should correctly parse sectors", async () => {
    const { tests } = await loadFixtures("sectors.json");
    testMethod({ method: "sector", tests });
  });

  it("should return null if invalid postcode", () => {
    assert.isNull(new Postcode("Definitely bogus").sector());
  });
});

describe("Unit parsing", () => {
  it("should correctly parse units", async () => {
    const { tests } = await loadFixtures("units.json");
    testMethod({ method: "unit", tests });
  });

  it("should return null if invalid postcode", () => {
    assert.isNull(new Postcode("Definitely bogus").unit());
  });
});
