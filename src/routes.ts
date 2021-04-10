import { Router } from 'express';
import { UserController } from './controllers/UserController';
import { SurveysController } from './controllers/SurveysController'

const userController = new UserController
const surveyController = new SurveysController

const router = Router();

router.post("/users", userController.create)

router.post("/surveys", surveyController.create)
router.get("/surveys", surveyController.show)


export { router };
