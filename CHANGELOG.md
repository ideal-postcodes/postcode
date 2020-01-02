## [2.0.1](https://github.com/ideal-postcodes/postcode/compare/2.0.0...2.0.1) (2020-01-02)


### Bug Fixes

* **Release:** Trigger patch version bump ([96d0ecd](https://github.com/ideal-postcodes/postcode/commit/96d0ecdfdd996b9672092275e449d91ab515101c))

# Changelog

Any changes, including backwards incompatible changes will be listed here

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
