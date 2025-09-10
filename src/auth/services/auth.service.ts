import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthResponseDto } from '../dtos/auth-response.dto';
import { UsersService } from 'src/users/services/users.service';
import { JwtService } from '@nestjs/jwt';
import { compareSync as bcryptCompareSync } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private jwtExpirationTimeInSeconds: number | undefined;
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {
    this.jwtExpirationTimeInSeconds = Number(
      configService.get<number>('JWT_EXPIRATION_TIME'),
    );
  }

  async signIn(username: string, password: string): Promise<AuthResponseDto> {
    const foundUser = await this.userService.findByUserName(username);

    if (!foundUser) {
      throw new NotFoundException(`User with username ${username} not found`);
    }

    if (
      foundUser.password &&
      !bcryptCompareSync(password, foundUser.password)
    ) {
      throw new UnauthorizedException();
    }

    const payload = { sub: foundUser.id, username: foundUser.username };

    const token = this.jwtService.sign(payload);
    return {
      token,
      expiresIn: this.jwtExpirationTimeInSeconds ?? 3600,
    };
  }
}
