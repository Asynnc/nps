import { hash } from 'bcryptjs';
import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { UserRepository } from '../repositories/UsersRepository';

class UserController {

  async create(request: Request, response: Response) {
    const { name, email, password } = request.body

    const usersRepository = getCustomRepository(UserRepository)

    const userAlreadyExists = await usersRepository.findOne({ 
      email
    })

    if (userAlreadyExists){
      return response.status(400).json({
        error: 'User already exists!'
      })
    }

    const hashedPassword = await hash(password, 8)

    const user = usersRepository.create({
      name: name.toUpperCase(),
      email: email.toLowerCase(),
      password: hashedPassword
    })

    await usersRepository.save(user);


    return response.json(user);

  }
}

export { UserController };
