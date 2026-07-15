import { Schema, models, model, Types } from "mongoose";

export interface IClub {
  name: string;
  description: string;
  owner: Types.ObjectId; // ref User, role should be "clubOwner"
  // Free-text tags (e.g. "robotics", "photography") the owner sets — the
  // recommendation feature matches these against a student's `interests`.
  tags: string[];
  createdAt: Date;
}

const clubSchema = new Schema<IClub>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Recommendation queries filter/match on tags — index it.
clubSchema.index({ tags: 1 });

export const Club = models.Club ?? model<IClub>("Club", clubSchema);
export default Club;
