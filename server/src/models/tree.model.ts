import mongoose from "mongoose";

interface Tree {
  species: string;
  nickname: string;
  garden: mongoose.Types.ObjectId;
  plantedBy: string;
  plantedDate: Date;
  heightCm: number;
  healthStatus: string;
  location: {
    lat: number;
    lng: number;
  };
  notes: string;
}

const treeSchema = new mongoose.Schema<Tree>(
  {
    species: { type: String, required: true, trim: true },
    nickname: { type: String, default: "" },
    garden: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Garden",
      required: true,
    },
    plantedBy: { type: String, required: true }, // Clerk user id
    plantedDate: { type: Date, required: true },
    heightCm: { type: Number, default: 0 },
    healthStatus: {
      type: String,
      enum: ["thriving", "healthy", "struggling", "needs-attention"],
      default: "healthy",
    },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("Tree", treeSchema);
