import { Schema, model, models } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  image?: string;
  role: "USER" | "ADMIN";
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: String,
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" },
  },
  { timestamps: true }
);

export const User = models.User || model<IUser>("User", UserSchema);
