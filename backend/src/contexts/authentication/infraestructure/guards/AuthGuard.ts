import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtAuthService } from '../services/JwtAuthService';
import { Request } from 'express';
import { UserUnauthorizedException } from '../../domain/exceptions/user.exceptions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtAuthService: JwtAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    try {
      const payload = await this.jwtAuthService.verify(token);
      request.userId = payload.id; // Adjunta el usuario a la petición
      return true;
    } catch(error) {
      throw new UserUnauthorizedException();
    }
  }

  private extractTokenFromHeader(request: Request): string | null {
    const authHeader = request.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.split(' ')[1]? authHeader.split(' ')[1]: null;
    }
    return null;
  }
}