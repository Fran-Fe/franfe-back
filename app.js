import createError from 'http-errors';
import express from 'express';
import ApiError from "./src/errors/apiError.js";
import { specs } from "./src/swagger/swagger.js";
import swaggerUi from 'swagger-ui-express';
import router from './src/routes/googleMapRoutes.js';
import { router as cafeRouter } from './src/routes/forAI/cafesRoutes.js'
import { jobGenerator } from "./src/schedule/scheduler.js";

// jobGenerator('* * * * *', abc);

const app = express();
app.use(router);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/cafes', cafeRouter);
app.use('/', cafeLocationRouter);

app.use('/swagger-html', swaggerUi.serve, swaggerUi.setup(specs));

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.message = err.message;
  res.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);

  console.error(err);

  if (res instanceof ApiError) {
    res.json({error});
  } else {
    res.send(res.message);
  }
});

export default app;
