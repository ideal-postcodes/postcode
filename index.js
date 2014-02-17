"use strict";

var validationRegex = /^[a-z0-9]{1,4}\s*?\d[a-z]{2}$/i,
		incodeRegex = /\d[a-z]{2}$/i,
		validOutcodeRegex = /[a-z0-9]{1,4}/i;

function isValidPostcode (postcode) {
	return !!postcode.match(validationRegex);
}

function parseOutcode (postcode) {
	return postcode.replace(incodeRegex, "").replace(/\s+/, "");
}

function parseIncode (postcode) {
	return postcode.match(incodeRegex)[0];
}

function Postcode (rawPostcode) {
	this._raw = rawPostcode;
	this._valid = isValidPostcode(rawPostcode);

	if (!this._valid) {
		return null;
	}
}

Postcode.validOutcode = function (outcode) {
	return !!outcode.match(validationRegex);
}

Postcode.prototype.valid = function () {
	return this._valid;
}

Postcode.prototype.incode = function () {
	if (!this._valid) return null;
	if (this._incode) return this._incode;
	this._incode = parseIncode(this._raw).toUpperCase();
	return this._incode;
}

Postcode.prototype.outcode = function () {
	if (!this._valid) return null;
	if (this._outcode) return this._outcode;
	this._outcode = parseOutcode(this._raw).toUpperCase();
	return this._outcode;
}

Postcode.prototype.normalise = function () {
	if (!this._valid) return null;
	if (this.postcode) return this.postcode;
	return [this.outcode()," ", this.incode()].join("");
}

module.exports = Postcode;