import mongoose from "mongoose";

interface WateringLog {
  date: Date;
  note: string;
  loggedBy: string;
}

interface Tree {
  species: string;
  nickname: string;
  garden: mongoose.Types.ObjectId;
  plantedBy: string;
  plantedDate: Date;
  heightCm: number;
  healthStatus: string;
  photoUrl: string;
  location: {
    lat: number;
    lng: number;
  };
  wateringLogs: WateringLog[];
  notes: string;
}

const wateringLogSchema = new mongoose.Schema<WateringLog>(
  {
    date: { type: Date, default: Date.now },
    note: { type: String, default: "" },
    loggedBy: { type: String }, // Clerk user id
  },
  { _id: false },
);

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
    photoUrl: { type: String, default: "" },
    location: {
      lat: { type: Number },
      lng: { type: Number },
    },
    wateringLogs: [wateringLogSchema],
    notes: { type: String, default: "" },
  },
  { timestamps: true },
);

export default mongoose.model("Tree", treeSchema);
