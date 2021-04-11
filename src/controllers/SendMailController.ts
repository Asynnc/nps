import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { UserRepository } from "../repositories/UsersRepository";
import sendMailService from "../services/sendMailService";
import { resolve } from 'path'

class SendMailController {
  async execute(request: Request, response: Response){
    const { email, survey_id } = request.body

    const usersRepository = getCustomRepository(UserRepository);
    const surveysRepository = getCustomRepository(SurveysRepository)
    const surveysUsersRepository = getCustomRepository(SurveysUsersRepository)


    


    // Verificar se o usuário existe
    const user = await usersRepository.findOne({ email })
    
    if(!user){
      return response.status(400).json({
        error: "User does not exists",
      });    
    }

    // Verificar se a pesquisa existe
    const survey = await surveysRepository.findOne({ id: survey_id })

    if(!survey){
      return response.status(400).json({
        error: "Survey does not exists",
      })
    }

    const npsPath = resolve(__dirname, "..", "views", "emails", "npsMail.hbs")
  
    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      user_id: user.id,
      link: process.env.URL_MAILs
    }


    const surveyUserAlreadyExists = await surveysUsersRepository.findOne({
      where: [
        {user_id: user.id},
        {value: null}
      ],
      relations: ["user", "survey"]
    })

    if (surveyUserAlreadyExists){
      await sendMailService.execute(email, survey.title, variables, npsPath)
      return response.json(surveyUserAlreadyExists)
    }

    // Criar uma instância das informações
    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id: survey.id,
    })

    
    // Salvar as informações na tabela
    await surveysUsersRepository.save(surveyUser);
    
    // Path para o envio do email

    await sendMailService.execute(email, survey.title , variables, npsPath)

    return response.json(surveyUser)

    // Enviar email para o usuário

  }
}

export { SendMailController }