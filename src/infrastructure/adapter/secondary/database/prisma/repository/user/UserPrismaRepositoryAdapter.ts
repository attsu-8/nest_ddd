import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/core/user/domain/UserEntity';
import { UserRepositoryPort } from 'src/core/user/port/secondary/UserRepositoryPort';
import { ResultSucceeded, ResultType } from 'src/shared/Result';
import { PrismaService } from '../../Prisma.service';

@Injectable()
export class UserPrismaRepositoryAdapter implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}
  async findAll(): Promise<ResultType<UserEntity[], Error>> {
    const users = await this.prisma.user.findMany();

    if (users.length === 0) {
      return new ResultSucceeded([]);
    }

    const userEntities = users.map((user) => {
      const userEntity = UserEntity.create({
        id: user.id,
        name: user.name,
      }).unwrap();
      return userEntity;
    });

    return new ResultSucceeded(userEntities);
  }

  async store(userEntity: UserEntity): Promise<ResultType<string, Error>> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userEntity.id,
      },
    });
    if (!user) {
      const createResult = await this.prisma.user.create({
        data: {
          id: userEntity.id,
          name: userEntity.name.value,
        },
      });

      return new ResultSucceeded(createResult.id);
    }
    const updateResult = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        name: userEntity.name.value,
      },
    });
    return new ResultSucceeded(updateResult.id);
  }

  async delete(id: string): Promise<ResultType<string, Error>> {
    const deleteResult = await this.prisma.user.delete({
      where: { id: id },
    });

    return new ResultSucceeded(deleteResult.id);
  }
}
