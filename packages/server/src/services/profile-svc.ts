import { Schema, model } from "mongoose";
import { Profile } from "../models/profile";

const ProfileSchema = new Schema<Profile>(
  {
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    role: { type: String, required: true },
    event_name: { type: String, required: true },
    event_date: { type: String, required: true },
    event_time: { type: String, required: true },
    event_description: { type: String, required: true },
    event_status: { 
      type: String, 
      required: true,
      enum: ['upcoming', 'past', 'cancelled'],
      default: 'upcoming'
    }
  },
  { collection: "profiles" }
);

const ProfileModel = model<Profile>("Profile", ProfileSchema);

function get(username: string): Promise<Profile> {
  return ProfileModel.findOne({ username })
    .then((profile) => {
      if (!profile) throw `Profile for ${username} not found`;
      return profile;
    });
}

function update(username: string, profile: Partial<Profile>): Promise<Profile> {
  return ProfileModel.findOneAndUpdate(
    { username },
    profile,
    { new: true }
  ).then((updated) => {
    if (!updated) throw `Profile for ${username} not updated`;
    return updated;
  });
}

function updateEvent(username: string, eventData: Partial<Profile>): Promise<Profile> {
  return ProfileModel.findOneAndUpdate(
    { username },
    { 
      $set: {
        event_name: eventData.event_name,
        event_date: eventData.event_date,
        event_time: eventData.event_time,
        event_description: eventData.event_description,
        event_status: eventData.event_status
      }
    },
    { new: true }
  ).then((updated) => {
    if (!updated) throw `Profile for ${username} not found`;
    return updated;
  });
}

export default { get, update, updateEvent }; 