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
    clientInfo?: Partial<Client>
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
    clientInfo?: Partial<Client>
  ) {
    const { idTraining, idClient, valid } = args;
    let isValid = false;
    const training = await trainingModel.findById(idTraining);
    const client = await clientModel.findById(idClient);
    if (!training) throw new GraphQLError("inivalid id training");
    else if (
      clientInfo?.totalAmountPaid === training.price ||
      client?.totalAmountPaid === training.price ||
      valid === true
    ) {
      training.membersNumber = training.membersNumber - 1;
      isValid = true;
      if (client) {
        client.totalAmountPaid = training.price;
        client.save();
      }
      training.save();
    } else {
      isValid = false;
    }
    return isValid;
  }
  async createParticipation(args: Partial<any>, clientInfo: Partial<Client>) {
    const idClient = await this.createClient(args, clientInfo);
    const quantityAdjusment = await this.quantityAdjusment(args, clientInfo);
    const newTrainigParticipation = new this.model({
      valid: quantityAdjusment,
      idClient,
      ...args,
    });
    return { trainigParticipation: await newTrainigParticipation.save() };
  }
  async updateParticipation(args: Partial<any>) {
    const { idTraining, idClient } = args;
    const quantityAdjusment = await this.quantityAdjusment(args);

    await this.model
      .find({ idTraining, idClient })
      .update({ valid: quantityAdjusment });
  }
}

export default new ParticipationService();
