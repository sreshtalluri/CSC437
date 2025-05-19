import express, { Request, Response } from "express";
import { Guest } from "../models/guest";
import Guests from "../services/guest-svc";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  Guests.index()
    .then((list: Guest[]) => {
      res.json(list);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.get("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send("Invalid ID format");
    return;
  }
  
  Guests.get(id)
    .then((guest: Guest) => {
      res.set("Content-Type", "application/json")
         .send(JSON.stringify(guest));
    })
    .catch((err) => {
      res.status(404).send();
    });
});

router.post("/", (req: Request, res: Response) => {
  const newGuest = req.body;

  Guests.create(newGuest)
    .then((guest: Guest) =>
      res.status(201).json(guest)
    )
    .catch((err) => res.status(500).send(err));
});

router.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const guest = req.body;

  Guests.update(id, guest)
    .then((guest: Guest) =>
      res.json(guest)
    )
    .catch((err) => res.status(404).end());
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  Guests.remove(id)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router; 