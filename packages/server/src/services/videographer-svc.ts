import { Schema, model } from "mongoose";
import { Videographer } from "../models/videographer";

const VideographerSchema = new Schema<Videographer>(
  {
    id: { type: Number, required: true, unique: true },
    type: { type: String, required: true, default: 'videographer' },
    name: { type: String, required: true, trim: true },
    contact: { type: String, required: true, trim: true },
    website: { type: String, required: true, trim: true },
    specialty: { type: String, required: true, trim: true }
  },
  { collection: "videographers" }
);

const VideographerModel = model<Videographer>("Videographer", VideographerSchema);

function index(): Promise<Videographer[]> {
  return VideographerModel.find();
}

function get(id: number): Promise<Videographer> {
  return VideographerModel.findOne({ id })
    .then((videographer) => {
      if (!videographer) throw `Videographer with id ${id} Not Found`;
      return videographer;
    });
}

export default { index, get }; 