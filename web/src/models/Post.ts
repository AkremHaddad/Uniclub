import { Schema, models, model, Types } from "mongoose";

export interface IPost {
  club: Types.ObjectId; // ref Club
  content: string;
  createdAt: Date;
}

const postSchema = new Schema<IPost>(
  {
    club: { type: Schema.Types.ObjectId, ref: "Club", required: true },
    content: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export const Post = models.Post ?? model<IPost>("Post", postSchema);
export default Post;
