class Postcode {
  private _raw: string;
  private _valid: boolean;
  private _incode?: string | null;
  private _outcode?: string | null;
  private _area?: string | null;
  private _unit?: string | null;
  private _district?: string | null;
  private _subDistrict?: string | null;
  private _sector?: string | null;

  constructor(postcode: string) {
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
    this._incode = nullOrUpperCase(parseIncode(this._raw));
    return this._incode;
  }

  outcode(): string | null {
    if (!this._valid) return null;
    if (this._outcode) return this._outcode;
    this._outcode = nullOrUpperCase(parseOutcode(this._raw));
    return this._outcode;
  }

  area(): string | null {
    if (!this._valid) return null;
    if (this._area) return this._area;
    this._area = nullOrUpperCase(parseArea(this._raw));
    return this._area;
  }

  district(): string | null {
    if (!this._valid) return null;
    if (this._district) return this._district;
    const outcode = this.outcode();
    if (outcode === null) return null;
    const split = outcode.match(districtSplitRegex);
    this._district = split !== null ? split[1] : outcode;
    return this._district;
  }

  subDistrict(): string | null {
    if (!this._valid) return null;
    if (this._subDistrict) return this._subDistrict;
    const outcode = this.outcode();
    if (outcode === null) return null;
    const split = outcode.match(districtSplitRegex);
    this._subDistrict = split !== null ? outcode : null;
    return this._subDistrict;
  }

  sector(): string | null {
    if (this._sector) return this._sector;
    const normalised = this.normalise();
    if (normalised === null) return null;
    this._sector = parseSector(normalised);
    return this._sector;
  }

  unit(): string | null {
    if (!this._valid) return null;
    if (this._unit) return this._unit;
    this._unit = nullOrUpperCase(parseUnit(this._raw));
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
  (postcode: string): string | null;
}
const parseOutcode: Parser = postcode => {
  return postcode.replace(incodeRegex, "").replace(/\s+/, "");
};

const parseIncode: Parser = postcode => {
  const match = postcode.match(incodeRegex);
  if (match === null) return null;
  return match[0];
};

const parseArea: Parser = postcode => {
  const match = postcode.match(areaRegex);
  if (match === null) return null;
  return match[0];
};

const parseSector: Parser = postcode => {
  const match = postcode.match(sectorRegex);
  if (match === null) return null;
  return match[0];
};

const parseUnit: Parser = postcode => {
  const match = postcode.match(unitRegex);
  if (match === null) return null;
  return match[0];
};

const nullOrUpperCase = (s: string | null): string | null => {
  return s === null ? null : s.toUpperCase();
};

export = Postcode;
