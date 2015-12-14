"use strict";

var validationRegex = /^[a-z]{1,2}\d[a-z\d]?\s*\d[a-z]{2}$/i,
		incodeRegex = /\d[a-z]{2}$/i,
		validOutcodeRegex = /^[a-z]{1,2}\d[a-z\d]?$/i,
		areaRegex = /^[a-z]{1,2}/i,
		districtSplitRegex = /^([a-z]{1,2}\d)([a-z])$/i,
		sectorRegex = /^[a-z]{1,2}\d[a-z\d]?\s*\d/i,
		unitRegex = /[a-z]{2}$/i;

function isValidPostcode (postcode) {
	return !!postcode.match(validationRegex);
}

function parseOutcode (postcode) {
	return postcode.replace(incodeRegex, "").replace(/\s+/, "");
}

function parseIncode (postcode) {
	return postcode.match(incodeRegex)[0];
}

function parseArea (postcode) {
	return postcode.match(areaRegex)[0];
}

function parseSector (postcode) {
	return postcode.match(sectorRegex)[0];
}

function parseUnit (postcode) {
	return postcode.match(unitRegex)[0];
}

function Postcode (rawPostcode) {
	this._raw = rawPostcode;
	this._valid = isValidPostcode(rawPostcode);
}

Postcode.validOutcode = function (outcode) {
	return !!outcode.match(validOutcodeRegex);
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

Postcode.prototype.area = function () {
	if (!this._valid) return null;
	if (this._area) return this._area;
	this._area = parseArea(this._raw).toUpperCase();
	return this._area;
}

Postcode.prototype.district = function () {
	if (!this._valid) return null;
	if (this._district) return this._district;
	var outcode = this.outcode();
	var split = outcode.match(districtSplitRegex);
	this._district = split ? split[1] : outcode;
	return this._district;
}

Postcode.prototype.subDistrict = function () {
	if (!this._valid) return null;
	if (this._subDistrict) return this._subDistrict;
	var outcode = this.outcode();
	var split = outcode.match(districtSplitRegex);
	this._subDistrict = split ? outcode : null;
	return this._subDistrict;
}

Postcode.prototype.sector = function () {
	if (!this._valid) return null;
	if (this._sector) return this._sector;
	this._sector = parseSector(this.normalise()).toUpperCase();
	return this._sector;
}

Postcode.prototype.unit = function () {
	if (!this._valid) return null;
	if (this._unit) return this._unit;
	this._unit = parseUnit(this._raw).toUpperCase();
	return this._unit;
}

Postcode.prototype.normalise = function () {
	if (!this._valid) return null;
	if (this.postcode) return this.postcode;
	return [this.outcode()," ", this.incode()].join("");
}

module.exports = Postcode;
