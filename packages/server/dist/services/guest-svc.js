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
var guest_svc_exports = {};
__export(guest_svc_exports, {
  default: () => guest_svc_default
});
module.exports = __toCommonJS(guest_svc_exports);
var import_mongoose = require("mongoose");
const GuestSchema = new import_mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    type: { type: String, required: true, default: "guest" },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    rsvp: { type: String, required: true, trim: true }
  },
  { collection: "guests" }
);
const GuestModel = (0, import_mongoose.model)("Guest", GuestSchema);
function index() {
  return GuestModel.find();
}
function get(id) {
  return GuestModel.findOne({ id }).then((guest) => {
    if (!guest) throw `Guest with id ${id} Not Found`;
    return guest;
  });
}
function create(json) {
  const g = new GuestModel(json);
  return g.save();
}
function update(id, guest) {
  return GuestModel.findOneAndUpdate({ id }, guest, { new: true }).then((updated) => {
    if (!updated) throw `Guest with id ${id} not updated`;
    else return updated;
  });
}
function remove(id) {
  return GuestModel.findOneAndDelete({ id }).then((deleted) => {
    if (!deleted) throw `Guest with id ${id} not deleted`;
  });
}
var guest_svc_default = { index, get, create, update, remove };
