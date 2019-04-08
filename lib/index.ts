export default class Postcode {
  private _raw: string;
  private _valid: boolean;
  private _incode: string | void;
  private _outcode: string | void;
  private _area: string | void;
  private _unit: string | void;
  private _district: string | void;
  private _subDistrict: string | void;
  private _sector: string | void;

  constructor(postcode) {
    this._raw = postcode;
    this._valid = isValidPostcode(postcode);
  }

  static validOutcode(outcode: string): boolean {
    return outcode.match(validOutcodeRegex) !== null;
  }

  valid(): boolean {
    return this._valid;
  }

  incode(): string | null {
    if (!this._valid) return null;
    if (this._incode) return this._incode;
    this._incode = parseIncode(this._raw).toUpperCase();
    return this._incode;
  }

  outcode(): string | null {
    if (!this._valid) return null;
    if (this._outcode) return this._outcode;
    this._outcode = parseOutcode(this._raw).toUpperCase();
    return this._outcode;
  }

  area(): string | null {
    if (!this._valid) return null;
    if (this._area) return this._area;
    this._area = parseArea(this._raw).toUpperCase();
    return this._area;
  }

  district(): string | null {
    if (!this._valid) return null;
    if (this._district) return this._district;
    const outcode = this.outcode();
    if (outcode === undefined) return null;
    const split = outcode.match(districtSplitRegex);
    this._district = split ? split[1] : outcode;
    return this._district;
  }

  subDistrict(): string | null {
    if (!this._valid) return null;
    if (this._subDistrict) return this._subDistrict;
    const outcode = this.outcode();
    const split = outcode.match(districtSplitRegex);
    this._subDistrict = split ? outcode : null;
    return this._subDistrict;
  }

  sector(): string | null {
    if (!this._valid) return null;
    if (this._sector) return this._sector;
    this._sector = parseSector(this.normalise()).toUpperCase();
    return this._sector;
  }

  unit(): string | null {
    if (!this._valid) return null;
    if (this._unit) return this._unit;
    this._unit = parseUnit(this._raw).toUpperCase();
    return this._unit;
  }

  normalise(): string | null {
    if (!this._valid) return null;
    return `${this.outcode()} ${this.incode()}`;
  }
}

const validationRegex = /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i;
const incodeRegex = /\d[a-z]{2}$/i;
const validOutcodeRegex = /^[a-z]{1,2}\d[a-z\d]?$/i;
const areaRegex = /^[a-z]{1,2}/i;
const districtSplitRegex = /^([a-z]{1,2}\d)([a-z])$/i;
const sectorRegex = /^[a-z]{1,2}\d[a-z\d]?\s*\d/i;
const unitRegex = /[a-z]{2}$/i;

interface Validator {
  (input: string): boolean;
}

const isValidPostcode: Validator = postcode =>
  postcode.match(validationRegex) !== null;

interface Parser {
  (postcode: string): string;
}
const parseOutcode: Parser = postcode => {
  return postcode.replace(incodeRegex, "").replace(/\s+/, "");
};

const parseIncode: Parser = postcode => {
  return postcode.match(incodeRegex)[0];
};

const parseArea: Parser = postcode => {
  return postcode.match(areaRegex)[0];
};

const parseSector: Parser = postcode => {
  return postcode.match(sectorRegex)[0];
};

const parseUnit: Parser = postcode => postcode.match(unitRegex)[0];
