import { Module, Provider } from '@nestjs/common';
import { PrismaAdapterModule } from 'src/infrastructure/adapter/secondary/database/prisma/PrismaAdapter.module';
import { CreateProductBacklogUseCase } from './application/useCase/CreateProductBacklogUseCase';
import { DeleteProductBacklogUseCase } from './application/useCase/DeleteProductBacklogUseCase';
import { GetProductBacklogsUseCase } from './application/useCase/GetProductBacklogsUseCase';
import { UpdateProductBacklogUseCase } from './application/useCase/UpdateProductBacklogUseCase';
import { CreateProductBacklogPort } from './port/primary/CreateProductBacklogPort';
import { DeleteProductBacklogPort } from './port/primary/DeleteProductBacklogPort';
import { GetProductBacklogsPort } from './port/primary/GetProductBacklogsPort';
import { UpdateProductBacklogPort } from './port/primary/UpdateProductBacklogPort';

const useCaseProviders: Provider<
  | CreateProductBacklogPort
  | GetProductBacklogsPort
  | UpdateProductBacklogPort
  | DeleteProductBacklogPort
>[] = [
  {
    provide: CreateProductBacklogPort,
    useClass: CreateProductBacklogUseCase,
  },
  {
    provide: GetProductBacklogsPort,
    useClass: GetProductBacklogsUseCase,
  },
  {
    provide: UpdateProductBacklogPort,
    useClass: UpdateProductBacklogUseCase,
  },
  {
    provide: DeleteProductBacklogPort,
    useClass: DeleteProductBacklogUseCase,
  },
];

@Module({
  imports: [PrismaAdapterModule],
  providers: [...useCaseProviders],
  exports: [...useCaseProviders],
})
export class ProductBacklogModule {}
