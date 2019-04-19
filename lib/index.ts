interface Validator {
  (input: string): boolean;
}

interface Parser {
  (postcode: string): string | null;
}

class ValidPostcode {
  private instance: Postcode;

  constructor(postcode: string) {
    this.instance = new Postcode(postcode);
  }

  get valid(): boolean {
    return this.instance.valid();
  }

  get postcode(): string {
    return <string>this.instance.normalise();
  }

  get incode(): string {
    return <string>this.instance.incode();
  }

  get outcode(): string {
    return <string>this.instance.outcode();
  }

  get area(): string {
    return <string>this.instance.area();
  }

  get district(): string {
    return <string>this.instance.district();
  }

  get subDistrict(): string {
    return <string>this.instance.subDistrict();
  }

  get sector(): string {
    return <string>this.instance.sector();
  }

  get unit(): string {
    return <string>this.instance.unit();
  }
}

type InvalidPostcode = {
  valid: false;
  postcode: null;
  incode: null;
  outcode: null;
  area: null;
  district: null;
  subDistrict: null;
  sector: null;
  unit: null;
};

const invalidPostcode: InvalidPostcode = {
  valid: false,
  postcode: null,
  incode: null,
  outcode: null,
  area: null,
  district: null,
  subDistrict: null,
  sector: null,
  unit: null
};

/**
 * Return first elem of input is RegExpMatchArray or null if input null
 */
const firstOrNull = (match: RegExpMatchArray | null): string | null => {
  if (match === null) return null;
  return match[0];
};

const SPACE_REGEX = /\s+/gi;

/**
 * Drop all spaces and uppercase
 */
const sanitize = (s: string): string => {
  return s.replace(SPACE_REGEX, "").toUpperCase();
};

const matchOn = (s: string, regex: RegExp): RegExpMatchArray | null => {
  return sanitize(s).match(regex);
};

const incodeRegex = /\d[a-z]{2}$/i;
const validOutcodeRegex = /^[a-z]{1,2}\d[a-z\d]?$/i;
const VALIDATION_REGEX = /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i;

/**
 * Detects a "valid" postcode
 * - Starts and ends on a non-space character
 * - Any length of intervening space is allowed
 * - Must conform to one of following schemas:
 *  - AA1A 1AA
 *  - A1A 1AA
 *  - A1 1AA
 *  - A99 9AA
 *  - AA9 9AA
 *  - AA99 9AA
 */
const isValid: Validator = postcode => {
  return postcode.match(VALIDATION_REGEX) !== null;
};

/**
 * Returns a normalised postcode string (i.e. uppercased and properly spaced)
 *
 * Returns null if invalid postcode
 */
const toNormalised: Parser = postcode => {
  const outcode = toOutcode(postcode);
  if (outcode === null) return null;
  const incode = toIncode(postcode);
  if (incode === null) return null;
  return `${outcode} ${incode}`;
};

/**
 * Returns a correctly formatted outcode given a postcode
 *
 * Returns null if invalid postcode
 */
const toOutcode: Parser = postcode => {
  if (!isValid(postcode)) return null;
  return sanitize(postcode).replace(incodeRegex, "");
};

/**
 * Returns a correctly formatted incode given a postcode
 *
 * Returns null if invalid postcode
 */
const toIncode: Parser = postcode => {
  if (!isValid(postcode)) return null;
  const match = matchOn(postcode, incodeRegex);
  return firstOrNull(match);
};

const AREA_REGEX = /^[a-z]{1,2}/i;

/**
 * Returns a correctly formatted area given a postcode
 *
 * Returns null if invalid postcode
 */
const toArea: Parser = postcode => {
  if (!isValid(postcode)) return null;
  const match = matchOn(postcode, AREA_REGEX);
  return firstOrNull(match);
};

/**
 * Returns a correctly formatted sector given a postcode
 *
 * Returns null if invalid postcode
 */
const toSector: Parser = postcode => {
  const outcode = toOutcode(postcode);
  if (outcode === null) return null;
  const incode = toIncode(postcode);
  if (incode === null) return null;
  return `${outcode} ${incode[0]}`;
};

