import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { UsersDto } from '../dtos';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/users.entity';
import { IsNull, Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  create(userData: UsersDto) {
    const existingUserName = this.findByUserName(userData.username);
    const existingEmail = this.findByEmail(userData.email);

    if (existingUserName instanceof UserEntity) {
      throw new ConflictException(
        `Username ${userData.username} already exists, choose another one`,
      );
    }

    if (existingEmail instanceof UserEntity) {
      throw new ConflictException(
        `Email ${userData.email} is already in use, choose another one`,
      );
    }

    userData.password = bcryptHashSync(userData.password, 10);

    return this.usersRepository.save(userData);
  }

  async update(
    userId: number,
    userData: UsersDto,
  ): Promise<number | undefined> {
    const existingUserName = await this.findByUserName(userData.username);
    const existingEmail = await this.findByEmail(userData.email);

    if (
      existingUserName instanceof UserEntity &&
      userId != existingUserName?.id
    ) {
      throw new ConflictException(
        `Username ${userData.username} already exists, choose another one`,
      );
    }

    if (existingEmail instanceof UserEntity && userId != existingEmail.id) {
      throw new ConflictException(
        `Email ${userData.email} is already in use, choose another one`,
      );
    }

    if (userData.password !== existingUserName?.password) {
      userData.password = bcryptHashSync(userData.password, 10);
    }

    userData.updatedAt = new Date();
    return (await this.usersRepository.update(userId, userData)).affected;
  }

  async delete(userId: number): Promise<number | undefined> {
    if (!userId || isNaN(userId)) {
      throw new BadRequestException(
        'userId to search not provided or is not an number',
      );
    }
    //TODO - quando tiver feita a parte de relação com a userProfile verificar se ele é master, se sim nao pode se deletado
    return (await this.usersRepository.softDelete(userId)).affected;
  }

  async findByUserName(username: string): Promise<UserEntity | null> {
    if (!username || typeof username !== 'string') {
      throw new BadRequestException(
        'username to search not provided or is not an string',
      );
    }

    return await this.usersRepository.findOne({
      where: {
        username,
        deletedAt: IsNull(),
      },
    });
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    if (!email || typeof email !== 'string') {
      throw new BadRequestException(
        'email to search not provided or is not an string',
      );
    }

    return await this.usersRepository.findOne({
      where: {
        email,
        deletedAt: IsNull(),
      },
    });
  }

  async findById(
    userId: number,
    isToEdit: boolean = false,
  ): Promise<UsersDto | undefined> {
    if (!userId || isNaN(userId)) {
      throw new BadRequestException(
        'userId to search not provided or is not an number',
      );
    }

    const user = await this.usersRepository.findOneOrFail({
      where: {
        id: userId,
        deletedAt: IsNull(),
      },
    });

    if (!user) return undefined;
    if (!isToEdit) return user;

    return {
      name: user.name,
      password: user.password,
      email: user.email,
    } as UsersDto;
  }

  async findAll(): Promise<UserEntity[] | null> {
    return await this.usersRepository.find({
      where: {
        deletedAt: IsNull(),
      },
    });
  }
}
