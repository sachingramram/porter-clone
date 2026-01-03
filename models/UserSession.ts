import { Schema, model, models } from "mongoose";

export interface IUserSession {
  token: string;
  requestId: string;
  createdAt: Date;
}

const UserSessionSchema = new Schema<IUserSession>(
  {
    token: { type: String, required: true, unique: true },
    requestId: { type: String, required: true },
  },
  { timestamps: true }
);

export const UserSession =
  models.UserSession || model<IUserSession>("UserSession", UserSessionSchema);
