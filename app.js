import createError from 'http-errors';
import express from 'express';
import ApiError from "./src/errors/apiError.js";
import { specs } from "./src/swagger/swagger.js";
import swaggerUi from 'swagger-ui-express';
import { router as cafeRouter } from './src/routes/forAI/cafesRoutes.js'
import { router as cafeRankingRouter } from './src/routes/forFront/cafeRankingRoutes.js'
import { router as cafeInfoRouter } from './src/routes/forFront/cafeInfoRoutes.js'
import { router as cafeListRouter } from './src/routes/forFront/cafeRoutes.js'
import { router as galleryRouter } from './src/routes/forFront/galleryRoutes.js'
import { jobGenerator } from "./src/schedule/scheduler.js";
import { logger } from "./src/logger/winston.js";
import heapdump from 'node-oom-heapdump';
import cors from 'cors';

import * as path from 'path';
import NoAuthorizationHeaderError from "./src/errors/noAuthorizationHeaderError.js";
import WrongAuthorizationHeaderError from "./src/errors/wrongAuthorizationHeaderError.js";

let corsOptions = {
  origin: '*',
  credential: true,
}

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

heapdump({
  path: path.resolve(__dirname, 'logs', 'heapdump.log')
});

function authentication(req, res, next) {
  const authheader = req.headers.authorization;

  if (req.path.startsWith('/swagger-html') || req.path.startsWith('/swagger-json')) {
    return next();
  }

  if (!authheader) {
    throw new NoAuthorizationHeaderError();
  } else if (authheader !== "franfeToken") {
    throw new WrongAuthorizationHeaderError();
  }

  next();
}

const app = express();

app.use((cors(corsOptions)));
app.use(authentication);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/cafes', cafeRouter);
app.use('/cafe/rankings', cafeRankingRouter);
app.use('/cafe/infos', cafeInfoRouter);
app.use('/cafe/list', cafeListRouter);
app.use('/gallery', galleryRouter);
app.use('/swagger-html', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/swagger-json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.message = err.message;
  res.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);

  logger.error(err.stack);

  if (err instanceof ApiError) {
    res.json(err.toString());
  } else {
    res.json(new ApiError(err.stack));
  }
});

export default app;
