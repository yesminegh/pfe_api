import mongoose, { Document, Model, Schema } from "mongoose";
import { category } from "./category.model";
import { SubCategory } from "./subCategory.model";
import { Trainer } from "./trainer.model";
import { Training } from "./training.model";

export interface Review {
  text: string;
  idTraining: Training;
  idCategory: category;
  idSubCategory: SubCategory;
  idTrainer: Trainer;
}

export interface ReviewDocument extends Document, Review {}
export type ReviewModel = Model<ReviewDocument>;

const reviewSchema = new mongoose.Schema<ReviewDocument, ReviewModel>({
  text: {
    type: String,
    trim: true,
    required: false,
    default: true,
  },
  idTraining: {
    type: Schema.Types.ObjectId,
    ref: "Training",
  },
  idCategory: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: false,
  },
  idSubCategory: {
    type: Schema.Types.ObjectId,
    ref: "SubCategory",
  },

  idTrainer: {
    type: Schema.Types.ObjectId,
    ref: "Trainer",
  },
});

export default mongoose.model("Review", reviewSchema);
