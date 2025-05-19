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

function create(json: Venue): Promise<Venue> {
  const v = new VenueModel(json);
  return v.save();
}

function update(id: number, venue: Venue): Promise<Venue> {
  return VenueModel.findOneAndUpdate({ id }, venue, { new: true })
    .then((updated) => {
      if (!updated) throw `Venue with id ${id} not updated`;
      else return updated as Venue;
    });
}

function remove(id: number): Promise<void> {
  return VenueModel.findOneAndDelete({ id })
    .then((deleted) => {
      if (!deleted) throw `Venue with id ${id} not deleted`;
    });
}

export default { index, get, create, update, remove }; 