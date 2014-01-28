"use strict";

var validationRegex = /^[a-z0-9]{1,4}\s*?\d[a-z]{2}$/i,
		outcodeRegex = /\d[a-z]{2}$/i;

function isValidPostcode (postcode) {
	return !!postcode.match(validationRegex);
}

function parseIncode (postcode) {
	return postcode.replace(outcodeRegex, "").replace(/\s+/, "");
}

function parseOutcode (postcode) {
	return postcode.match(outcodeRegex)[0];
}

function Postcode (rawPostcode) {
	this._raw = rawPostcode;
	this._valid = isValidPostcode(rawPostcode);

	if (!this._valid) {
		return null;
	}
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
	return [this.incode()," ", this.outcode()].join("");
}

module.exports = Postcode;