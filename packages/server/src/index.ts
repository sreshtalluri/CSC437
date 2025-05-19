import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import venues from "./routes/venues";
import photographers from "./routes/photographers";
import videographers from "./routes/videographers";
import guests from "./routes/guests";
import restaurants from "./routes/restaurants";
import Venues from "./services/venue-svc";
import Photographers from "./services/photographer-svc";
import Videographers from "./services/videographer-svc";
import Guests from "./services/guest-svc";
import Restaurants from "./services/restaurant-svc";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("eventplan");

app.use(express.static(staticDir));
app.use(express.json());
app.use("/api/venues", venues);
app.use("/api/photographers", photographers);
app.use("/api/videographers", videographers);
app.use("/api/guests", guests);
app.use("/api/restaurants", restaurants);

// Venue routes
app.get("/venues", (req: Request, res: Response) => {
  Venues.index()
    .then((venues) => {
      res.set("Content-Type", "application/json")
         .send(JSON.stringify(venues));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/venues/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send("Invalid ID format");
    return;
  }
  
  Venues.get(id)
    .then((venue) => {
      res.set("Content-Type", "application/json")
         .send(JSON.stringify(venue));
    })
    .catch((err) => {
      res.status(404).send();
    });
});

// Photographer routes
app.get("/photographers", (req: Request, res: Response) => {
  Photographers.index()
    .then((photographers) => {
      res.set("Content-Type", "application/json")
         .send(JSON.stringify(photographers));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/photographers/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send("Invalid ID format");
    return;
  }

  Photographers.get(id)
    .then((photographer) => {
      res.set("Content-Type", "application/json")
         .send(JSON.stringify(photographer));
    })
    .catch((err) => {
      res.status(404).send();
    });
});

// Videographer routes
app.get("/videographers", (req: Request, res: Response) => {
  Videographers.index()
    .then((videographers) => {
      res.set("Content-Type", "application/json")
         .send(JSON.stringify(videographers));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/videographers/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send("Invalid ID format");
    return;
  }

  Videographers.get(id)
    .then((videographer) => {
      res.set("Content-Type", "application/json")
         .send(JSON.stringify(videographer));
    })
    .catch((err) => {
      res.status(404).send();
    });
});

// Guest routes
app.get("/guests", (req: Request, res: Response) => {
  Guests.index()
    .then((guests) => {
      res.set("Content-Type", "application/json")
         .send(JSON.stringify(guests));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/guests/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send("Invalid ID format");
    return;
  }
  
  Guests.get(id)
    .then((guest) => {
      res.set("Content-Type", "application/json")
         .send(JSON.stringify(guest));
    })
    .catch((err) => {
      res.status(404).send();
    });
});

// Restaurant routes
app.get("/restaurants", (req: Request, res: Response) => {
  Restaurants.index()
    .then((restaurants) => {
      res.set("Content-Type", "application/json")
         .send(JSON.stringify(restaurants));
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

app.get("/restaurants/:id", (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) {
    res.status(400).send("Invalid ID format");
    return;
  }
  
  Restaurants.get(id)
    .then((restaurant) => {
      res.set("Content-Type", "application/json")
         .send(JSON.stringify(restaurant));
    })
    .catch((err) => {
      res.status(404).send();
    });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});