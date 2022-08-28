import list from "crud/list";
import get from "crud/get";

import Training from "models/training.model";

import { TrainingType } from "types/training.type";

export default {
  trainings: list(Training, TrainingType, { authorizationRoles: [] }),
  training: get(Training, TrainingType, { authorizationRoles: [] }),
};
