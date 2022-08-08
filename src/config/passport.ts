import { createUserFb, createUserGoogle } from 'crud/create';
import clientModel from 'models/client.model';
import User, { UserDocument } from 'models/user.model';
import { Profile } from 'passport';
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt';
import { accessSecret, serverUrl } from './vars';

export const facebookCallback = async (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: (e: Error | null | unknown, user: UserDocument | boolean) => void,
) => {
  try {
    const user = await User.findOne({ email: profile.emails && profile.emails[0] && profile.emails[0].value });
    if (user) return done(null, user);
    const usertest: UserDocument = await createUserFb(profile);
    return done(null, usertest);
  } catch (error) {
    return done(error, false);
  }
};

export const googleCallback = async (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: (e: Error | null | unknown, user: UserDocument | boolean) => void,
) => {
  try {
    const user = await User.findOne({ email: profile.emails && profile.emails[0] && profile.emails[0].value });
    if (user) return done(null, user);
    const usertest: UserDocument = await createUserGoogle(profile);
    return done(null, usertest);
  } catch (error) {
    return done(error, false);
  }
};

const jwtOptions = {
  secretOrKey: accessSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
};

const jwt = async (
  payload: { sub: string; state: boolean },
  done: (e: Error | null | unknown, user: UserDocument | boolean) => void,
) => {
  try {
    const user = await User.findById(payload.sub);
    const idClient = await clientModel.findOne({ user: user?.id || '' }).select('id');
    const userr = JSON.parse(JSON.stringify(user));
    userr.idClient = idClient?.id;

    if (user) return done(null, userr);
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
};

export default {
  jwt: new JwtStrategy(jwtOptions, jwt),
};
