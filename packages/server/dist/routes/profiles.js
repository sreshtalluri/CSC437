"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var profiles_exports = {};
__export(profiles_exports, {
  default: () => profiles_default
});
module.exports = __toCommonJS(profiles_exports);
var import_express = __toESM(require("express"));
var import_profile_svc = __toESM(require("../services/profile-svc"));
const router = import_express.default.Router();
router.get("/", (req, res) => {
  const username = req.query.username;
  if (!username) {
    res.status(400).send("Username is required");
    return;
  }
  import_profile_svc.default.get(username).then((profile) => {
    res.json(profile);
  }).catch((err) => {
    res.status(500).send(err);
  });
});
router.put("/", (req, res) => {
  const username = req.query.username;
  const profile = req.body;
  if (!username) {
    res.status(400).send("Username is required");
    return;
  }
  import_profile_svc.default.update(username, profile).then((profile2) => {
    res.json(profile2);
  }).catch((err) => {
    res.status(404).end();
  });
});
router.put("/event", (req, res) => {
  const username = req.query.username;
  const eventData = req.body;
  if (!username) {
    res.status(400).send("Username is required");
    return;
  }
  import_profile_svc.default.updateEvent(username, eventData).then((profile) => {
    res.json(profile);
  }).catch((err) => {
    res.status(404).end();
  });
});
var profiles_default = router;
