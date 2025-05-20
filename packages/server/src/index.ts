import express, { Request, Response } from "express";
import { connect } from "./services/mongo";
import venues from "./routes/venues";
import photographers from "./routes/photographers";
import videographers from "./routes/videographers";
import guests from "./routes/guests";
import restaurants from "./routes/restaurants";
import auth, { authenticateUser } from "./routes/auth";

const app = express();
const port = process.env.PORT || 3000;
const staticDir = process.env.STATIC || "public";

connect("eventplan");

app.use(express.static(staticDir));
app.use(express.json());
app.use("/api/venues", authenticateUser, venues);
app.use("/api/photographers", authenticateUser, photographers);
app.use("/api/videographers", authenticateUser, videographers);
app.use("/api/guests", authenticateUser, guests);
app.use("/api/restaurants", authenticateUser, restaurants);
app.use("/auth", auth);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});