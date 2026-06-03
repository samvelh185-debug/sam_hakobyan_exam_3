import express from 'express';
import router from 'router';

import filmController from '../controllers/filmController.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';
import { validateSchema, schemas } from '../middleware/validation.js';


router.get('/', filmController.getAllFilms);
router.get('/:id', filmController.getFilmById);

router.post('/', verifyToken, isAdmin, validateSchema(schemas.film), filmController.createFilm);
router.put('/:id', verifyToken, isAdmin, validateSchema(schemas.film), filmController.updateFilm);
router.delete('/:id', verifyToken, isAdmin, filmController.deleteFilm);

export default router