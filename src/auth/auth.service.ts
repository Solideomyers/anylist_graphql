import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';

import { LoginInput, SignUpInput } from './dto/inputs';
import { AuthResponse } from './types/auth-response.type';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private getJwtToken(userId: string) {
    return this.jwtService.sign({ id: userId });
  }
  async signup(signupInput: SignUpInput): Promise<AuthResponse> {
    const user = await this.usersService.create(signupInput);

    const token = this.getJwtToken(user.id);

    return { token, user };
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    const { email, password } = loginInput;

    const user = await this.usersService.findOnebyEmail(email);
    if (!bcrypt.compareSync(password, user.password)) {
      throw new BadRequestException(`Email / Password do not math`);
    }

    const token = this.getJwtToken(user.id);

    return { token, user };
  }

  async validateUser(id: string): Promise<User> {
    const user = await this.usersService.findOneById(id);

    if (!user.isActive)
      throw new UnauthorizedException(`User is inactive with an admin`);

    delete user.password;

    return user;
  }

  revalidateToken(user: User): AuthResponse {
    const token = this.getJwtToken(user.id);
    return { token, user };
  }
}
