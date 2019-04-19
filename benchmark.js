"use strict";
const inv = require("install-npm-version");
const benchmarkVersion = "1.0.1";
const benchmarkLib = `postcode@${benchmarkVersion}`;

const message = `
	Benchmarking master against ${benchmarkLib}

`;

inv
  .Install(benchmarkLib, { Verbosity: "debug" })
  .then(() => runBenchmarks())
  .catch(error => {
    console.log(error);
    process.exit(1);
  });

const runBenchmarks = () => {
  const { Suite } = require("benchmark");
  const suite = new Suite();

  const Postcode = require("./dist/index");
  const PreviousPostcode = require(benchmarkLib);

  const extractInputs = ({ tests }) => tests.map(({ base }) => base);

  const validation = extractInputs(require("./test/data/validation.json"));
  suite
    .add(`(version: ${benchmarkVersion}) Postcode#valid`, () => {
      validation.forEach(postcode => {
        const result = new PreviousPostcode(postcode).valid();
      });
    })
    .add("(version: master) Postcode.isValid", () => {
      validation.forEach(postcode => {
        const result = Postcode.isValid(postcode);
      });
    })
    .on("cycle", event => {
      console.log(String(event.target));
    })
    .run({});
};
