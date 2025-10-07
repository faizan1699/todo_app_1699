import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    details: {
      type: String,
      required: true,
    },
    is_completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    user_id: {
      type: Number,
      required: true,
    },
    deadline: {
      type: Date,
      required: false,
    },
    priority: {
      type: String,
      required: false,
      enum: ["low", "medium", "high"],
      default: "low",
    },
  },
  {
    timestamps: true,
  }
);

export const Todos = mongoose.models.Todo || mongoose.model("Todo", Schema);
