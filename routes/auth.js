import express from 'express';
const router = express.Router();
import authController from '../controllers/authController.js';
import { validateSchema, schemas } from '../midleware/validation.js';

router.post('/register', validateSchema(schemas.register), authController.register);
router.post('/login', validateSchema(schemas.login), authController.login);

export default router;