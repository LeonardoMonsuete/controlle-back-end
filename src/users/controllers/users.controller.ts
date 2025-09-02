import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersDto } from '../dtos';

@Controller('user')
export class UsersController {
  @Post('/create')
  create(@Body() user: UsersDto) {
    return user;
  }

  @Get()
  list(): string {
    return 'user';
  }

  @Get('/details/:id')
  findById(@Param('id') id: string): string {
    return `buscando ${id}`;
  }

  //   @Post('/login')
  //   login() {
  //     return user;
  //   }

  //   @Post('/logout')
  //   logout() {
  //     return user;
  //   }
}
