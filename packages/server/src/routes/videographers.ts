import express, { Request, Response } from "express";
import { Videographer } from "../models/videographer";
import Videographers from "../services/videographer-svc";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  Videographers.index()
    .then((list: Videographer[]) => {
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
  
  Videographers.get(id)
    .then((videographer: Videographer) => {
      res.set("Content-Type", "application/json")
         .send(JSON.stringify(videographer));
    })
    .catch((err) => {
      res.status(404).send();
    });
});

router.post("/", (req: Request, res: Response) => {
  const newVideographer = req.body;

  Videographers.create(newVideographer)
    .then((videographer: Videographer) =>
      res.status(201).json(videographer)
    )
    .catch((err) => res.status(500).send(err));
});

router.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const videographer = req.body;

  Videographers.update(id, videographer)
    .then((videographer: Videographer) =>
      res.json(videographer)
    )
    .catch((err) => res.status(404).end());
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  Videographers.remove(id)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router; 