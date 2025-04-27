import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { RegisterController } from './modules/auth/controllers/register/register.controller';
import { LoginController } from './modules/auth/controllers/login/login.controller';
import { AuthModule } from './modules/auth/auth-module/auth-module.module';

@Module({
  imports: [AuthModule],
  controllers: [RegisterController, LoginController],
  providers: [AppService],
})
export class AppModule {}
