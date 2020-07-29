# [5.0.0](https://github.com/ideal-postcodes/postcode/compare/4.0.0...5.0.0) (2020-07-29)


### Features

* **5.0.0:** API Updates ([9d576c8](https://github.com/ideal-postcodes/postcode/commit/9d576c86d14893c759184fc5462f8cbfdd066ecc))
* **ES Modules:** Create ES Module compatible build ([44ef920](https://github.com/ideal-postcodes/postcode/commit/44ef92046e0dd3b12df7a4c50e3383d16753358b))
* **Match:** Implement match ([95f1d0e](https://github.com/ideal-postcodes/postcode/commit/95f1d0e0c96ce4e04a547c922592d910772b16e0))
* **Regex:** Exports and documents used Regexs ([dd1315d](https://github.com/ideal-postcodes/postcode/commit/dd1315d854506ba1b9f87dcc9be71a5d0a6070bd))
* **Replace:** Implement replace ([deb348b](https://github.com/ideal-postcodes/postcode/commit/deb348bbc445168270518520a8c1753cf2ac50f0))


### BREAKING CHANGES

* **5.0.0:** - `postcode` no longer uses default exports. All exports are named
- `postcode` no longer exports a class
- Legacy `new Postcode()` functionality has been removed. Methods attached to `Postcode` are all available as named exports. E.g. `new Postcode(postcode).unit()` becomes `toUnit(postcode)`;

# [4.0.0](https://github.com/ideal-postcodes/postcode/compare/3.0.0...4.0.0) (2020-06-25)


### chore

* **Node:** Drop Node 8, add 14 ([e7a0f43](https://github.com/ideal-postcodes/postcode/commit/e7a0f43dd9a3dabbd226eb203a364ee7397f3342))


### BREAKING CHANGES

* **Node:** Node 8 no longer supported

# [3.0.0](https://github.com/ideal-postcodes/postcode/compare/2.0.1...3.0.0) (2020-06-25)


### chore

* **Node:** Drop explicit support for Node 8 ([53393f1](https://github.com/ideal-postcodes/postcode/commit/53393f16a0f34979c26ff1dccce1ac077f335fb1))


### BREAKING CHANGES

* **Node:** Node 8 no longer forms part of CI testing

## [2.0.1](https://github.com/ideal-postcodes/postcode/compare/2.0.0...2.0.1) (2020-01-02)

Only significant change is typescript upgrade (3.7)

Test automated tagging and npm publish with semantic release

Cosmetic changes since 2.0.0:
- Improved docs
- Updated dev dependencies
- General maintenance

* **Release:** Trigger patch version bump ([96d0ecd](https://github.com/ideal-postcodes/postcode/commit/96d0ecdfdd996b9672092275e449d91ab515101c))

## 2.0.0 (12/02/2019)

- *Breaking Change*: Require minimum node.js of 8.0.0
- Ported to typescript (now exports typings)
- Provides a cleaner, more modern API to extract and parse while supporting old methods
  - Add static methods to extract single datapoints
  - Add a ValidPostcode class with accessor methods which can be destructured
- Updated documentation: [postcodejs.ideal-postcodes.dev](https://postcodejs.ideal-postcodes.dev)
- Added benchmarking

## 1.0.1 (12/02/2019)

- Add runkit example
- Rename github repo to `ideal-postcodes/postcode`

## 1.0.0 (12/02/2019)

- Test on node 8 and above only
- Drop unused branches
- Update dependencies
- Add coverage testing
