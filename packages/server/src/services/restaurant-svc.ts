import { Schema, model } from "mongoose";
import { Restaurant } from "../models/restaurant";

const RestaurantSchema = new Schema<Restaurant>(
  {
    id: { type: Number, required: true, unique: true },
    type: { type: String, required: true, default: 'restaurant' },
    name: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    contact: { type: String, required: true, trim: true },
    website: { type: String, required: true, trim: true },
    cuisine: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true }
  },
  { collection: "restaurants" }
);

const RestaurantModel = model<Restaurant>("Restaurant", RestaurantSchema);

function index(): Promise<Restaurant[]> {
  return RestaurantModel.find();
}

function get(id: number): Promise<Restaurant> {
  return RestaurantModel.findOne({ id })
    .then((restaurant) => {
      if (!restaurant) throw `Restaurant with id ${id} Not Found`;
      return restaurant;
    });
}

function create(json: Restaurant): Promise<Restaurant> {
  const r = new RestaurantModel(json);
  return r.save();
}

function update(id: number, restaurant: Restaurant): Promise<Restaurant> {
  return RestaurantModel.findOneAndUpdate({ id }, restaurant, { new: true })
    .then((updated) => {
      if (!updated) throw `Restaurant with id ${id} not updated`;
      else return updated as Restaurant;
    });
}

function remove(id: number): Promise<void> {
  return RestaurantModel.findOneAndDelete({ id })
    .then((deleted) => {
      if (!deleted) throw `Restaurant with id ${id} not deleted`;
    });
}

export default { index, get, create, update, remove }; 