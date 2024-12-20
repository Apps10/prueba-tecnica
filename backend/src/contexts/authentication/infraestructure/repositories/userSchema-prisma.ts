import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from '../../application/create-user/create-user.dto';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserSchema extends PrismaClient implements OnModuleInit, UserRepository 
{
  constructor(){
    super();
  }
  async onModuleInit() {
    await this.$connect();
  }


  async create(user: User): Promise<void> {
    await this.user.create({
      data: { ...user.toJson()},
    });
  }

  async getByEmail(email: string): Promise<User | null> {
    const user =  await this.user.findUnique({where: {email}})
    return user ? new User(user) : null
  }
 
}