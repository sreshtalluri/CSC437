import { Schema, model } from "mongoose";
import { Venue } from "../models/venue";

const VenueSchema = new Schema<Venue>(
  {
    id: { type: Number, required: true, unique: true },
    type: { type: String, required: true, default: 'venue' },
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    capacity: { type: Number, required: true },
    contact: { type: String, required: true, trim: true }
  },
  { collection: "venues" }
);

const VenueModel = model<Venue>("Venue", VenueSchema);

function index(): Promise<Venue[]> {
  return VenueModel.find();
}

function get(id: number): Promise<Venue> {
  return VenueModel.findOne({ id })
    .then((venue) => {
      if (!venue) throw `Venue with id ${id} Not Found`;
      return venue;
    });
}

export default { index, get }; 