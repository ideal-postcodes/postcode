import { assert } from "chai";
import * as Postcode from "../lib/index";
import { loadFixtures, TestCase } from "./util/helper";

interface StaticMethod {
  (postcode: string): string | null;
}

interface TestMethodOptions {
  tests: TestCase[];
  method: StaticMethod;
}

const testMethod = (options: TestMethodOptions): void => {
  const { tests, method } = options;
  tests.forEach(({ base, expected }) => {
    const result = method.call(null, base);
    assert.equal(result, expected);
  });
};

describe("isValid", async () => {
  it("should return true for postcodes that look correct", async () => {
    const { tests } = await loadFixtures("validation.json");
    tests.forEach(({ base, expected }) => {
      assert.equal(Postcode.isValid(base), Boolean(expected));
    });
  });
});

describe("toNormalised", () => {
  it("should correctly normalise postcodes", async () => {
    const { tests } = await loadFixtures("normalisation.json");
    testMethod({ method: Postcode.toNormalised, tests });
  });

  it("should return null if invalid postcode", () => {
    assert.isNull(Postcode.toNormalised("Definitly bogus"));
  });
});

describe("toIncode", () => {
  it("should correctly parse incodes", async () => {
    const { tests } = await loadFixtures("incodes.json");
    testMethod({ method: Postcode.toIncode, tests });
  });

  it("should return null if invalid postcode", () => {
    assert.isNull(Postcode.toIncode("Definitly bogus"));
  });
});

describe("toOutcode", () => {
  it("should correctly parse outcodes", async () => {
    const { tests } = await loadFixtures("outcodes.json");
    testMethod({ method: Postcode.toOutcode, tests });
  });

  it("should return undefined if invalid postcode", () => {
    assert.isNull(Postcode.toOutcode("Definitly bogus"));
  });
});

describe("toArea", () => {
  it("should correctly parse areas", async () => {
    const { tests } = await loadFixtures("areas.json");
    testMethod({ method: Postcode.toArea, tests });
  });

  it("should return undefined if invalid postcode", () => {
    assert.isNull(Postcode.toArea("Definitely bogus"));
  });
});

describe("toDistrict", () => {
  it("should correctly parse districts", async () => {
    const { tests } = await loadFixtures("districts.json");
    testMethod({ method: Postcode.toDistrict, tests });
  });

  it("should return undefined if invalid postcode", () => {
    assert.isNull(Postcode.toDistrict("Definitely bogus"));
  });
});

describe("toSubDistrict", () => {
  it("should correctly parse sub-districts", async () => {
    const { tests } = await loadFixtures("sub-districts.json");
    testMethod({ method: Postcode.toSubDistrict, tests });
  });

  it("should return undefined if invalid postcode", () => {
    assert.isNull(Postcode.toSubDistrict("Definitely bogus"));
  });
});

describe("toSector", () => {
  it("should correctly parse sectors", async () => {
    const { tests } = await loadFixtures("sectors.json");
    testMethod({ method: Postcode.toSector, tests });
  });

  it("should return undefined if invalid postcode", () => {
    assert.isNull(Postcode.toSector("Definitely bogus"));
  });
});

describe("toUnit", () => {
  it("should correctly parse units", async () => {
    const { tests } = await loadFixtures("units.json");
    testMethod({ method: Postcode.toUnit, tests });
  });

  it("should return undefined if invalid postcode", () => {
    assert.isNull(Postcode.toUnit("Definitely bogus"));
  });
});
