import { assert } from "chai";
import { fix } from "../lib/index";

describe("fix", () => {
  it("trims postcode", () => {
    assert.equal(fix(" SW1A 2AA "), "SW1A 2AA");
  });

  it("upper cases string", () => {
    assert.equal(fix(" Sw1A 2aa "), "SW1A 2AA");
  });

  it("fixes spacing", () => {
    assert.equal(fix(" Sw1A2aa "), "SW1A 2AA");
    assert.equal(fix(" Sw1A  2aa "), "SW1A 2AA");
  });

  it("returns original string if not fixable", () => {
    assert.equal(fix(" 1A2aa "), " 1A2aa ");
  });

  describe("outward code", () => {
    it("fixes LN format", () => {
      assert.equal(fix("01 OAA"), "O1 0AA");
      assert.equal(fix("SO OAA"), "S0 0AA");
    });

    it("fixes L?? format", () => {
      assert.equal(fix("0W1 OAA"), "OW1 0AA");

      // Too ambiguous
      assert.equal(fix("S01 OAA"), "S01 0AA");
      assert.equal(fix("SO1 OAA"), "SO1 0AA");
      assert.equal(fix("SWO OAA"), "SWO 0AA");
      assert.equal(fix("SW0 OAA"), "SW0 0AA");
    });

    it("fixes LLN? format", () => {
      assert.equal(fix("0W1A OAA"), "OW1A 0AA");
      assert.equal(fix("S01A OAA"), "SO1A 0AA");
      assert.equal(fix("SWOA OAA"), "SW0A 0AA");
      // Ambiguous
      assert.equal(fix("SW10 OAA"), "SW10 0AA");
      assert.equal(fix("SW1O OAA"), "SW1O 0AA");
    });
  });

  describe("inward code", () => {
    it("coerces first character", () => {
      assert.equal(fix(" SW1A OAA"), "SW1A 0AA");
    });
    it("coerces second character", () => {
      assert.equal(fix("SW1A 20A"), "SW1A 2OA");
    });
    it("coerces last character", () => {
      assert.equal(fix("SW1A 2A0"), "SW1A 2AO");
    });
  });

  it("fixes 1 <=> I", () => {
    assert.equal(fix("SWIA 2AA"), "SW1A 2AA");
    assert.equal(fix("1W1A 2AA"), "IW1A 2AA");
  });
});
