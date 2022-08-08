/* eslint-disable @typescript-eslint/no-var-requires */
import compress from 'compression';
import cors from 'cors';
import { LocalRequest } from 'crud/apiWrapper';
import express, { Request, Response } from 'express';
import { graphqlHTTP } from 'express-graphql';
import RateLimit from 'express-rate-limit';
import costAnalysis from 'graphql-cost-analysis';
import depthLimit from 'graphql-depth-limit';
import noIntrospection from 'graphql-disable-introspection';
import { graphqlUploadExpress } from 'graphql-upload';
import authorization from 'middlewares/auth';
import userModel from 'models/user.model';
import passport from 'passport';
import path from 'path';
import { generateTokenResponse } from 'utils/authHelpers';
import schema from './graphql';
import strategies from './passport';
import { clientUrl, env } from './vars';

const apiLimiter = RateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  skipSuccessfulRequests: true,
});

const app = express();

app.use(apiLimiter);

app.use(compress());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

passport.use('jwt', strategies.jwt);

app.use(authorization);

app.use(cors({ origin: '*' }));
app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
app.get(
  '/auth/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: `${clientUrl}/login`,
    session: false,
  }),
  async function (req: Request | LocalRequest, res: Response<any>) {
    const user: any = req?.user;

    const user2 = await userModel.findById(user?._id);
    if (user2) {
      const token = await generateTokenResponse(user2, req);

      res.redirect(`${clientUrl}/login/?refresh=${token.refreshToken}`);
    }
  },
);
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: `${clientUrl}/login`,
    session: false,
  }),
  async function (req: Request | LocalRequest, res: Response) {
    const user: any = req?.user;

    const user2 = await userModel.findById(user?._id);
    if (user2) {
      const token = await generateTokenResponse(user2, req);

      res.redirect(`${clientUrl}/login/?refresh=${token.refreshToken}`);
    }
  },
);

app.use(express.static(path.join(__dirname, '../../uploads')));
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

const validationRules = [depthLimit(8), costAnalysis({ maximumCost: 1000 })];

if (env === 'production') {
  validationRules.unshift(noIntrospection);
}

app.use(
  '/graphql',
  graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }),
  graphqlHTTP({
    schema: schema,
    graphiql: env !== 'production',
  }),
);

export default app;
