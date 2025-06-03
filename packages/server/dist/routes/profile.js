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
var profile_exports = {};
__export(profile_exports, {
  default: () => profile_default
});
module.exports = __toCommonJS(profile_exports);
var import_express = __toESM(require("express"));
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_auth = require("./auth");
var import_profile_svc = __toESM(require("../services/profile-svc"));
const router = import_express.default.Router();
const TOKEN_SECRET = process.env.TOKEN_SECRET || "NOT_A_SECRET";
router.get("/", import_auth.authenticateUser, (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).send("No token provided");
    return;
  }
  try {
    const decoded = import_jsonwebtoken.default.verify(token, TOKEN_SECRET);
    import_profile_svc.default.get(decoded.username).then((profile) => {
      res.json(profile);
    }).catch((err) => {
      res.status(500).send(err);
    });
  } catch (error) {
    res.status(401).send("Invalid token");
  }
});
router.put("/", import_auth.authenticateUser, (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).send("No token provided");
    return;
  }
  try {
    const decoded = import_jsonwebtoken.default.verify(token, TOKEN_SECRET);
    import_profile_svc.default.update(decoded.username, req.body).then((profile) => {
      res.json(profile);
    }).catch((err) => {
      res.status(404).end();
    });
  } catch (error) {
    res.status(401).send("Invalid token");
  }
});
router.put("/event", import_auth.authenticateUser, (req, res) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).send("No token provided");
    return;
  }
  try {
    const decoded = import_jsonwebtoken.default.verify(token, TOKEN_SECRET);
    import_profile_svc.default.updateEvent(decoded.username, req.body).then((profile) => {
      res.json(profile);
    }).catch((err) => {
      res.status(404).end();
    });
  } catch (error) {
    res.status(401).send("Invalid token");
  }
});
var profile_default = router;
