"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_express = __toESM(require("express"));
var import_mongo = require("./services/mongo");
var import_venues = __toESM(require("./routes/venues"));
var import_photographers = __toESM(require("./routes/photographers"));
var import_videographers = __toESM(require("./routes/videographers"));
var import_guests = __toESM(require("./routes/guests"));
var import_restaurants = __toESM(require("./routes/restaurants"));
var import_venue_svc = __toESM(require("./services/venue-svc"));
var import_photographer_svc = __toESM(require("./services/photographer-svc"));
var import_videographer_svc = __toESM(require("./services/videographer-svc"));
var import_guest_svc = __toESM(require("./services/guest-svc"));
var import_restaurant_svc = __toESM(require("./services/restaurant-svc"));
const app = (0, import_express.default)();
const port = process.env.PORT || 3e3;
const staticDir = process.env.STATIC || "public";
(0, import_mongo.connect)("eventplan");
app.use(import_express.default.static(staticDir));
app.use(import_express.default.json());
app.use("/api/venues", import_venues.default);
app.use("/api/photographers", import_photographers.default);
app.use("/api/videographers", import_videographers.default);
app.use("/api/guests", import_guests.default);
app.use("/api/restaurants", import_restaurants.default);
app.get("/venues", (req, res) => {
  import_venue_svc.default.index().then((venues2) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(venues2));
  }).catch((err) => {
    res.status(500).send(err);
  });
});
app.get("/venues/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send("Invalid ID format");
    return;
  }
  import_venue_svc.default.get(id).then((venue) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(venue));
  }).catch((err) => {
    res.status(404).send();
  });
});
app.get("/photographers", (req, res) => {
  import_photographer_svc.default.index().then((photographers2) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(photographers2));
  }).catch((err) => {
    res.status(500).send(err);
  });
});
app.get("/photographers/:id", (req, res) => {
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
app.get("/videographers", (req, res) => {
  import_videographer_svc.default.index().then((videographers2) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(videographers2));
  }).catch((err) => {
    res.status(500).send(err);
  });
});
app.get("/videographers/:id", (req, res) => {
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
app.get("/guests", (req, res) => {
  import_guest_svc.default.index().then((guests2) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(guests2));
  }).catch((err) => {
    res.status(500).send(err);
  });
});
app.get("/guests/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send("Invalid ID format");
    return;
  }
  import_guest_svc.default.get(id).then((guest) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(guest));
  }).catch((err) => {
    res.status(404).send();
  });
});
app.get("/restaurants", (req, res) => {
  import_restaurant_svc.default.index().then((restaurants2) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(restaurants2));
  }).catch((err) => {
    res.status(500).send(err);
  });
});
app.get("/restaurants/:id", (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send("Invalid ID format");
    return;
  }
  import_restaurant_svc.default.get(id).then((restaurant) => {
    res.set("Content-Type", "application/json").send(JSON.stringify(restaurant));
  }).catch((err) => {
    res.status(404).send();
  });
});
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