const UNIT_REGEX = /[a-z]{2}$/i;

/**
 * Returns a correctly formatted unit given a postcode
 *
 * Returns null if invalid postcode
 */
const toUnit: Parser = postcode => {
  if (!isValid(postcode)) return null;
  const match = matchOn(postcode, UNIT_REGEX);
  return firstOrNull(match);
};

const DISTRICT_SPLIT_REGEX = /^([a-z]{1,2}\d)([a-z])$/i;

/**
 * Returns a correctly formatted district given a postcode
 *
 * Returns null if invalid postcode
 *
 * @example
 *
 * ```
 * toDistrict("AA9 9AA") // => "AA9"
 * toDistrict("A9A 9AA") // => "A9"
 * ```
 */
const toDistrict: Parser = postcode => {
  const outcode = toOutcode(postcode);
  if (outcode === null) return null;
  const match = outcode.match(DISTRICT_SPLIT_REGEX);
  if (match === null) return outcode;
  return match[1];
};

/**
 * Returns a correctly formatted subdistrict given a postcode
 *
 * Returns null if no subdistrict is available on valid postcode
 * Returns null if invalid postcode
 *
 * @example
 *
 * ```
 * toSubDistrict("AA9A 9AA") // => "AA9A"
 * toSubDistrict("A9A 9AA") // => "A9A"
 * toSubDistrict("AA9 9AA") // => null
 * toSubDistrict("A9 9AA") // => null
 * ```
 */
const toSubDistrict: Parser = postcode => {
  const outcode = toOutcode(postcode);
  if (outcode === null) return null;
  const split = outcode.match(DISTRICT_SPLIT_REGEX);
  if (split === null) return null;
  return outcode;
};

const returnNull = () => null;

/**
 * Postcode
 *
 * This wraps an input postcode string and provides instance methods to
 * validate, normalise or extract postcode data.
 *
 * This API is a bit more cumbersome that it needs to be. You should
 * favour `Postcode.parse()` or a static method depending on the
 * task at hand.
 */
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
    this._valid = isValid(postcode);

    // All parse methods should return null if invalid
    if (!this._valid) {
      this.incode = returnNull;
      this.outcode = returnNull;
      this.area = returnNull;
      this.district = returnNull;
      this.subDistrict = returnNull;
      this.sector = returnNull;
      this.unit = returnNull;
      this.normalise = returnNull;
    }
  }

  static isValid = isValid;
  static toNormalised = toNormalised;
  static toOutcode = toOutcode;
  static toIncode = toIncode;
  static toArea = toArea;
  static toSector = toSector;
  static toUnit = toUnit;
  static toDistrict = toDistrict;
  static toSubDistrict = toSubDistrict;

  static validOutcode(outcode: string): boolean {
    return outcode.match(validOutcodeRegex) !== null;
  }

  static parse(postcode: string): ValidPostcode | InvalidPostcode {
    if (isValid(postcode)) return new ValidPostcode(postcode);
    return { ...invalidPostcode };
  }

  valid(): boolean {
    return this._valid;
  }

  incode(): string | null {
    if (this._incode) return this._incode;
    return (this._incode = toIncode(this._raw));
  }

  outcode(): string | null {
    if (this._outcode) return this._outcode;
    return (this._outcode = toOutcode(this._raw));
  }

  area(): string | null {
    if (this._area) return this._area;
    return (this._area = toArea(this._raw));
  }

  district(): string | null {
    if (this._district) return this._district;
    return (this._district = toDistrict(this._raw));
  }

  subDistrict(): string | null {
    if (this._subDistrict) return this._subDistrict;
    return (this._subDistrict = toSubDistrict(this._raw));
  }

  sector(): string | null {
    if (this._sector) return this._sector;
    return (this._sector = toSector(this._raw));
  }

  unit(): string | null {
    if (this._unit) return this._unit;
    return (this._unit = toUnit(this._raw));
  }

  normalise(): string | null {
    return `${this.outcode()} ${this.incode()}`;
  }
}

export = Postcode;
