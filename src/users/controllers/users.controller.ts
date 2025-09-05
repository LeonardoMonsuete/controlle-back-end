import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersDto } from '../dtos';
import { UsersService } from '../services/users.service';
import { UserEntity } from 'src/db/entities/users.entity';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  create(@Body() userData: UsersDto) {
    return this.usersService.create(userData);
  }

  @Get()
  async list(): Promise<UserEntity[] | null> {
    return await this.usersService.findAll();
  }

  @Get('/details/:id')
  async find(@Param('id') id: number): Promise<UsersDto | undefined> {
    return await this.usersService.findById(id);
  }

  @Get('/edit/:id')
  async edit(@Param('id') id: number): Promise<UsersDto | undefined> {
    return await this.usersService.findById(id);
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() userData: UsersDto,
  ): Promise<number | undefined> {
    return await this.usersService.update(id, userData);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number): Promise<number | undefined> {
    return this.usersService.delete(id);
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
