import createError from 'http-errors';
import express from 'express';
import ApiError from "./src/errors/apiError.js";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './src/swagger/swagger_output.json' assert { type: 'json' };
import { jobGenerator } from "./src/schedule/scheduler.js";

// jobGenerator('* * * * *');

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(
  '/swagger-html',
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.message = err.message;
  res.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);

  if (res instanceof ApiError) {
    res.json({error});
  } else {
    res.send(res.message);
  }
});

export default app;
