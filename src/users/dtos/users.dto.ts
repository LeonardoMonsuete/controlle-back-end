/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UsersDto {
  @IsNumber()
  @IsOptional()
  id: number;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(255)
  @IsStrongPassword()
  password: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsBoolean()
  status: boolean;

  @IsDateString()
  createdAt: Date;

  @IsOptional()
  @IsDateString()
  updatedAt: Date;

  @IsOptional()
  @IsDateString()
  deletedAt: Date;

  @IsOptional()
  @IsDateString()
  lastLogin: Date;
}
