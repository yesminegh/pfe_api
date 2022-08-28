import joi from 'joi';
import { GraphQLString, GraphQLID, GraphQLList, GraphQLError, GraphQLInt } from 'graphql';

import create from 'crud/create';
import update from 'crud/update';
import remove from 'crud/remove';

import { Role } from 'models/user.model';
import Training from 'models/training.model';

import { TrainingType } from 'types/training.type';
import { GraphQLUpload } from 'graphql-upload';
import fs from 'fs';

import path from 'path';

import { serverUrl } from 'config/vars';

import apiWrapper from 'crud/apiWrapper';


const createtrainingValidation = {
  name: joi.string().min(1).max(50).required(),
  price: joi.string().max(10).required(),
  idCategory: joi
    .string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
  idSubCategories: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  membersNumber: joi.number().required(),
  description: joi.string().required(),
  image: joi.array().items(),
};

const updatetrainingValidation = {
  name: joi.string().min(1).max(50),
  price: joi.string().max(10),
  idCategory: joi.string().regex(/^[0-9a-fA-F]{24}$/),
  membersNumber: joi.number(),
  description: joi.string(),
  image: {},
};

export default {
  createTraining: create(
    Training,
    {
      name: { type: GraphQLString, required: false},
      price: { type: GraphQLString, required: true },
      idCategory: { type: GraphQLID, required: false },
      idSubCategories: { type:  GraphQLID, required: false },
      membersNumber: { type: GraphQLInt, required: true },
      description: { type: GraphQLString, required: false },
      image: { type: new GraphQLList(GraphQLUpload), required: false },
      dateStart: { type: GraphQLString, required: true },
      dateEnd: { type: GraphQLString, required: true },
      idTrainer: { type:  GraphQLID, required: false },

    },
    TrainingType,
    {
      validateSchema: {},
      authorizationRoles: [],
      pre: async (args, req) => {
        var { name, image, ...rest } = args;

        let productfold = `${name}`;
        fs.mkdir(path.join(__dirname, `../../uploads/${productfold}`), { recursive: true }, (err) => {
          if (err) {
            console.error({ err });
          }
        });

        if (image) {
          return await Promise.all(
            image.map(async (file) => {
              if (file) {
                const { createReadStream, filename } = await file;
                const stream = createReadStream();
                const pathName = path.join(
                  __dirname,
                  '../../uploads/' + productfold + '/' + filename.split(' ').join('_'),
                );

                await stream.pipe(fs.createWriteStream(pathName));
                return `${serverUrl}/${productfold}/${filename.split(' ').join('_')}`;
              }
            }),
          ).then((res) => {
            return { ...rest, image: res ,name};
          });
        }
      },

    
    },
    
  ),

  updateTraining: update(
    Training,
    {
      id: GraphQLID,
      name: GraphQLString,
      price: GraphQLString,
      idCategory: GraphQLID,
      idSubCategories: GraphQLID,
      idTrainer: GraphQLID,
      membersNumber: GraphQLInt,
      description: GraphQLString,
      image: new GraphQLList(GraphQLUpload),
    },
    TrainingType,
    {
      authorizationRoles: [],
    },
  ),
  removeTraining: remove(Training, { authorizationRoles: [Role.ADMIN] }),
  deleteImage: apiWrapper(
    async (args, request) => {
      const { file, id } = args;
      const training = await Training.findById(id);
      if (!training) throw new GraphQLError('invalid training id');
      training.image.map((img, index) => {
        if (file.includes(img)) {
          const deletePath = path.join(__dirname, '../../uploads/', `${img}`);
          fs.unlinkSync(deletePath);
          training.image.splice(index);
        }
      });
      await training.save();
      return 'image deleted';
    },
    GraphQLString,
    {
      id: { type: GraphQLID },
      file: { type: GraphQLString },
    },
  ),
};
