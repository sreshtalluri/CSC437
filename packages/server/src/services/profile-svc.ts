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

function create(username: string): Promise<Profile> {
  const newProfile = new ProfileModel({
    username,
    firstName: 'New',
    lastName: 'User',
    email: `${username}@example.com`,
    phone: '123-456-7890',
    role: 'user',
    event_name: 'Welcome Event',
    event_date: new Date().toISOString().split('T')[0], // Today's date
    event_time: '12:00 PM',
    event_description: 'Welcome to the Event Planner! This is your first event. Feel free to edit or delete it.',
    event_status: 'upcoming'
  });
  return newProfile.save();
}

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

export default { create, get, update, updateEvent }; 