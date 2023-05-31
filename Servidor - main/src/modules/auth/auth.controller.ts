import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/register')
  registerUser(@Body() registerAuthDto: any) {
    return this.authService.registerUser(registerAuthDto);
  }

  @Post('/login')
  loginUser(@Body() loginAuthDto: any) {
    return this.authService.loginUser(loginAuthDto);
  }
}
