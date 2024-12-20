import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from '../../application/create-user/create-user.dto';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User, } from '../../domain/entities/user';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class UserSchema extends PrismaClient implements OnModuleInit 
{

  async onModuleInit() {
    await this.$connect();
  }

  async create(user: User): Promise<void> {
    return this.user.create({
      data: user,
    });
  }

  async getByEmail(email: string): Promise<User | null> {
    const user =  this.
    return
  }
 
}