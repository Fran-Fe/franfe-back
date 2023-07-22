import createError from 'http-errors';
import express from 'express';
import ApiError from "./src/errors/apiError.js";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './src/swagger/swagger_output.json' assert { type: 'json' };
<<<<<<< Updated upstream
import router from './src/routes/googleMapRoutes.js';
=======
import { router as cafeRouter } from './src/routes/forAI/cafesRoutes.js'
>>>>>>> Stashed changes

const app = express();

app.use(router);
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/cafes', cafeRouter);

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
