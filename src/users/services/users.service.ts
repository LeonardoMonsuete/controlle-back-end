import {
  BadRequestException,
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { FindAllParams, UsersDto } from '../dtos';
import { hashSync as bcryptHashSync } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/db/entities/users/users.entity';
import { FindOptionsWhere, ILike, IsNull, Like, Repository } from 'typeorm';
import { EntityMapperHelper } from 'src/common/helpers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly entityMapperHelper: EntityMapperHelper,
  ) {}

  async create(userData: UsersDto): Promise<UsersDto> {
    const existingUserName = await this.findByUserName(userData.username);
    const existingEmail = await this.findByEmail(userData.email);

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

    if (!userData.password)
      throw new ConflictException(`Password must to be provided`);

    userData.password = bcryptHashSync(userData.password, 10);

    return await this.usersRepository.save(userData);
  }

  async update(
    userId: number,
    userData: UsersDto,
  ): Promise<number | undefined> {
    const validatingExistence: UsersDto | null = await this.findById(userId);

    if (!validatingExistence)
      throw new HttpException(
        `No users found base on user id ${userId}`,
        HttpStatus.NOT_FOUND,
      );

    const existingUserName: UsersDto | null = await this.findByUserName(
      userData.username,
      true,
    );
    const existingEmail = await this.findByEmail(userData.email);

    if (existingUserName && userId != existingUserName?.id) {
      throw new ConflictException(
        `Username ${userData.username} already exists, choose another one`,
      );
    }

    if (existingEmail && userId != existingEmail?.id) {
      throw new ConflictException(
        `Email ${userData.email} is already in use, choose another one`,
      );
    }

    if (userData.password && userData.password !== existingUserName?.password) {
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
    const validatingExistence: UsersDto | null = await this.findById(userId);

    if (!validatingExistence)
      throw new HttpException(
        `No users found base on user id ${userId}`,
        HttpStatus.NOT_FOUND,
      );
    //TODO - quando tiver feita a parte de relação com a userProfile verificar se ele é master, se sim nao pode se deletado
    return (await this.usersRepository.softDelete(userId)).affected;
  }

  async findByUserName(
    username: string,
    returnsPass: boolean = false,
  ): Promise<UsersDto | null> {
    if (!username || typeof username !== 'string') {
      throw new BadRequestException(
        'username to search not provided or is not an string',
      );
    }

    const userEntity = await this.usersRepository.findOne({
      where: {
        username,
        deletedAt: IsNull(),
      },
    });

    return this.entityMapperHelper.mapEntityToDto(
      userEntity,
      UsersDto,
      returnsPass
        ? {
            excludeKeys: ['password'],
          }
        : {},
    );
  }

  async findByEmail(email: string): Promise<UsersDto | null> {
    if (!email || typeof email !== 'string') {
      throw new BadRequestException(
        'email to search not provided or is not an string',
      );
    }

    const userEntity = await this.usersRepository.findOne({
      where: {
        email,
        deletedAt: IsNull(),
      },
    });

    return this.entityMapperHelper.mapEntityToDto(userEntity, UsersDto);
  }

  async findById(
    userId: number,
    isToEdit: boolean = false,
  ): Promise<UsersDto | null> {
    if (!userId || isNaN(userId)) {
      throw new BadRequestException(
        'userId to search not provided or is not an number',
      );
    }

    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
        deletedAt: IsNull(),
      },
    });

    if (!user)
      throw new HttpException(
        `No users found base on user id ${userId}`,
        HttpStatus.NOT_FOUND,
      );
    if (!isToEdit)
      return this.entityMapperHelper.mapEntityToDto(user, UsersDto, {
        excludeKeys: ['password'],
      });

    return this.entityMapperHelper.mapEntityToDto(user, UsersDto);
  }

  async findAll(params: FindAllParams): Promise<UsersDto[] | []> {
    const searchParams: FindOptionsWhere<UserEntity> =
      this.handleSearchParams(params);

    const usersEntities = await this.usersRepository.find({
      where: searchParams,
    });

    const returnData: UsersDto[] = [];

    if (usersEntities.length == 0) return returnData;

    const mapedUsers = usersEntities.map((userEntity) => {
      return this.entityMapperHelper.mapEntityToDto(userEntity, UsersDto, {
        excludeKeys: ['password'],
      });
    });

    mapedUsers.map((mappedUser) => {
      return mappedUser ? returnData.push(mappedUser) : null;
    });

    return returnData;
  }

  private handleSearchParams(
    params: FindAllParams,
  ): FindOptionsWhere<UserEntity> {
    const searchParams: FindOptionsWhere<UserEntity> = {
      deletedAt: IsNull(),
    };

    if (params.email) {
      searchParams.email = Like(`%${params.email}%`);
    }

    if (params.name) {
      searchParams.name = ILike(`%${params.name}%`);
    }

    if (params.username) {
      searchParams.username = Like(`%${params.username}%`);
    }

    if (params.id) {
      searchParams.id = params.id;
    }

    if (params.status) {
      searchParams.status = params.status;
    }

    if (params.lastLogin) {
      searchParams.lastLogin = new Date(params.lastLogin);
    }

    if (params.createdAt) {
      searchParams.createdAt = new Date(params.createdAt);
    }

    return searchParams;
  }
}
