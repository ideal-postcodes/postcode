import { assert } from "chai";
import { loadFixtures } from "./util/helper";
import Postcode from "../lib/index";

const INVALID_POSTCODE = Object.freeze({
  valid: false,
  postcode: null,
  incode: null,
  outcode: null,
  area: null,
  district: null,
  subDistrict: null,
  sector: null,
  unit: null
});

describe("Postcode.parse", () => {
  describe("invalid postcode", () => {
    it("returns an invalid postcode object", () => {
      const {
        valid,
        postcode,
        incode,
        outcode,
        area,
        district,
        subDistrict,
        sector,
        unit
      } = Postcode.parse("foo");
      assert.deepEqual(
        {
          valid,
          postcode,
          incode,
          outcode,
          area,
          district,
          subDistrict,
          sector,
          unit
        },
        { ...INVALID_POSTCODE }
      );
    });
  });

  describe("with valid postcode", () => {
    describe("Postcode#Valid", async () => {
      it("should return true for postcodes that look correct", async () => {
        const { tests } = await loadFixtures("validation.json");
        tests.forEach(({ base, expected }) => {
          const result = Postcode.parse(base);
          assert.equal(result.valid, Boolean(expected));
        });
      });

      describe("Postcode normalisation", () => {
        it("should correctly normalise postcodes", async () => {
          const { tests } = await loadFixtures("normalisation.json");
          tests.forEach(({ base, expected }) => {
            const result = Postcode.parse(base);
            assert.equal(result.postcode, expected);
          });
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
          invalidOutcodes.forEach(code =>
            assert.isFalse(Postcode.validOutcode(code))
          );
        });
      });

      describe("Incode parsing", () => {
        it("should correctly parse incodes", async () => {
          const { tests } = await loadFixtures("incodes.json");
          tests.forEach(({ base, expected }) => {
            const result = Postcode.parse(base);
            assert.equal(result.incode, expected);
          });
        });

        it("should return null if invalid postcode", () => {
          assert.isNull(Postcode.parse("Definitly bogus").incode);
        });
      });

      describe("Outcode parsing", () => {
        it("should correctly parse outcodes", async () => {
          const { tests } = await loadFixtures("outcodes.json");
          tests.forEach(({ base, expected }) => {
            const result = Postcode.parse(base);
            assert.equal(result.outcode, expected);
          });
        });

        it("should return null if invalid postcode", () => {
          assert.isNull(Postcode.parse("Definitly bogus").outcode);
        });
      });

      describe("Area parsing", () => {
        it("should correctly parse areas", async () => {
          const { tests } = await loadFixtures("areas.json");
          tests.forEach(({ base, expected }) => {
            const result = Postcode.parse(base);
            assert.equal(result.area, expected);
          });
        });

        it("should return null if invalid postcode", () => {
          assert.isNull(Postcode.parse("Definitely bogus").area);
        });
      });

      describe("District parsing", () => {
        it("should correctly parse districts", async () => {
          const { tests } = await loadFixtures("districts.json");
          tests.forEach(({ base, expected }) => {
            const result = Postcode.parse(base);
            assert.equal(result.district, expected);
          });
        });

        it("should return null if invalid postcode", () => {
          assert.isNull(Postcode.parse("Definitely bogus").district);
        });
      });

      describe("Sub-district parsing", () => {
        it("should correctly parse sub-districts", async () => {
          const { tests } = await loadFixtures("sub-districts.json");
          tests.forEach(({ base, expected }) => {
            const result = Postcode.parse(base);
            assert.equal(result.subDistrict, expected);
          });
        });

        it("should return null if invalid postcode", () => {
          assert.isNull(Postcode.parse("Definitely bogus").subDistrict);
        });
      });

      describe("Sector parsing", () => {
        it("should correctly parse sectors", async () => {
          const { tests } = await loadFixtures("sectors.json");
          tests.forEach(({ base, expected }) => {
            const result = Postcode.parse(base);
            assert.equal(result.sector, expected);
          });
        });

        it("should return null if invalid postcode", () => {
          assert.isNull(Postcode.parse("Definitely bogus").sector);
        });
      });

      describe("Unit parsing", () => {
        it("should correctly parse units", async () => {
          const { tests } = await loadFixtures("units.json");
          tests.forEach(({ base, expected }) => {
            const result = Postcode.parse(base);
            assert.equal(result.unit, expected);
          });
        });

        it("should return null if invalid postcode", () => {
          assert.isNull(Postcode.parse("Definitely bogus").unit);
        });
      });
    });
  });
});
