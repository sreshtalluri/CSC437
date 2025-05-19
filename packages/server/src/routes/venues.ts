import express, { Request, Response } from "express";
import { Venue } from "../models/venue";
import Venues from "../services/venue-svc";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  Venues.index()
    .then((list: Venue[]) => {
      res.json(list);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send("Invalid ID format");
    return;
  }
  
  Venues.get(id)
    .then((venue: Venue) => {
      res.set("Content-Type", "application/json")
         .send(JSON.stringify(venue));
    })
    .catch((err) => {
      res.status(404).send();
    });
});

router.post("/", (req: Request, res: Response) => {
  const newVenue = req.body;

  Venues.create(newVenue)
    .then((venue: Venue) =>
      res.status(201).json(venue)
    )
    .catch((err) => res.status(500).send(err));
});

router.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const venue = req.body;

  Venues.update(id, venue)
    .then((venue: Venue) =>
      res.json(venue)
    )
    .catch((err) => res.status(404).end());
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  Venues.remove(id)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;