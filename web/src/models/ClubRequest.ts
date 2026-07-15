import { Schema, models, model, Types } from "mongoose";

// "Students can request to register a club" — a distinct flow from joining
// one: this creates a new Club (and promotes the requester to clubOwner)
// only once an admin approves it. Kept separate from Membership since the
// shape (proposed name/description vs. an existing club reference) and the
// approval consequence (creates a Club + changes the user's role) differ.
export const CLUB_REQUEST_STATUSES = ["pending", "approved", "rejected"] as const;
export type ClubRequestStatus = (typeof CLUB_REQUEST_STATUSES)[number];

export interface IClubRequest {
  requestedBy: Types.ObjectId; // ref User
  name: string;
  description: string;
  status: ClubRequestStatus;
  createdAt: Date;
}

const clubRequestSchema = new Schema<IClubRequest>(
  {
    requestedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: { type: String, enum: CLUB_REQUEST_STATUSES, default: "pending" },
  },
  { timestamps: true }
);

export const ClubRequest = models.ClubRequest ?? model<IClubRequest>("ClubRequest", clubRequestSchema);
export default ClubRequest;
