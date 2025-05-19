import { Schema, model } from "mongoose";
import { Photographer } from "../models/photographer";

const PhotographerSchema = new Schema<Photographer>(
  {
    id: { type: Number, required: true, unique: true },
    type: { type: String, required: true, default: 'photographer' },
    name: { type: String, required: true, trim: true },
    contact: { type: String, required: true, trim: true },
    website: { type: String, required: true, trim: true },
    specialty: { type: String, required: true, trim: true }
  },
  { collection: "photographers" }
);

const PhotographerModel = model<Photographer>("Photographer", PhotographerSchema);

function index(): Promise<Photographer[]> {
  return PhotographerModel.find();
}

function get(id: number): Promise<Photographer> {
  return PhotographerModel.findOne({ id })
    .then((photographer) => {
      if (!photographer) throw `Photographer with id ${id} Not Found`;
      return photographer;
    });
}

export default { index, get }; 