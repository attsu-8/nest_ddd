import { Module, Provider } from '@nestjs/common';
import { PrismaAdapterModule } from 'src/infrastructure/adapter/secondary/database/prisma/PrismaAdapter.module';
import { CreateUserUseCase } from './application/useCase/CreateUserUseCase';
import { DeleteUserUseCase } from './application/useCase/DeleteUseCase';
import { GetUsersUseCase } from './application/useCase/GetUsersUseCase';
import { UpdateUserUseCase } from './application/useCase/UpdateUserUseCase';
import { CreateUserPort } from './port/primary/CreateUserPort';
import { DeleteUserPort } from './port/primary/DeleteUserPort';
import { GetUsersPort } from './port/primary/GetUsersPort';
import { UpdateUserPort } from './port/primary/UpdateUserPort';

const useCaseProviders: Provider<
  CreateUserPort | GetUsersPort | UpdateUserPort | DeleteUserPort
>[] = [
  {
    provide: CreateUserPort,
    useClass: CreateUserUseCase,
  },
  {
    provide: GetUsersPort,
    useClass: GetUsersUseCase,
  },
  {
    provide: UpdateUserPort,
    useClass: UpdateUserUseCase,
  },
  {
    provide: DeleteUserPort,
    useClass: DeleteUserUseCase,
  },
];

@Module({
  imports: [PrismaAdapterModule],
  providers: [...useCaseProviders],
  exports: [...useCaseProviders],
})
export class UserModule {}
