import { Schema, models, model, Types } from "mongoose";

// "Students can request to join a club" — request/approve flow, not an
// instant join, since club owners manage their own membership per the report.
export const MEMBERSHIP_STATUSES = ["pending", "approved", "rejected"] as const;
export type MembershipStatus = (typeof MEMBERSHIP_STATUSES)[number];

export interface IMembership {
  user: Types.ObjectId; // ref User
  club: Types.ObjectId; // ref Club
  status: MembershipStatus;
  createdAt: Date;
}

const membershipSchema = new Schema<IMembership>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    club: { type: Schema.Types.ObjectId, ref: "Club", required: true },
    status: { type: String, enum: MEMBERSHIP_STATUSES, default: "pending" },
  },
  { timestamps: true }
);

// A student can only have one membership record per club (re-requesting
// after a rejection would need to reuse/update this row, not duplicate it).
membershipSchema.index({ user: 1, club: 1 }, { unique: true });

export const Membership = models.Membership ?? model<IMembership>("Membership", membershipSchema);
export default Membership;
