import bcrypt from 'bcryptjs';
import { accessSecret, env, expirationInterval } from 'config/vars';
import jwt from 'jsonwebtoken';
import moment from 'moment';
import mongoose, { Document, Model, Schema } from 'mongoose';

export enum Role {
  TRAINER = 'trainer',
  ADMIN = 'admin',
  CLIENT = 'client',
}
export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

const roles = [Role.TRAINER, Role.ADMIN, Role.CLIENT];
const gender = [Gender.MALE, Gender.FEMALE];

export interface User {
  email: string;
  password: string;
  fullName: string;
  telephone: string;
  active: boolean;
  role: Role;
  gender: Gender;
}

export interface UserDocument extends Document, User {
  generateToken: () => { token: string; expiresIn: string };
  passwordMatches: (password: string) => Promise<boolean>;
}

export type UserModel = Model<UserDocument>;

const userSchema = new mongoose.Schema<UserDocument, UserModel>(
  {
    role: {
      type: String,
      enum: roles,
      default: 'trainer',
    },
    email: {
      type: String,
      match: /^\S+@\S+\.\S+$/,
      trim: true,
      lowercase: true,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      trim: true,
      required: false,
    },
    fullName: {
      type: String,
      trim: true,
      max: 30,
      required: true,
    },

    telephone: {
      type: String,
      trim: true,
      required: false,
    },
    active: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      enum: gender,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export async function hash(password: string) {
  const rounds = env === 'test' ? 1 : 10;
  return await bcrypt.hash(password, rounds);
}

userSchema.pre('save', async function (next) {
  try {
    if (!this.isModified('password')) return next();
    this.password = await hash(this.password);
    next();
  } catch (e: any) {
    return next(e);
  }
});

userSchema.method({
  generateToken() {
    const payload = {
      sub: this._id,
      state: this.active,
    };

    const expiresIn = moment().add(expirationInterval, 'minutes');

    const token = jwt.sign(payload, accessSecret, {
      expiresIn: expiresIn.unix(),
    });
    // add lastLogin
    return { token, expiresIn: expiresIn.toISOString() };
  },

  passwordMatches(password: string) {
    return bcrypt.compare(password, this.password);
  },
});

export default mongoose.model('User', userSchema);
