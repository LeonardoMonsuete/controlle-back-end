import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(
    @Body('username') username: string,
    @Body('password') password: string,
  ): Promise<AuthResponseDto> {
    const authResponse: AuthResponseDto = await this.authService.signIn(
      username,
      password,
    );
    return authResponse;
  }

  @Post('register')
  signUp() {}

  @Post('logout')
  signOut() {}
}
