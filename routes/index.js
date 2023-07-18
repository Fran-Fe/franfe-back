import {Router} from "express";

export const router = Router();

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'My Index Page' });
});
