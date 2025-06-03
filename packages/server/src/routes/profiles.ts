import express, { Request, Response } from "express";
import profileService from "../services/profile-svc";
import { Profile } from "../models/profile";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const username = req.query.username as string;
  
  if (!username) {
    res.status(400).send("Username is required");
    return;
  }

  profileService.get(username)
    .then((profile: Profile) => {
      res.json(profile);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

router.put("/", (req: Request, res: Response) => {
  const username = req.query.username as string;
  const profile = req.body;

  if (!username) {
    res.status(400).send("Username is required");
    return;
  }

  profileService.update(username, profile)
    .then((profile: Profile) => {
      res.json(profile);
    })
    .catch((err) => {
      res.status(404).end();
    });
});

router.put("/event", (req: Request, res: Response) => {
  const username = req.query.username as string;
  const eventData = req.body;

  if (!username) {
    res.status(400).send("Username is required");
    return;
  }

  profileService.updateEvent(username, eventData)
    .then((profile: Profile) => {
      res.json(profile);
    })
    .catch((err) => {
      res.status(404).end();
    });
});

export default router; 