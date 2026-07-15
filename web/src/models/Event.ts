import { Schema, models, model, Types } from "mongoose";

export interface IEvent {
  club: Types.ObjectId; // ref Club
  title: string;
  description: string;
  date: Date;
  location: string;
  createdAt: Date;
}

const eventSchema = new Schema<IEvent>(
  {
    club: { type: Schema.Types.ObjectId, ref: "Club", required: true },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    date: { type: Date, required: true },
    location: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

// Calendar/newsfeed views query by date range constantly — index it.
eventSchema.index({ date: 1 });

export const Event = models.Event ?? model<IEvent>("Event", eventSchema);
export default Event;
