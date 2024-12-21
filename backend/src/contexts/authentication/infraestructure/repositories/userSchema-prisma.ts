import { OnModuleInit } from '@nestjs/common';
import { UserRepository } from '../../domain/repositories/user.repository';
import { User } from '../../domain/entities/user';
import { PrismaClient } from '@prisma/client';
import { Injectable } from 'src/contexts/shared/dependency-injection/injectable';
import { PrismaService } from 'src/contexts/shared/config/prisma-client';

@Injectable()
export class UserPrismaSchema implements UserRepository
{
  constructor(private readonly prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    await this.prisma.user.create({
      data: { ...user.toJson() },
    });
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return user ? new User(user) : null;
  }
}
