import { Module, Provider } from '@nestjs/common';
import { CreateBacklogItemUseCase } from './application/useCase/CreateBacklogItemUseCase';
import { GetBacklogItemsUseCase } from './application/useCase/GetBacklogItemsUseCase';
import { GetBacklogItemsPort } from './port/primary/GetBacklogItemsPort';
import { CreateBacklogItemPort } from './port/primary/CreateBacklogItemPort';
import { UpdateBacklogItemPort } from './port/primary/UpdateBacklogItemPort';
import { UpdateBacklogItemUseCase } from './application/useCase/UpdateBacklogItemUseCase';
import { DeleteBacklogItemPort } from './port/primary/DeleteBacklogItemPort';
import { DeleteBacklogItemUseCase } from './application/useCase/DeleteBacklogItemUseCase';
import { PrismaAdapterModule } from 'src/infrastructure/adapter/secondary/database/prisma/PrismaAdapter.module';

const useCaseProviders: Provider<
  | CreateBacklogItemPort
  | GetBacklogItemsPort
  | UpdateBacklogItemPort
  | DeleteBacklogItemPort
>[] = [
  {
    provide: CreateBacklogItemPort,
    useClass: CreateBacklogItemUseCase,
  },
  {
    provide: GetBacklogItemsPort,
    useClass: GetBacklogItemsUseCase,
  },
  {
    provide: UpdateBacklogItemPort,
    useClass: UpdateBacklogItemUseCase,
  },
  {
    provide: DeleteBacklogItemPort,
    useClass: DeleteBacklogItemUseCase,
  },
];

@Module({
  imports: [PrismaAdapterModule],
  providers: [...useCaseProviders],
  exports: [...useCaseProviders],
})
export class BacklogItemModule {}
