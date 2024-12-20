import { Module } from '@nestjs/common';
import { AuthenticationModule } from './contexts/authentication/infraestructure/authentication.module';

@Module({
  imports: [AuthenticationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
