import mongoose from "mongoose";

interface Garden {
  name: string;
  description: string;
  location: {
    address: string;
    lat: number;
    lng: number;
  };
  createdBy: string;
  members: string[];
}

const gardenSchema = new mongoose.Schema<Garden>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    location: {
      address: { type: String, default: "" },
      lat: { type: Number },
      lng: { type: Number },
    },
    createdBy: { type: String, required: true }, // Clerk user id
    members: [{ type: String }], // Clerk user ids of people who tend this garden
  },
  { timestamps: true },
);

export default mongoose.model("Garden", gardenSchema);
