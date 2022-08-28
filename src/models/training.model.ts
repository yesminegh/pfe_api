import mongoose, { Document, Model, Schema } from "mongoose";
import { category } from "./category.model";
import { SubCategory } from "./subCategory.model";
import { Trainer } from "./trainer.model";

export interface image {
  first: boolean;
  file: string;
}

export interface Training {
  name: string;
  price: string;
  idCategory: category;
  idSubCategories?: SubCategory;
  membersNumber: number;
  description?: string;
  image: string[];
  idTrainer: Trainer;
  dateStart: Date;
  dateEnd: Date;
}

export interface trainingDocument extends Document, Training {}

export type trainingModel = Model<trainingDocument>;

const trainingSchema = new mongoose.Schema<trainingDocument, trainingModel>(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    price: {
      type: String,
      trim: true,
      required: true,
    },

    idCategory: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: false,
    },
    idSubCategories: {
      type: Schema.Types.ObjectId,
      ref: "SubCategory",
    },

    membersNumber: {
      type: Number,
      trim: true,
      required: true,
    },

    description: {
      type: String,
      trim: true,
      required: false,
    },

    image: {
      type: [{ type: String, required: true }],
      required: false,
    },
    idTrainer: {
      type: Schema.Types.ObjectId,
      ref: "Trainer",
      required: false,
    },
    dateStart: {
      type: Date,
      required: true,
    },
    dateEnd: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Training", trainingSchema);
