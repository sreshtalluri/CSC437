import { Schema, model } from "mongoose";
import { Guest } from "../models/guest";

const GuestSchema = new Schema<Guest>(
  {
    id: { type: Number, required: true, unique: true },
    type: { type: String, required: true, default: 'guest' },
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    rsvp: { type: String, required: true, trim: true }
  },
  { collection: "guests" }
);

const GuestModel = model<Guest>("Guest", GuestSchema);

function index(): Promise<Guest[]> {
  return GuestModel.find();
}

function get(id: number): Promise<Guest> {
  return GuestModel.findOne({ id })
    .then((guest) => {
      if (!guest) throw `Guest with id ${id} Not Found`;
      return guest;
    });
}

export default { index, get }; 