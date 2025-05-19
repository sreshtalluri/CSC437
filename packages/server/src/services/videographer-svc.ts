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

function create(json: Videographer): Promise<Videographer> {
  const v = new VideographerModel(json);
  return v.save();
}

function update(id: number, videographer: Videographer): Promise<Videographer> {
  return VideographerModel.findOneAndUpdate({ id }, videographer, { new: true })
    .then((updated) => {
      if (!updated) throw `Videographer with id ${id} not updated`;
      else return updated as Videographer;
    });
}

function remove(id: number): Promise<void> {
  return VideographerModel.findOneAndDelete({ id })
    .then((deleted) => {
      if (!deleted) throw `Videographer with id ${id} not deleted`;
    });
}

export default { index, get, create, update, remove }; 