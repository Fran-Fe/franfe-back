import createError from 'http-errors';
import express from 'express';
import ApiError from "./src/errors/apiError.js";
import { specs } from "./src/swagger/swagger.js";
import swaggerUi from 'swagger-ui-express';
import { router as cafeRouter } from './src/routes/forAI/cafesRoutes.js'
import { router as cafeRankingRouter } from './src/routes/forFront/cafeRankingRoutes.js'
import { router as cafeInfoRouter } from './src/routes/forFront/cafeInfoRoutes.js'
import { jobGenerator } from "./src/schedule/scheduler.js";
import {logger} from "./src/logger/winston.js";

const app = express();
// jobGenerator('* * * * *', abc);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/cafes', cafeRouter);
app.use('/cafe/rankings', cafeRankingRouter);
app.use('/cafe/infos', cafeInfoRouter);
app.use('/swagger-html', swaggerUi.serve, swaggerUi.setup(specs));
app.get('/swagger-json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

app.get('', (req, res) => {
  logger.debug('hello');
  logger.info('hello');
  logger.warn('hello');
  return new ApiError("testsetes");

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
