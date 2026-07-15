import { Schema, models, model, Types } from "mongoose";

export interface IClub {
  name: string;
  description: string;
  owner: Types.ObjectId; // ref User, role should be "clubOwner"
  createdAt: Date;
}

const clubSchema = new Schema<IClub>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Club = models.Club ?? model<IClub>("Club", clubSchema);
export default Club;
