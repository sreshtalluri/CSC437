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
var videographer_svc_exports = {};
__export(videographer_svc_exports, {
  default: () => videographer_svc_default
});
module.exports = __toCommonJS(videographer_svc_exports);
var import_mongoose = require("mongoose");
const VideographerSchema = new import_mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    type: { type: String, required: true, default: "videographer" },
    name: { type: String, required: true, trim: true },
    contact: { type: String, required: true, trim: true },
    website: { type: String, required: true, trim: true },
    specialty: { type: String, required: true, trim: true }
  },
  { collection: "videographers" }
);
const VideographerModel = (0, import_mongoose.model)("Videographer", VideographerSchema);
function index() {
  return VideographerModel.find();
}
function get(id) {
  return VideographerModel.findOne({ id }).then((videographer) => {
    if (!videographer) throw `Videographer with id ${id} Not Found`;
    return videographer;
  });
}
function create(json) {
  const v = new VideographerModel(json);
  return v.save();
}
function update(id, videographer) {
  return VideographerModel.findOneAndUpdate({ id }, videographer, { new: true }).then((updated) => {
    if (!updated) throw `Videographer with id ${id} not updated`;
    else return updated;
  });
}
function remove(id) {
  return VideographerModel.findOneAndDelete({ id }).then((deleted) => {
    if (!deleted) throw `Videographer with id ${id} not deleted`;
  });
}
var videographer_svc_default = { index, get, create, update, remove };
