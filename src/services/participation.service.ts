import { GraphQLError } from "graphql";
import clientModel, { Client } from "models/client.model";
import trainingModel from "models/training.model";
import trainingParticipationModel, {
  TrainingParticipation,
} from "models/trainingParticipation.model";

class ParticipationService {
  model: typeof trainingParticipationModel;
  constructor() {
    this.model = trainingParticipationModel;
  }
  async createClient(
    args: Partial<TrainingParticipation>,
    clientInfo: Partial<Client>
  ) {
    const { idClient } = args;

    const clientSchema = await clientModel.findOne({ _id: idClient });

    if (!clientSchema) {
      const { _id } = await clientModel.create({
        ...clientInfo,
      });
      return _id;
    }
  }
  async quantityAdjusment(
    args: Partial<TrainingParticipation>,
    clientInfo: Partial<Client>
  ) {
    const { idTraining } = args;
    const training = await trainingModel.findById(idTraining);
    if (!training) throw new GraphQLError("invalid id training");
    else if (clientInfo.totalAmountPaid === training.price)
      training.membersNumber = training.membersNumber - 1;
    return training.save();
  }
  async createParticipation(args: Partial<any>, clientInfo: Partial<Client>) {
    const idClient = await this.createClient(args, clientInfo);
    const priceAdjusment = await this.quantityAdjusment(args, clientInfo);
    const newTrainigParticipation = new this.model({
      priceAdjusment,
      idClient,
      ...args,
    });
    return { trainigParticipation: await newTrainigParticipation.save() };
  }
}

export default new ParticipationService();
