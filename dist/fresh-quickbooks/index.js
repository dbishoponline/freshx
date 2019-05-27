"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.transform = exports.transformRecord = exports.bodyRecord = exports.headerRecord = void 0;

var _ramda = require("ramda");

var _helpers = require("./helpers");

var quickbooksColumns = [['Name', ''], ['Company', ''], ['Customer Type', ''], ['Email', ''], ['Phone', ''], ['Mobile', ''], ['Fax', ''], ['Website', ''], ['Street', ''], ['City', ''], ['State', ''], ['ZIP', ''], ['Country', ''], ['Opening Balance', ''], ['Date', ''], ['Resale Number', '']]; // TODO: add more validation

var Record = function Record(record) {
  if (!(0, _ramda.allPass)([true, true])) {
    throw new Error("CSV columns are not valid.");
    return record;
  }

  return record;
};

var headerRecord = function headerRecord(columns) {
  return columns.map(function (val) {
    return val.slice(0, 1).toString();
  });
};

exports.headerRecord = headerRecord;

var bodyRecord = function bodyRecord(record) {
  return transformRecord(record);
};

exports.bodyRecord = bodyRecord;

var transformRecord = function transformRecord(record) {
  var organization = record[0];
  var firstName = record[1];
  var lastName = record[2];
  var email = record[3];
  var phone = record[4];
  var street = record[5];
  var city = record[6];
  var state = record[7];
  var country = record[8];
  var postalCode = record[9];
  var notes = record[10];
  return quickbooksColumns.map(function (val) {
    var update = {
      Name: "".concat(firstName, " ").concat(lastName),
      Company: "".concat(organization),
      Email: "".concat(email),
      Phone: "".concat(phone),
      Street: "".concat(street),
      City: "".concat(city),
      State: "".concat(state),
      ZIP: "".concat(postalCode),
      Country: "".concat(country)
    };
    return update[val.slice(0, 1)];
  });
};

exports.transformRecord = transformRecord;
var count = 0;

var transform = function transform(record) {
  var newRecord = !count ? headerRecord(quickbooksColumns) : bodyRecord(Record(record));
  count++;
  return newRecord;
};

exports.transform = transform;
var _default = {
  transform: transform
};
exports.default = _default;