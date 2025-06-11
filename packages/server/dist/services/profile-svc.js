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
var profile_svc_exports = {};
__export(profile_svc_exports, {
  default: () => profile_svc_default
});
module.exports = __toCommonJS(profile_svc_exports);
var import_mongoose = require("mongoose");
const ProfileSchema = new import_mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    role: { type: String, required: true },
    event_name: { type: String, required: true },
    event_date: { type: String, required: true },
    event_time: { type: String, required: true },
    event_description: { type: String, required: true },
    event_status: {
      type: String,
      required: true,
      enum: ["upcoming", "past", "cancelled"],
      default: "upcoming"
    }
  },
  { collection: "profiles" }
);
const ProfileModel = (0, import_mongoose.model)("Profile", ProfileSchema);
function create(username) {
  const newProfile = new ProfileModel({
    username,
    firstName: "New",
    lastName: "User",
    email: `${username}@example.com`,
    phone: "123-456-7890",
    role: "user",
    event_name: "Welcome Event",
    event_date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    // Today's date
    event_time: "12:00 PM",
    event_description: "Welcome to the Event Planner! This is your first event. Feel free to edit or delete it.",
    event_status: "upcoming"
  });
  return newProfile.save();
}
function get(username) {
  return ProfileModel.findOne({ username }).then((profile) => {
    if (!profile) throw `Profile for ${username} not found`;
    return profile;
  });
}
function update(username, profile) {
  return ProfileModel.findOneAndUpdate(
    { username },
    profile,
    { new: true }
  ).then((updated) => {
    if (!updated) throw `Profile for ${username} not updated`;
    return updated;
  });
}
function updateEvent(username, eventData) {
  return ProfileModel.findOneAndUpdate(
    { username },
    {
      $set: {
        event_name: eventData.event_name,
        event_date: eventData.event_date,
        event_time: eventData.event_time,
        event_description: eventData.event_description,
        event_status: eventData.event_status
      }
    },
    { new: true }
  ).then((updated) => {
    if (!updated) throw `Profile for ${username} not found`;
    return updated;
  });
}
var profile_svc_default = { create, get, update, updateEvent };
