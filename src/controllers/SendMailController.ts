import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UserRepository } from "../repositories/UsersRepository";


class SendMailController {
  async execute(request: Request, response: Response){
    const { email, survey_id } = request.body

    const usersRepository = getCustomRepository(UserRepository);
    const surveysRepository = getCustomRepository(SurveysRepository)
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)

    // Verificar se o usuário existe
    const usersAlreadyExists = await usersRepository.findOne({ email })
    
    if(!usersAlreadyExists){
      return response.status(400).json({
        error: "User does not exists",
      });    
    }

    // Verificar se a pesquisa existe
    const surveyAlreadyExists = await surveysRepository.findOne({ id: survey_id })

    if(!surveyAlreadyExists){
      return response.status(400).json({
        error: "Survey does not exists",
      })
    }

    // Criar uma instância das informações
    const surveyUser = surveysUsersRepository.create({
      user_id: usersAlreadyExists.id,
      survey_id: surveyAlreadyExists.id,
    })

    // Salvar as informações na tabela
    await surveysUsersRepository.save(surveyUser);

    return response.json(surveyUser)

    // Enviar email para o usuário

  }
}

export { SendMailController }