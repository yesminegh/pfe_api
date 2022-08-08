import mongoose, { Document, Model, Schema } from 'mongoose';
import { SubCategory } from './subCategory.model';

export interface Trainer {
  email: string;
  fullName: string;
  telephone: string;
  availablity: boolean;
  speciality?: SubCategory;
  user: Schema.Types.ObjectId;
}

export interface TrainerDocument extends Document, Trainer {}
export type TrainerModel = Model<TrainerDocument>;

const trainerSchema = new mongoose.Schema<TrainerDocument, TrainerModel>({
  availablity: {
    type: Boolean,
    trim: true,
    required: false,
    default: true,
  },
  speciality: {
    type: Schema.Types.ObjectId,
    ref: 'SubCategory',
  },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    trim: true,
    lowercase: true,
    required: false,
  },
  fullName: {
    type: String,
    trim: true,
    max: 30,
    required: false,
  },
  telephone: {
    type: String,
    trim: true,
    required: false,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
});

export default mongoose.model('Trainer', trainerSchema);
