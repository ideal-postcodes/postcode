export const DISTRICT_SPLIT_REGEX = /^([a-z]{1,2}\d)([a-z])$/i;
export const UNIT_REGEX = /[a-z]{2}$/i;
export const INCODE_REGEX = /\d[a-z]{2}$/i;
export const OUTCODE_REGEX = /^[a-z]{1,2}\d[a-z\d]?$/i;
export const POSTCODE_REGEX = /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i;
export const AREA_REGEX = /^[a-z]{1,2}/i;

interface Validator {
  (input: string): boolean;
}

interface Parser {
  (postcode: string): string | null;
}

type ValidPostcode = {
  valid: true;
  postcode: string;
  incode: string;
  outcode: string;
  area: string;
  district: string;
  subDistrict: string | null;
  sector: string;
  unit: string;
};

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
  unit: null,
};

/**
 * Return first elem of input is RegExpMatchArray or null if input null
 * @hidden
 */
const firstOrNull = (match: RegExpMatchArray | null): string | null => {
  if (match === null) return null;
  return match[0];
};

const SPACE_REGEX = /\s+/gi;

/**
 * Drop all spaces and uppercase
 * @hidden
 */
const sanitize = (s: string): string =>
  s.replace(SPACE_REGEX, "").toUpperCase();

/**
 * Sanitizes string and returns regex matches
 * @hidden
 */
const matchOn = (s: string, regex: RegExp): RegExpMatchArray | null =>
  sanitize(s).match(regex);

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
export const isValid: Validator = (postcode) =>
  postcode.match(POSTCODE_REGEX) !== null;

/**
 * Returns true if string is a valid outcode
 */
export const validOutcode: Validator = (outcode) =>
  outcode.match(OUTCODE_REGEX) !== null;

/**
 * Returns a normalised postcode string (i.e. uppercased and properly spaced)
 *
 * Returns null if invalid postcode
 */
export const toNormalised: Parser = (postcode) => {
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
export const toOutcode: Parser = (postcode) => {
  if (!isValid(postcode)) return null;
  return sanitize(postcode).replace(INCODE_REGEX, "");
};

/**
 * Returns a correctly formatted incode given a postcode
 *
 * Returns null if invalid postcode
 */
export const toIncode: Parser = (postcode) => {
  if (!isValid(postcode)) return null;
  const match = matchOn(postcode, INCODE_REGEX);
  return firstOrNull(match);
};

/**
 * Returns a correctly formatted area given a postcode
 *
 * Returns null if invalid postcode
 */
export const toArea: Parser = (postcode) => {
  if (!isValid(postcode)) return null;
  const match = matchOn(postcode, AREA_REGEX);
  return firstOrNull(match);
};

/**
 * Returns a correctly formatted sector given a postcode
 *
 * Returns null if invalid postcode
 */
export const toSector: Parser = (postcode) => {
  const outcode = toOutcode(postcode);
  if (outcode === null) return null;
  const incode = toIncode(postcode);
  if (incode === null) return null;
  return `${outcode} ${incode[0]}`;
};

/**
 * Returns a correctly formatted unit given a postcode
 *
 * Returns null if invalid postcode
 */
export const toUnit: Parser = (postcode) => {
  if (!isValid(postcode)) return null;
  const match = matchOn(postcode, UNIT_REGEX);
  return firstOrNull(match);
};

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
export const toDistrict: Parser = (postcode) => {
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
export const toSubDistrict: Parser = (postcode) => {
  const outcode = toOutcode(postcode);
  if (outcode === null) return null;
  const split = outcode.match(DISTRICT_SPLIT_REGEX);
  if (split === null) return null;
  return outcode;
};

/**
 * Returns a ValidPostcode or InvalidPostcode object from a postcode string
 */
export const parse = (postcode: string): ValidPostcode | InvalidPostcode => {
  if (!isValid(postcode)) return { ...invalidPostcode };
  return {
    valid: true,
    postcode: toNormalised(postcode) as string,
    incode: toIncode(postcode) as string,
    outcode: toOutcode(postcode) as string,
    area: toArea(postcode) as string,
    district: toDistrict(postcode) as string,
    subDistrict: toSubDistrict(postcode),
    sector: toSector(postcode) as string,
    unit: toUnit(postcode) as string,
  };
};
