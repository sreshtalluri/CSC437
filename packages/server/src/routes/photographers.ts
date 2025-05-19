import express, { Request, Response } from "express";
import { Photographer } from "../models/photographer";
import Photographers from "../services/photographer-svc";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  Photographers.index()
    .then((list: Photographer[]) => {
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
  
  Photographers.get(id)
    .then((photographer: Photographer) => {
      res.set("Content-Type", "application/json")
         .send(JSON.stringify(photographer));
    })
    .catch((err) => {
      res.status(404).send();
    });
});

router.post("/", (req: Request, res: Response) => {
  const newPhotographer = req.body;

  Photographers.create(newPhotographer)
    .then((photographer: Photographer) =>
      res.status(201).json(photographer)
    )
    .catch((err) => res.status(500).send(err));
});

router.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const photographer = req.body;

  Photographers.update(id, photographer)
    .then((photographer: Photographer) =>
      res.json(photographer)
    )
    .catch((err) => res.status(404).end());
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  Photographers.remove(id)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router; 