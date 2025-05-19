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
var restaurant_svc_exports = {};
__export(restaurant_svc_exports, {
  default: () => restaurant_svc_default
});
module.exports = __toCommonJS(restaurant_svc_exports);
var import_mongoose = require("mongoose");
const RestaurantSchema = new import_mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    type: { type: String, required: true, default: "restaurant" },
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    contact: { type: String, required: true, trim: true },
    website: { type: String, required: true, trim: true },
    cuisine: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }
  },
  { collection: "restaurants" }
);
const RestaurantModel = (0, import_mongoose.model)("Restaurant", RestaurantSchema);
function index() {
  return RestaurantModel.find();
}
function get(id) {
  return RestaurantModel.findOne({ id }).then((restaurant) => {
    if (!restaurant) throw `Restaurant with id ${id} Not Found`;
    return restaurant;
  });
}
function create(json) {
  const r = new RestaurantModel(json);
  return r.save();
}
function update(id, restaurant) {
  return RestaurantModel.findOneAndUpdate({ id }, restaurant, { new: true }).then((updated) => {
    if (!updated) throw `Restaurant with id ${id} not updated`;
    else return updated;
  });
}
function remove(id) {
  return RestaurantModel.findOneAndDelete({ id }).then((deleted) => {
    if (!deleted) throw `Restaurant with id ${id} not deleted`;
  });
}
var restaurant_svc_default = { index, get, create, update, remove };
