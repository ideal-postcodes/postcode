"use strict";

const benchmarkVersion = [...process.argv].pop();

const noVersionMessage = `Aborted benchmark

Please specify a bench version. E.g: npm run benchmark -- 2.0.0
`;

if (benchmarkVersion.match(/\d+\.\d+\.\d+/) === null) {
  console.log(noVersionMessage);
  return process.exit(1);
}

const benchmarkLib = `postcode@${benchmarkVersion}`;

const message = `
	Benchmarking master against postcode@${benchmarkLib}
`;

console.log(message);

require("install-npm-version")
  .Install(benchmarkLib, { Verbosity: "debug" })
  .then(() => runBenchmarks())
  .catch(error => {
    console.log(error);
    process.exit(1);
  });

const runBenchmarks = () => {
  const { Suite } = require("benchmark");
  const newSuite = name => new Suite({ name });

  const Postcode = require("./dist/index");
  const PreviousPostcode = require(benchmarkLib);

  const extractInputs = ({ tests }) => tests.map(({ base }) => base);

  const validation = extractInputs(require("./test/data/validation.json"));
  const areas = extractInputs(require("./test/data/areas.json"));
  const districts = extractInputs(require("./test/data/districts.json"));
  const incodes = extractInputs(require("./test/data/incodes.json"));
  const normalisation = extractInputs(
    require("./test/data/normalisation.json")
  );
  const outcodes = extractInputs(require("./test/data/outcodes.json"));
  const sectors = extractInputs(require("./test/data/sectors.json"));
  const subDistricts = extractInputs(require("./test/data/sub-districts.json"));
  const units = extractInputs(require("./test/data/units.json"));

  newSuite(".isValid")
    .add(benchmarkVersion, () => {
      validation.forEach(postcode => PreviousPostcode.isValid(postcode));
    })
    .add("master", () => {
      validation.forEach(postcode => Postcode.isValid(postcode));
    })
    .on("cycle", event => {
      console.log(String(event.target));
    })
    .run({});

  newSuite(".toArea")
    .add(benchmarkVersion, () => {
      areas.forEach(postcode => PreviousPostcode.toArea(postcode));
    })
    .add("master", () => {
      areas.forEach(postcode => Postcode.toArea(postcode));
    })
    .on("cycle", event => {
      console.log(String(event.target));
    })
    .run({});

  newSuite(".toDistrict")
    .add(benchmarkVersion, () => {
      districts.forEach(postcode => PreviousPostcode.toDistrict(postcode));
    })
    .add("master", () => {
      districts.forEach(postcode => Postcode.toDistrict(postcode));
    })
    .on("cycle", event => {
      console.log(String(event.target));
    })
    .run({});

  newSuite(".toNormalised")
    .add(benchmarkVersion, () => {
      incodes.forEach(postcode => PreviousPostcode.toIncode(postcode));
    })
    .add("master", () => {
      incodes.forEach(postcode => Postcode.toIncode(postcode));
    })
    .on("cycle", event => {
      console.log(String(event.target));
    })
    .run({});

  newSuite(".toNormalised")
    .add(benchmarkVersion, () => {
      normalisation.forEach(postcode =>
        PreviousPostcode.toNormalised(postcode)
      );
    })
    .add("master", () => {
      normalisation.forEach(postcode => Postcode.toNormalised(postcode));
    })
    .on("cycle", event => {
      console.log(String(event.target));
    })
    .run({});

  newSuite(".toOutcode")
    .add(benchmarkVersion, () => {
      outcodes.forEach(postcode => PreviousPostcode.toOutcode(postcode));
    })
    .add("master", () => {
      outcodes.forEach(postcode => Postcode.toOutcode(postcode));
    })
    .on("cycle", event => {
      console.log(String(event.target));
    })
    .run({});

  newSuite(".toSector")
    .add(benchmarkVersion, () => {
      sectors.forEach(postcode => PreviousPostcode.toSector(postcode));
    })
    .add("master", () => {
      sectors.forEach(postcode => Postcode.toSector(postcode));
    })
    .on("cycle", event => {
      console.log(String(event.target));
    })
    .run({});

  newSuite("toSubDistrict")
    .add(benchmarkVersion, () => {
      subDistricts.forEach(postcode =>
        PreviousPostcode.toSubDistrict(postcode)
      );
    })
    .add("master", () => {
      subDistricts.forEach(postcode => Postcode.toSubDistrict(postcode));
    })
    .on("cycle", event => {
      console.log(String(event.target));
    })
    .run({});

  newSuite("toUnit")
    .add(benchmarkVersion, () => {
      units.forEach(postcode => PreviousPostcode.toUnit(postcode));
    })
    .add("master", () => {
      units.forEach(postcode => Postcode.toUnit(postcode));
    })
    .on("cycle", event => {
      console.log(String(event.target));
    })
    .run({});
};
