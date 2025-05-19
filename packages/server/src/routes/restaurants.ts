import express, { Request, Response } from "express";
import { Restaurant } from "../models/restaurant";
import Restaurants from "../services/restaurant-svc";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  Restaurants.index()
      .then((list: Restaurant[]) => {
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
  
  Restaurants.get(id)
    .then((restaurant: Restaurant) => {
      res.set("Content-Type", "application/json")
         .send(JSON.stringify(restaurant));
    })
    .catch((err) => {
      res.status(404).send();
    });
});

router.post("/", (req: Request, res: Response) => {
  const newRestaurant = req.body;

  Restaurants.create(newRestaurant)
    .then((restaurant: Restaurant) =>
      res.status(201).json(restaurant)
    )
    .catch((err) => res.status(500).send(err));
});

router.put("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const restaurant = req.body;

  Restaurants.update(id, restaurant)
    .then((restaurant: Restaurant) =>
      res.json(restaurant)
    )
    .catch((err) => res.status(404).end());
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  Restaurants.remove(id)
    .then(() => res.status(204).end())
    .catch((err) => res.status(404).send(err));
});

export default router;