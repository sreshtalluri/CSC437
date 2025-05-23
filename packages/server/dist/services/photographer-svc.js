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
var photographer_svc_exports = {};
__export(photographer_svc_exports, {
  default: () => photographer_svc_default
});
module.exports = __toCommonJS(photographer_svc_exports);
var import_mongoose = require("mongoose");
const PhotographerSchema = new import_mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    type: { type: String, required: true, default: "photographer" },
    name: { type: String, required: true, trim: true },
    contact: { type: String, required: true, trim: true },
    website: { type: String, required: true, trim: true },
    specialty: { type: String, required: true, trim: true }
  },
  { collection: "photographers" }
);
const PhotographerModel = (0, import_mongoose.model)("Photographer", PhotographerSchema);
function index() {
  return PhotographerModel.find();
}
function get(id) {
  return PhotographerModel.findOne({ id }).then((photographer) => {
    if (!photographer) throw `Photographer with id ${id} Not Found`;
    return photographer;
  });
}
function create(json) {
  const p = new PhotographerModel(json);
  return p.save();
}
function update(id, photographer) {
  return PhotographerModel.findOneAndUpdate({ id }, photographer, { new: true }).then((updated) => {
    if (!updated) throw `Photographer with id ${id} not updated`;
    else return updated;
  });
}
function remove(id) {
  return PhotographerModel.findOneAndDelete({ id }).then((deleted) => {
    if (!deleted) throw `Photographer with id ${id} not deleted`;
  });
}
var photographer_svc_default = { index, get, create, update, remove };
