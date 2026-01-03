import { Schema, model, models } from "mongoose";

export type LeadStatus =
  | "NEW"
  | "CONTACTED"
  | "CONFIRMED"
  | "IN_PROGRESS"
  | "COMPLETED";

export interface ILead {
  requestId: string;
  name: string;
  company: string;
  phone: string;
  email: string;

  status:
    | "NEW"
    | "CONTACTED"
    | "CONFIRMED"
    | "IN_PROGRESS"
    | "COMPLETED";

  // 🔥 Admin filled fields (optional)
  vehicle?: string;
  fromPlace?: string;
  toPlace?: string;
  transportTime?: Date;
  cost?: number;
  itemDescription?: string;
  paymentStatus?: "PENDING" | "PAID" | "COD";

vehicleLocation?: {
  lat: number;
  lng: number;
  label?: string; // optional readable location
};
  createdAt?: Date;
  updatedAt?: Date;
}


const LeadSchema = new Schema<ILead>(
  {
    requestId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    company: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    status: {
      type: String,
      enum: ["NEW", "CONTACTED", "CONFIRMED", "IN_PROGRESS", "COMPLETED"],
      default: "NEW",
    },
    
  itemDescription: String,

paymentStatus: {
  type: String,
  enum: ["PENDING", "PAID", "COD"],
  default: "PENDING",
},

vehicleLocation: {
  lat: Number,
  lng: Number,
  label: String,
},

  vehicle: { type: String },
fromPlace: { type: String },
toPlace: { type: String },
transportTime: { type: Date },
cost: { type: Number },
},
  { timestamps: true }
);

export const Lead = models.Lead || model<ILead>("Lead", LeadSchema);
