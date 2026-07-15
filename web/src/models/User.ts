import { Schema, models, model } from "mongoose";

/**
 * The 3 actors from the original report (PROJECT_REPORT.md): Admin, Club
 * Owner, Student. "Visitor" (unauthenticated browsing) isn't a stored role.
 */
export const USER_ROLES = ["student", "clubOwner", "admin"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  role: UserRole;
  // From the report: students provide study field/interests so the
  // (planned) recommendation feature has something to work with.
  studyField?: string;
  interests?: string[];
  createdAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: USER_ROLES, default: "student" },
    studyField: { type: String, trim: true },
    interests: { type: [String], default: [] },
  },
  { timestamps: true }
);

// Mongoose recompiles models on every hot-reload in dev unless guarded.
export const User = models.User ?? model<IUser>("User", userSchema);
export default User;
