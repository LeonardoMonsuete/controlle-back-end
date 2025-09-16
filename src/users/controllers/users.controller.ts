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
  Query,
  UseGuards,
} from '@nestjs/common';
import { FindAllParams, UsersDto } from '../dtos';
import { UsersService } from '../services/users.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/create')
  async create(@Body() userData: UsersDto): Promise<UsersDto> {
    return await this.usersService.create(userData);
  }

  @UseGuards(AuthGuard)
  @Get()
  async list(@Query() params: FindAllParams): Promise<UsersDto[] | []> {
    return await this.usersService.findAll(params);
  }

  @UseGuards(AuthGuard)
  @Get('/details/:id')
  async find(@Param('id') id: number): Promise<UsersDto | null> {
    return await this.usersService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Get('/edit/:id')
  async edit(@Param('id') id: number): Promise<UsersDto | null> {
    return await this.usersService.findById(id, true);
  }

  @UseGuards(AuthGuard)
  @Put('/update/:id')
  async update(
    @Param('id') id: number,
    @Body() userData: UsersDto,
  ): Promise<number | undefined> {
    return await this.usersService.update(id, userData);
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Delete('/delete/:id')
  async delete(@Param('id') id: number): Promise<number | undefined> {
    return this.usersService.delete(id);
  }
}
