import createError from 'http-errors';
import express from 'express';
import { router as apiRouter} from './src/routes/googleAPIRoutes.js';
import { router as getPlaceIdsRouter} from './src/routes/getPlaceIdsRoutes.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/',apiRouter);
app.use('/',getPlaceIdsRouter);
app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.message = err.message;
  res.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

export default app;
