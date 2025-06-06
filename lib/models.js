import mongoose from "mongoose";

const GarbageSchema = new mongoose.Schema({
  image: { type: String, required: true },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
}, { timestamps: true });

export const Garbage = mongoose.models.Garbage || mongoose.model("Garbage", GarbageSchema);
