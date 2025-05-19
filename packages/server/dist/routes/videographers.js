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
var videographers_exports = {};
__export(videographers_exports, {
  default: () => videographers_default
});
module.exports = __toCommonJS(videographers_exports);
var import_express = __toESM(require("express"));
var import_videographer_svc = __toESM(require("../services/videographer-svc"));
const router = import_express.default.Router();
router.get("/", (req, res) => {
  import_videographer_svc.default.index().then((list) => {
    res.json(list);
  }).catch((err) => {
    res.status(500).send(err);
  });
});
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send("Invalid ID format");
    return;
  }
  import_videographer_svc.default.get(id).then((videographer) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(videographer));
  }).catch((err) => {
    res.status(404).send();
  });
});
router.post("/", (req, res) => {
  const newVideographer = req.body;
  import_videographer_svc.default.create(newVideographer).then(
    (videographer) => res.status(201).json(videographer)
  ).catch((err) => res.status(500).send(err));
});
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const videographer = req.body;
  import_videographer_svc.default.update(id, videographer).then(
    (videographer2) => res.json(videographer2)
  ).catch((err) => res.status(404).end());
});
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  import_videographer_svc.default.remove(id).then(() => res.status(204).end()).catch((err) => res.status(404).send(err));
});
var videographers_default = router;
