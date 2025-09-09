import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersDto } from '../dtos';
import { UsersService } from '../services/users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@UseGuards(AuthGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  async create(@Body() userData: UsersDto): Promise<UsersDto> {
    return await this.usersService.create(userData);
  }

  @Get()
  async list(): Promise<UsersDto[] | []> {
    return await this.usersService.findAll();
  }

  @Get('/details/:id')
  async find(@Param('id') id: number): Promise<UsersDto | null> {
    return await this.usersService.findById(id);
  }

  @Get('/edit/:id')
  async edit(@Param('id') id: number): Promise<UsersDto | null> {
    return await this.usersService.findById(id);
  }

  @Put('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() userData: UsersDto,
  ): Promise<number | undefined> {
    return await this.usersService.update(id, userData);
  }

  @HttpCode(HttpStatus.OK)
  @Delete('/delete/:id')
  async delete(@Param('id') id: number): Promise<number | undefined> {
    return this.usersService.delete(id);
  }
}
