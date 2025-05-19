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
var photographers_exports = {};
__export(photographers_exports, {
  default: () => photographers_default
});
module.exports = __toCommonJS(photographers_exports);
var import_express = __toESM(require("express"));
var import_photographer_svc = __toESM(require("../services/photographer-svc"));
const router = import_express.default.Router();
router.get("/", (req, res) => {
  import_photographer_svc.default.index().then((list) => {
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
  import_photographer_svc.default.get(id).then((photographer) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(photographer));
  }).catch((err) => {
    res.status(404).send();
  });
});
router.post("/", (req, res) => {
  const newPhotographer = req.body;
  import_photographer_svc.default.create(newPhotographer).then(
    (photographer) => res.status(201).json(photographer)
  ).catch((err) => res.status(500).send(err));
});
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const photographer = req.body;
  import_photographer_svc.default.update(id, photographer).then(
    (photographer2) => res.json(photographer2)
  ).catch((err) => res.status(404).end());
});
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  import_photographer_svc.default.remove(id).then(() => res.status(204).end()).catch((err) => res.status(404).send(err));
});
var photographers_default = router;
