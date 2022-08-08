import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Client {
  email: string;
  fullName: string;
  telephone: string;
  totalAmountPaid: string;
  user: Schema.Types.ObjectId;
}

export interface ClientDocument extends Document, Client {}
export type ClientModel = Model<ClientDocument>;

const clientSchema = new mongoose.Schema<ClientDocument, ClientModel>({
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
  totalAmountPaid: {
    type: String,
    trim: true,
    required: false,
  },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: false },
});

export default mongoose.model('Client', clientSchema);
