import { Schema, model, models } from "mongoose";

export interface IUserAccount {
  requestId: string;
  loginId: string;
  password: string; // later we will hash
  createdAt: Date;
}

const UserAccountSchema = new Schema<IUserAccount>(
  {
    requestId: { type: String, required: true, unique: true },
    loginId: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserAccount =
  models.UserAccount || model<IUserAccount>("UserAccount", UserAccountSchema);
