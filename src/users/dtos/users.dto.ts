export class UsersDto {
  id?: number;
  username: string;
  password: string;
  email: string;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  lastLogin: Date;
}
