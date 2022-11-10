import mongoose, { Schema, Model, Document } from "mongoose";

export interface TrainingParticipation {
  idTraining: Schema.Types.ObjectId;
  idClient: Schema.Types.ObjectId;
  valid: boolean;
}

export interface TrainingParticipationDocument
  extends Document,
    TrainingParticipation {}

export type TrainingParticipationModel = Model<TrainingParticipationDocument>;

const trainingParticipationSchema = new Schema<
  TrainingParticipationDocument,
  TrainingParticipationModel
>(
  {
    idTraining: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Training",
    },
    idClient: { type: Schema.Types.ObjectId, required: true, ref: "Client" },
    valid: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "TrainingParticipation",
  trainingParticipationSchema
);
