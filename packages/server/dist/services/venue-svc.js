"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var venue_svc_exports = {};
__export(venue_svc_exports, {
  default: () => venue_svc_default
});
module.exports = __toCommonJS(venue_svc_exports);
var import_mongoose = require("mongoose");
const VenueSchema = new import_mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    type: { type: String, required: true, default: "venue" },
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    capacity: { type: Number, required: true },
    contact: { type: String, required: true, trim: true }
  },
  { collection: "venues" }
);
const VenueModel = (0, import_mongoose.model)("Venue", VenueSchema);
function index() {
  return VenueModel.find();
}
function get(id) {
  return VenueModel.findOne({ id }).then((venue) => {
    if (!venue) throw `Venue with id ${id} Not Found`;
    return venue;
  });
}
var venue_svc_default = { index, get };
